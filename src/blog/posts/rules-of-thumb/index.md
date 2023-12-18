---
layout: layouts/post.njk
title: Ten Software Architecture Rules of Thumb
date: 2023-01-04
description: General rules to use when doing software architecture.
---

I love a good [rule of thumb](https://en.wikipedia.org/wiki/Rule_of_thumb). They are instantly understandable and based on the practice rather than the theory of a particular topic.

Through my learnings as a software architect, I have often created these rules of thumb to apply the patterns to other systems.

1. **There is always a bottleneck.** Even in a serverless system or one you think will "infinitely" scale, pressure will always be created elsewhere. For example, if your API scales, does your database also scale? If your database scales, does your email system? In modern cloud systems, there are so many components that scalability is not always the goal. Throttling systems are sometimes the best choice.
2. **Your data model is linked to the scalability of your application.** If your table design is garbage, your queries will be cumbersome, so accessing data will be slow. When designing a database (NoSQL or SQL), carefully consider your access pattern and what data you will have to filter. For example, with DynamoDB, you need to consider what "Key" you will have to retrieve data. If that field is not set as the primary or sort key, it will force you to use a scan rather than a faster query.
3. **Scalability is mainly linked with cost. When you get to a large scale, consider systems where this relationship does not track linearly.** If, like many, you have systems on RDS and ECS; these will scale nicely. But the downside is that as you scale, you will pay directly for that increased capacity. It's common for these workloads to cost $50,000 per month at scale. The solution is to migrate these workloads to serverless systems proactively.
4. **Favour systems that require little tuning to make fast.** The days of configuring your own servers are over. AWS, GCP and Azure all provide fantastic systems that don't need expert knowledge to achieve outstanding performance.
5. **Use infrastructure as code.** Terraform makes it easy to build repeatable and version-controlled infrastructure. It creates an ethos of collaboration and reduces errors by defining them in code rather than "missing" a critical checkbox.
6. **Use a PaaS if you're at less than 100k [MAUs](https://en.wikipedia.org/wiki/Active_users).** With [Heroku](https://www.heroku.com/), [Fly](https://fly.io) and [Render](https://render.com), there is no need to spend hours configuring AWS and messing around with your application build process. Platform-as-a-service should be leveraged to deploy quickly and focus on the product.
7. **Outsource systems outside of the market you are in. Don't roll your own CMS or Auth, even if it costs you tonnes.** If you go to the pricing page of many third-party systems, for enterprise-scale, the cost is insane - think $10,000 a month for an authentication system! "I could make that in a week," you think. That may be true, but it doesn't consider the long-term maintenance and the time you cannot spend on your core product. Where possible, buy off the shelf.
8. **You have three levers, quality, cost and time. You have to balance them accordingly.** You have, at best, 100 "points" to distribute between the three. Of course, you always want to maintain quality, so the other levers to pull are time and cost.
9. **Design your APIs as open-source contracts.** Leveraging tools such as OpenAPI/[Swagger](https://swagger.io/) (not a sponsor, just a fan!) allows you to create "contracts" between your front-end and back-end teams. This reduces bugs by having the shape of the request and responses agreed upon ahead of time.
10. **Start with a simple system first ([Gall's law](http://principles-wiki.net/principles:gall_s_law)).** Galls' law states, "all complex systems that work evolved from simpler systems that worked. If you want to build a complex system that works, build a simpler system first, and then improve it over time.". You should avoid going after shiny technology when creating a new software architecture. Focus on simple, proven systems. S3 for your static website, ECS for your API, RDS for your database, etc. After that, you can chop and change your workload to add these fancy technologies into the mix.

Hopefully these rules of thumb can help you when designing new systems. Remember though, they are just rules of thumb, not rules!
