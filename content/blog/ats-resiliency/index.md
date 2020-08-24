---
title: "ATS Resiliency"
date: "2020-08-24"
description: "Forwarding data on to a third party sounds easy but has a lot of potholes you can easily get stuck in."
---

As with all modern enterprise SaaS platforms, Koru has a mechanism to send data about a candidates results back to a clients ATS (Application Tracking system) or CRM (Customer Relationship Management) system. Since Koru was event driven and the traffic is not consistent, the decision (which pre-dates myself) was made to make these "ATS Integrations" lambda's triggered from DynamoDB.

So the set up is this, when a candidate completes an assessment on our platform, it goes through all the pipes and tubes, passed Gerald the field mouse that generates the scores and then finally back into our API when the completion of the scoring is recorded. Now we want to get this completed candidate data to our clients system, so our API creates a new record in the DynamoDB table for that client's ATS with all the information it needs. This then triggers the lambda that sends the data to the ATS of choice. Sounds easy right?

I thought as much, but found there were a number of holes that the original developers fell into when developing this software that caused huge resiliency issues. I thought I would share my findings to all those trying to do the very common task of "submit data via HTTP to a 3rd party". In our case, the third party API is the Cappfinity external scoring mechanism which is built by another team at the company which allowed us to work closely with them. However, most fixes were addressed on the Koru side.

### 1. Lambda was suffering from "socket exhaustion"

This was the biggest problem we had "socket exhaustion". I hadn't stumbled across the term apart from a joke I'd seen on IRC, so it took me a while to discover what the problem actually was and why it was happening in our system.
What we observed was that the Lambda function would fire a request for each record that we hadn't marked as "processed" in our system (It is considered "processed" when we get a 200 response from the 3rd Party API). Often this could just be one request, which would succeed. But sometimes, if records had failed over time, then we would build up this backlog of pending records to be sent to the third party. In these cases, the first few would succeed but quickly we'd get the error "ETIMEDOUT" or "ESOCKETTIMEDOUT".

A quick google of these errors lead me to discover that Node goes to look up the DNS the URL for each request it makes. After this, it makes the request to the URL you've specified. Often if you have multiple requests trying to process in parallel, and the DNS lookup for a few of them takes a bit too long then the program can't keep up with trying to issue new sockets to make requests on. Uber talks more about why it occurs over [here](https://eng.uber.com/denial-by-dns/).

So we knew the the problem was that it was trying to process too many requests in parallel. To the code!
Immediately, I spotted the problem.
```js
return new Promise(resolve => {
    Promise.all(
      records.map(async record => {
        const payload = buildPayload(record);
        try {
          const response = await processPayload(payload);
        } catch (e) {
            await markRecordAsFailed(record);
        }
        return Promise.resolve(payload);
      })
    ).then(result => resolve(result));
  });
```

See the problem? Well there are a couple...
1) `processPayload` is an async function but an `Array.map` with an async callback will appear as valid javascript but will in fact not truly `await` functions contained within it
2) Because of not being awaited successfully, the array will quickly loop through and call the `processPayload` but not listen for the result and therefore max out the sockets

It's worth noting that this code was used in production for many months before we got these kinds of issues, in response to increased load.

What was the solution here? It turns out to be fairly simple, rewrite it as a regular `for` loop.
```js
for (let i = 0; i < records.length; i += 1) {
  const payload = buildPayload(records[i]);
  try {
    const response = await processPayload(payload);
  } catch (e) {
    await markRecordAsFailed(records[i]);
  }
}
```

The code above means that we submit a request to send the data to the 3rd party one at a time.

### 2. The 3rd party was getting overwhelmed with requests

After we deployed the code above, we now found that the 3rd Party API was getting hammered with the amount of requests we had to process (even though they were one at a time). Although this sort of seems like "not my problem", I chose to issue a fix for this.
The solution was to simply limit the number of requests that we sent too 100 per "run" of the lambda (i.e., we would only process a maximum of 100 records each time the lambda got triggered which was for all DynamoDB inserts into the table)

### 3. Use Https agent with a pool

We added a further fix to the problem above by creating our own Https Agent and passing that into the `request-promise` libraries options.
```js
const agent = new https.Agent({maxSockets: 25, keepAlive: true});
await request({
  options: {},
  agent: agent, // use the global agent
});
```

This meant that we would share the agent across all requests that were made from the program rather than creating a new one per request. This again prevented socket timeout issues as well as slowing the rate that we sent requests to the API.

### 4. Cache JWT tokens (or any other authentication tokens you are using for the life time of the request)

A few months after we deployed the service, the Cappfinity team called us up to say that we had maxed out their M2M Auth0 Tokens. Oops.
When digging into the code, I found that the token was not only generated each time we processed records, but for each individual record itself. Double Oops.
I was hesitant to cache JWT token's because it just feels a bit wrong and has the potential to become invalid in the case of rotated secrets and so forth, but we went ahead with it anyway. We cached the token by storing it in another DynamoDB table - the mix of cheap storage combined with quick and easy access was hard to compete with. In the program, each time it boots, we check the table for a token. We then check if that token is valid. If it is then we can proceed as normal. Alternatively, if it's not valid then we can regenerate it, and update it in the table.

### 5. Don't submit data to the 3rd party when it is down

Systems go down, that's a fact. Or maybe a deployment breaks everything. Either way, we should have some mechanism so that if we mark a candidate records as failed to be processed, then we can be sure this is a data issue rather than an issue with any part of the underlying system. There are many ways to do this, but without working too heavily with the third-party API, we were able to implement a basic sanity check. I asked if they had a health check mechanism, which they did. I asked to look at the code and this is what I saw (roughly)
```js
const router = express.Router();
router.all('/health', (req, res, next) => {
  return res.send(200);
})
```

Yup, that's it! I'll dive into how to build great health check mechanisms in another post, but suffice to say, this doesn't give an accurate representation of a systems health. Nonetheless, we implemented a system that would first ping the health check system to see if we got a good response back. We created tickets to get this health check improved so that we can have more confidence in this check going forward but this is a good first start. Additionally, this basic check would have saved us in the case of an outage the Cappfinity API had for 2 days. In that time, Koru was firing requests at the Cappfinity API, getting no response and failing them accordingly. This is correct behaviour but was such a headache to get them to submit again when the API was backup so this health check will prevent those sorts of situations.

### 6. Filtered out DynamoDB update, delete and modify triggers to reduce retries

I said earlier that the Lambda was triggered for DynamoDB inserts, but as of August 2020, there is no way within AWS itself to be this specific. So how did we do it and why?
We implemented this by looking at the `eventName` property on the `event` that is passed as the first argument to the Lambda function. This event name property, for DynamoDB events, signifies what type of event it was. When a record is updated, it's `MODIFY`, when a record is deleted it's `DELETE` and so on. The one we are interested in is `INSERT`, which occurs, logically, when a record is inserted.
It was then a matter of checking the first records `eventName` like this
```js
const triggerType = event.Records[0].eventName;
const acceptedTriggers = ['INSERT'];
if (!acceptTypes.includes(triggerType)) {
  return {
    message: "Invalid trigger for this lambda"
  };
}
```

But why did we do this?

What was happening was that as part of our system, we update the dynamo table to indicate how many "retries" a record has attempted or if it's been processed or not. This updating meant that each time we processed a record it also triggered the lambda, so it just spun in a circle continuing to retry, over and over again. Pretty hilarious really.
By cutting down the lambda to trigger only on inserts, we not only saved money, but also made it more efficient. Additionally, we only wanted the lambda to trigger for new records and retry old ones and this bit of code achieved that purpose.

### 7. Special error cases

We worked with the Cappfinity team closely on this one. We found that in some cases, somehow, records were in the database ready to submit back to the ATS, that shouldn't have been their. These were the cases we were trying to handle:

- Straight up invalid records
- The candidate hadn't actually completed the assessment
- We had already sent data but had not marked it as processed in our system.

To solve this problem, we needed to introduce some new status codes so that we could categorize the errors we got back. Previously, if we sent an invalid request of any kind, it would return a 500 error to us. This categorization of errors meant we could handle each one uniquely. For complete invalid records, this meant just deleting them. Whilst for duplicate submissions, we marked them as "processed".

After we deployed this change, we let it chew through a huge backlog of records that were marked as unprocessed and soon we were down to 0 records marked as "unprocessed". Great success!

## Overview

I'm really happy with how solid and robust the system is now. There are still improvements that could be made but that's the way with all things. I hope to have this system taken off my list of "most modified" into a pile of systems that "just work"(tm). None of these techniques are new, but the key is to take the time to identify first why things happen. This system resiliency work too me to places that felt out my comfort zone and put under the microscope the gaps in my knowledge - namely, how NodeJS actually works under the hood so to speak and networking principles. I've since taken a couple of courses and watched a number of conference talks on these very topics.

Takeaways:
* Use your work to identify gaps in your knowledge
* Don't assume - look for the why's and measure to test the hypothesis
