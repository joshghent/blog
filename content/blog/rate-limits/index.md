```yaml
title: Question your Rate limits
description: Rate limits are not a silver bullet for spam. Here is why, and how to address spam concerns.
date: 2022-08-02
```

If you are building a system with an API, there is a good chance it has a rate limit or you stay awake at night afraid of a DDoS attack.

Rate limits are a method to reduce network traffic by putting a cap on the number of times an action (like calling an API endpoint) can be performed in a certain time frame.

Rate limits for APIs are spoken of as a security measure. And, principally, they are a good idea. They prevent heavy usage of your system in a short space of time. The kind of behaviour that a malicious actor would have. Or would they?

## What is spam?

The problem with rate limits is that they are blunt instruments. More of a mallet, than a katana.

You can define a limit on the number of requests, let's say 100 per second, per API key. But then you get a call from your golden goose customer, ACME Corp. They say they are getting a 429 Rate limited response when calling your API because they are such big customers of it!

Granted, in this situation, you can raise the rate limit for them individually. But you don't want to involve manual work as you gain larger customers. You're trying to prevent malicious usage, not mass usage.

Firewalls on top of your application aren't a silver bullet either. They can enforce semi-complex rules for rate limiting but the problem of differentiating spam from legitimate traffic remains.

## Masking over scaling problems

In serverless environments, there is an associated cost with lots of requests. But for a long-running service hosted on EC2, ECS or EKS (or the Azure/GCP alternative), do more requests _really_ matter? Not really.

In my experience, rate limits are often introduced to protect against scalability problems. And even if they are not, they often mask over-scaling issues. Although we don't want to prematurely optimize the product, it is prudent to have at least a 50% buffer from your peak load. In other words, if your system can handle 10,000 users at peak time, you should be aiming to be able to cope with 15,000 users.

Using rate limits to avoid scaling problems can be wise and you certainly want to protect against malicious use of your system. But, it's only one side of the coin.

## Be mindful of the use case

When someone mentions adding a rate limit, ask why. What attack vector are you trying to mitigate? What specific type of traffic are we trying to avoid?

In any case, there should be some data behind this to say we are getting X traffic which is pushing up 95th-percentile response times by Y.

As we have discussed, rate limits are blunt instruments. They are only one weapon in our fight against malicious actors. The solution is a multi-pronged approach:

1. Implement bot detection (like Cloudflare Bot Management) to detect bot attacks
2. Add a firewall to deny incoming connections that aren't legitimate.
3. Add cautious rate limits to key areas of the system. You like will need a higher rate limit on your GET /customer endpoint than a /login endpoint. Work based on the 50% buffer limit.
4. Add systems to detect if a person is trying to login with known-to-be-breached passwords for a single user. This is likely a credential stuffing attack or a brute force against a key user.
5. Implement a "blocked" user concept. If there are N number of failed attempts, then they need to unlock their account using a code from their email.

There are of course many more defences you can use to fight spam. In a majority of cases though, your site won't be the target of malicious use. So, don't think you need the same security as MI5 - because you probably don't. Rate limits are an easy method to implement, but question the why. It might open up a larger conversation about more robust security measures. But, always keep the customer and their data in mind, not the protection of response time statistics.