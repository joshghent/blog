---
title: "Resiliency"
date: "2019-10-08T11:43:03.284Z"
description: ""
---

At my previous post at [CloudCall](https://cloudcall.com), I was responsible for the SMS/IM backend. Whilst it was being developed, we made the classic mistake of not worrying about resiliency or testing since we were so stacked with features and had a manual QA department to act as a big bug dragnet.

Once things settled down however, one of my first priorities (for my own sanity and peace of mind) was to focus on resiliency. Here are the steps that I took, that contain translatable principles across any system. In my case, I was working with a suite of NodeJS API's and consumer services hosted on ECS or Lambda.

## Goals
Let's start of with some high level goals, because often resiliency can be used to mean "stopping a service from ever crashing". However, the goal of resiliency should be to accept failure, and instead be more focused on handling them gracefully.

I had the objective of making 99% of errors auto recover and be never told about them, but the 1% of errors I wanted to know about immediately. This included not just, is X service healthy, but also is the queue that it listens to being consumed at a rate less than it was being added to and so on.

Making the web more resilient is a certain goal of mine as I (as I'm sure you, the reader, have) been burned by going through a form submission, only for it to go wrong and have to do the entire thing again. Frustrating right? One example of this stands out in my mind where I submitted an application for a bank account. On the confirmation screen, I left it as I got distracted by something else. By the time I went back on the page, Chrome decided to reload it and what resulted was me having no way to login and a credit checking being done on me but no bank account at the end of it! Funny (in retrospect) perhaps but pointed out serious resiliency issues. If you start looking, you'll see them everywhere.

Here's what I ended up doing to make our SMS/IM systems more resilient.

## Backing Off
When the primary consumer service (loving named Short Message Event Gatherer or "SMEG" for short), we implemented a retry mechanism that just requeued the message to be re-processed. It was then consumed immediately by another instance which undoubtedly generated the same error (due to 3rd party errors etc).

The correct behaviour is to have a backing off mechanism. This means that in the event of 3rd party failures (databases, external API's etc) it will give them chance to recover before retrying the process.

We implemented a gradual back off procedure that increased 3x with each attempt. So after the first failure it would retry after 1 minute then the second would be after 3 minutes, and then 9 minutes and so on.

## Die!
Hosting the application with ECS (Docker) forced us to think in a "cattle" rather than "pets" way of working with servers.

When the applications health check failed or it's heartbeat to RabbitMQ failed, it would immediately kill itself. This would then trigger ECS to boot a new task to take its place.


## Health Check on Start
Linked with the above, when the application booted, we did a systems check to make sure it could connect to the database, RabbitMQ and a couple of third parties that we used.

If this process failed on startup, it means that ECS could try to boot it in another availability zone, increasing its chance of success.

We configured alerting on the back of this if AWS could not boot a container that added to our overall picture of the systems health.

## Automated end-to-end monitoring
The SMS project was primarily driven as an event-driven microservices architecture with lots of API's and consumer services along the way. And although we had unit and integration test for each of these services, the tests were still isolated to the scope of that particular service. There needed to be a way to guarantee that the whole pipe was flowing not just individual parts and their surroundings.

To do this, we set about creating Node and sometimes Python scripts that would simulate sending and receiving SMS text messages. These scripts admittedly often broke due to the configuration being a bit hacky but other than that, they worked rather well. These scripts were triggered on a CRON basis and could give us a lot of piece of mind that the entire product was ticking over well.

It also covered over failings on the part of monitoring the individual services, although they had health endpoints, often these health endpoints would just be `return res.status(200)` rather than abiding by the advice I have above. This meant that if one of those services genuinely did go down (which they did in the beginning), the end-to-end monitoring notified us immediately.

## CorrelationIds
Due to the microservice architecture patterns, tracing logs through the system quickly became a nightmare. To resolve this we implemented correlationIds that were passed from one service to the next. In our case, they were generated by our API gateway - Kong, so we could trace the call into our infrastructure right from the source.

This is not a unique idea but, looking back in retrospect, would be one of the first things I do. Additionally, as we had setup, I would configure these Id's to be generated at a gateway level as I often ran into issues where requests from a third party to us simply would "disappear".

## Fail early
Throughout any system, there will be a number of "failure scenarios" that you have to handle. Previously, we handled all failures the same, just requeued the message and then eventually completely failed.
Soon though, we found a number of issues that should not have been retried such as a lack of credit on the account. For these cases, we created a way to categorize the errors, some were critical and others were just warnings. This meant more messages went all the way through (maintaining a minimum viable service level) and fed back to the user sooner on issues that were their fault (sorry!)

## Aggressive feature flagging
Although we did not utilize a feature flagging tool such as LaunchDarkly (which in retrospect, we should but didn't know about it at the time), we still aggressively feature flagged everything in the backend. I had a number of features launch ages in advance of when they were actually "turned on" since my pace of work exceeded that of the frontend team. Often, I would create a feature, release it to our development environment, test it and sign it off. Then we would get a bug report or another more important feature, I would then add that on top of the previous feature which would then mean it was a pain to release one without the other. Could that be solved with better release cycles? Perhaps. But often I would not be aware of if Feature B needed to go before Feature A and when Feature A's frontend would be done.

Anyway, the solution was to add feature flags that we then toggled within the applications config that it pulled down from ASM. Easy-peasy. But this simple mechanism allowed code to be released and tested well in advance of when it was actually needed.

## Alerting
Being notified of errors is something that is critical in any good system, but in our case we had additional considerations around handling third-parties and since it was driven by a consumer service we needed to make sure that the queue was not backing up to far and auto-scaling policies were working correctly.

Fortunately, were able to setup RabbitMQ to post it's stats to Grafana so we could create alerting from Grafana based on different metrics coming from RabbitMQ - this could trigger auto scaling policies and/or emails and slack messages to the relevant parties.

On one occasion we had an AZ outage where although our service span up correctly in another AZ, some other components that our service required didn't. We soon knew about this thanks to the reporting we had inside the service to report it's health in relation with other services it required.

The end-to-end monitoring also had an alerting component since it notified us if the whole process of sending an SMS message took over a certain N number of milliseconds.

## Future Plans
Since I moved to a new company, I did not get chance to execute on all of my resiliency plans.

I had planned to add a new feature into our frontend that would allow people to manually retry messages (like on iMessage or WhatsApp), this would then trigger a new Lambda that would requeue the message based on the data in the DynamoDB table

Additionally, I was looking to implement a feature whereby messages that failed completely (after retries) would be moved to another "Failed" DLX queue. If somehow the app managed to process a message then it would start consuming from the "Failed" DLX queue.

Furthermore, implementing some kind of chaos engineering in production would have properly and automatically tested all the work I had done around handling sudden outages. Although we tested these manually, either by firewalling or taking down the service, we did not test it with each new release, only when the work was originally done so there is the chance it could break in the future. Automating tests like this makes it near impossible to run into these types of issues and uncovers additional flaws in the system.

## Summary
Each of these points could have been a blog post in of themselves but I believe it's often good to have a rough overview from a specific view point and then research the implementation separately. I hope you had enjoyed reading about this resiliency work and provided some ideas for how you can make a more resilient and robust web!
