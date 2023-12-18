---
layout: layouts/post.njk
title: SQS, SNS, Eventbridge, DynamoDB - Chosing the right queue system in AWS
date: 2023-05-02
---

AWS has so many different queuing services.

- [SNS](https://aws.amazon.com/sns/)
- [Eventbridge](https://aws.amazon.com/eventbridge/)
- [SQS](https://aws.amazon.com/sqs/)
- [Amazon MQ](https://aws.amazon.com/amazon-mq/)
- [DynamoDB](https://aws.amazon.com/dynamodb/) - a database but also can trigger lambda's so it's kind of a queue!

For newcomers to AWS, having so many solutions for a seemingly simple problem can be overwhelming.

Here is a breakdown of each queuing service and when you might use it.

## SQS

**Sending**: 1 to 1

What it is: Literally a "simple queue system". Does what it says on the tin, send a message to a queue, have it consumed, easy.

**When to use it:**

- Buffer for API requests or 3rd party system. E.g., if you needed to send some data to a 3rd party system but don't want to hit their rate limit and add resiliency, then SQS can be used for this. You could also use it to buffer writing data to a database.
- Queuing jobs. e.g., If you have a pipeline to optimise images and upload them to a CDN, you can use SQS to queue up those images. This means you have resiliency if an optimisation fails (it will auto retry) and will not overwhelm your down stream systems. A queue message is also long lived (unlike an API request) so you don't need to worry about time outs.

## SNS

**Sending**: 1 to Many

**What it is**: High throughput "fan-out" message distribution.

**When to use it**:

- You want to send SMS or Mobile notifications.
- You want a dumb pipe to send to lots of downstream targets.

## Eventbridge

**Sending**: 1 to Many

**What it is**: Event bus's. Think of them like queues but messages can go to multiple places. Similar to SNS but you can define rules for which messages go to which consumer.

**When to use it**:

- Need to distribute to multiple targets
- Designing an event driven architecture
- You want to integrate with third parties (like Datadog, Shopify, Zendesk etc.)

## Amazon MQ

**Sending**: 1 to Many (depending on configuration)

**What it is**: AWS's managed RabbitMQ solution

**When to use it**:

- You have a pre-existing RabbitMQ cluster and you don't want to migrate to SQS (yet).

## DynamoDB

**Sending**: 1 to 1

**What it is**: NoSQL database

**When to use it (for queues)**:

- You want to keep logs of data your system has processed. e.g., you could use a table as a store for a CMS. When you upload a new post, it triggers a pipeline that sends it to your social media accounts.

Hopefully you feel a lot more confident in making an architectural decision about which queuing technology to use in AWS. If you have an application and you're confused as what to use, send me a message on [twitter @joshghent](https://twitter.com/joshghent)
