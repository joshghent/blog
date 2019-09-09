At my previous post at [CloudCall](https://cloudcall.com), I was responsibile for the SMS/IM backend. Whilst it was being developed, we made the classic mistake of not worrying about resiliency or testing since we were so stacked with features and had a manual QA department to act as a big bug dragnet.

Once things settled down however, one of my first priorities (for my own sanity and peace of mind) was to focus on resiliency. Here are the steps that I took, that contain translatable principles across any system. In my case, I was working with a suite of NodeJS API's and consumer services hosted on ECS or Lambda.

## Goals
Let's start of with some high level goals, because often resiliency can be used to mean "stopping a service from ever crashing". However, the goal of resiliency should be to accept failure, and instead be more focused on handling them gracefully.

I had the objective of making 99% of errors auto recover and be never told about them, but the 1% of errors I wanted to know about immediately. This included not just, is X service healthy, but also is the queue that it listens to being consumed at a rate less than it was being added to.

Here's what I ended up doing

## Backing Off
When the primary consumer service (loving named Short Message Event Gatherer or "SMEG" for short), we implemented a retry mechanism that just requeued the message to be re-processed. It was then consumed immidiatly by another instance which undoubtedly generated the same error (due to 3rd party errors etc).

The correct behaviour is to have a backing off mechanism. This means that in the event of 3rd party failures (databases, external API's etc) it will give them chance to recover before retrying the process.

We implemented a gradual back off proceedure that increased 3x with each attempt. So after the first failure it would retry after 1 minute then the second would be after 3 minutes, and then 9 minutes and so on.

## Die!
Hosting the application with ECS (Docker) forced us to think in a "cattle" rather than "pets" way of working with servers.

When the applications health check failed or it's heartbeat to RabbitMQ failed, it would immidiatly kill itself. This would then trigger ECS to boot a new task to take its place.


## Health Check on Start
Linked with the above, when the application booted, we did a systems check to make sure it could connect to the database, rabbitmq and a couple of third parties that we used.

If this process failed on startup, it means that ECS could try to boot it in another availability zone, increasing its chance of success.

We configured alerting on the back of this if AWS could not boot a container that added to our overall picture of the systems health.

## Automated end-to-end monitoring

## Monitoring 3rd-parties

## CorrelationIds

## Fail early

## Real world testing

## DynamoDB billing on Demand
At the time, 

## Aggressive feature flagging

## Automated Unit and Integration testing

## Indexing ElasticSearch

## Alerting

## Future Plans

Since I moved to a new company, I did not get chance to execute on all of my resiliency plans. 

I had planned to add a new feature into our frontend that would allow people to manually retry messages (like on iMessage or WhatsApp), this would then trigger a new Lambda that would requeue the message based on the data in the DynamoDB table

Additionally, I was looking to implement a feature whereby messages that failed completely (after retries) would be moved to another "Failed" DLX queue. If somehow the app managed to process a message then it would start consuming from the "Failed" DLX queue. 
