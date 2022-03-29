---
title: "Should I split my monolith into microservices?"
date: "2022-03-22"
description: "Microservices are the defacto standard for large scale systems. But is it always the right choice?"
---

Likely you have clicked on this article to find the answer to the aforementioned question. The quick answer is - **it depends**.



### Rephrase your question

Before I explain why try to rephrase your question. **What problem are you trying to solve by splitting up your monolith?**

Answering this will help you to clarify if the approach you take is going to solve those problems.

If you simply want to split it up because you feel microservices are "better". Then you should think again. Because it will create more problems than it solves.

But, if you have a burgeoning team who are spending hours resolving merge conflicts, then microservices are something to consider.



### Write down your problems

Using the list of "problems" your team has, write down next to each of them how microservices will solve or alleviate that issue.

But do the same with other solutions. Consider refactoring parts of the system, removing them, or restructuring the folders.

This can sometimes be a deceptive process, however. Often, people consider microservices because of both/either of these factors:

1. The monolith is buggy and/or slow
2. Developing new features is a nightmare

Unfortunately, on a long enough timeline, you are going to face those problems with microservices. Except for this time, instead of having one buggy and slow place to fix, you have fifty. It's worth doing your research and thinking about whether these things will *actually* solve your problems or just mask over them.



### Consider the downsides

Microservice advocates often gloss over the downsides of microservice architectures. But they are important to consider.

As a guiding principle, if you don't have a dedicated DevOps team or your engineering headcount is below 25 then I'd strongly recommend keeping things as simple as humanly possible. Remember that value comes in the form of features and fixes, not in restructuring the application.

Everything has a "cost", both upfront and ongoing (in technology as well as life). Make sure you know what these two figures are. For example, it might require a 4-week project upfront by 3 engineers and 1 day of engineering time per week ongoing. Weigh this up against the alternatives to tell you if it's truly valuable.

Some other downsides include

* The learning curve for the new project structure

* Bug fixes are harder to track

* Monitoring is more challenging

* End-to-end testing is difficult

* Lots of surface area to secure, configure infrastructure and release pipelines for

* The learning curve for infrastructure deployment

* New problems such as latency and load balancing

  

In light of these downsides, maybe microservices are less appealing. What's the alternative?



### The alternatives

Depending on the problems you're trying to solve, I'd suggest some alternatives. You can use many of these approaches.

It's worth noting that just because moving to microservices isn't the best right now, it might be in the future. These suggestions will help to make that migration easier if/when you make it.

1. **Write tests.** Focus primarily on integration. Attempt to cover your entire application.
2. **Remove the cruft.** Over time, components of an app are retired but the code lives on. Remove these parts to pare your codebase down to only what is used. If they can't be removed, then make sure it's well documented.
3. **Configure monitoring.** Make the components of the system extensively monitored. For example, the email notification system, user creation and back-office reports should all notify you if they go wrong. This should be separate from the code itself using a monitoring solution like Sentry or Datadog.
4. **Upgrade your tools.** Make development fast by investing time in your tools. If your app takes 15 seconds to recompile, make it so it compiles in less than a second. The payoff for this time is ten-fold and will make your team rejoice.



Sometimes microservices are the right approach. Sometimes they aren't. Mindfully consider the situation and make the migration easy. 

I've talked only about the decision of "monolith to microservices". But, lots of this advice applies to any technical decision your team is making. It depends.