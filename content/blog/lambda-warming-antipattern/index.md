---
title: "Lambda Warming is an Antipattern"
date: "2023-12-18"
description: "Lambda warming is a common strategy to mitigate cold start times. But is it the right solution?"
tags: ["aws", "lambda", "serverless", "architecture"]
---

At a certain stage during most monolith to microservice migrations, teams that choose to migrate to Lambda often encounter a classic problem: cold starts.

Searching this issue on Google (or DuckDuckGo for those conscious of privacy) yields thousands of results. Strategies abound, from reducing cold start times to using Lambda warmers and other seemingly haphazard tactics.

On the surface, optimizing your Lambdas seems beneficial. Lambda bills per millisecond of compute time, so optimizing at scale can lead to marginal cost savings, not to mention the customer impact of a faster app.

I won't rehash the numerous articles suggesting sound methods to improve Lambda performance, such as increasing memory, avoiding placement in VPCs, and choosing quick languages like Python, Go, or Node.js (in that order).

Instead, I'll focus on another strategy often suggested to mitigate cold start problems: Lambda warming.

Lambda warming is a method where Lambdas are pinged to maintain an active, spun-up instance. Theoretically, this eliminates the time AWS takes to boot the container. However, as Yan Cui points out on The Burning Monk, this assumption is flawed. By implementing a Lambda warming mechanism, you're only keeping a single instance of your app alive (until it recycles about every 45 minutes, a built-in AWS quirk) rather than having many concurrent instances ready for traffic.

Beyond this apparent flaw, Lambda warming disrupts the pattern of Lambda's transactional, functional nature—stateless input and output.

If you've concluded that you need Lambda warming, it suggests a larger issue: the need for low latency in your backend systems, either for customer experience or technical reasons. And by using Lambda warming, you're likely willing to invest money to combat 300ms of latency.

If these statements ring true, then the reality is you might be better served by a different service like ECS Fargate, Kubernetes (EKS), or traditional EC2—essentially, anything long-lived.

Lambda is a fantastic tool, but it's not a one-size-fits-all solution. Often, a HTTP API with some cold start latency is perfectly acceptable. However, for real-time services like chat, it might not be the best fit. Yet, if your traffic for such a service is consistent, then perhaps it is suitable!

The key is to gather data, understand your use case and pain points, and then evaluate your options. Don't rush to a workaround without thorough consideration.
