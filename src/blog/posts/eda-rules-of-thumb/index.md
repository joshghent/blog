---
layout: layouts/post.njk
title: "Event Driven Architecture Rules of Thumb"
date: "2025-01-09"
description: "A simple, slightly opinionated guide to event driven architectures"
---

Event driven architectures are a fantastic mechanism for powering decoupled services. But they depend on the contract - the actual data points within each event.
As with these sorts of things, there is always an "it depends" of what data should go within events. Therefore, this guide is not prescriptive and should be followed as a "rules of thumb" - guiding principles, not rules.

## 1. Think about testing and versioning early.
Each service should be considered in its own little silo and be looked upon by consumers as a third party. Often overlooked is when you need to change your event to modify the payload. How do you version your events? How do you tell consumers to upgrade?
It's certainly not an easy problem to solve. The first step is to define some guidance. In general this what I try to do
* Add a "deprecation" message to the old event - inform consumers of when the event will be retired.
* Publish both the old and new event for a time
* Publish documentation of how to upgrade to the new event
* Do a codebase search across the GitHub organisation to find instances of consuming that event - inform those teams who manage those services.
* Utilise an event catalogue such as eventcatalog.dev or event bridges schema discovery features to find other areas it might be consumed.

An informal way is to just make sure you inform all the teams who manage the consumers verbally. A more robust way could be to include a "deprecated" property and make sure that consumers check it. Another approach I have seen is to publish explicit "deprecation" events and have them published somewhere publicly (like to slack or something).
That said, once you have an established pattern for releasing the old and new events, there is basically zero cost for keeping the old one around (unless there is some kind of security issue).

As regards testing, there are tools such as Pact that can test contracts. But all testing libraries can perform mocks of the event emitter you are using and therefore mandate a certain event structure.

## 2. Avoid inter-service events
An anti pattern I see in "pure" event driven architectures, is when the service begins to emit events that are consumed only by itself. Whilst events are good for decoupling outside of your applications scope, there is no need to do the same within the service - it's already coupled. It often defeats the object of decoupling by creating more internal complexity for your application developers.
If you need to do some an action performing asynchronously, I'd suggest using queues. Otherwise, if you need data on the fly within a system then just perform a direct request to the function internally.

## 3. Structure events
In general you should try to have the minimum amount of data required for the consuming service(s) to perform the desired action. Across your organisation, it's useful to have a set structure that all events should follow for consistent parsing and error handling.
In my view, all events should contain a handful of properties:
* The source application name.
* The version of the event/source application.
* A trace identifier.
* The data - a generic JSON object containing all the info required
* A time stamp of when it was emitted.
* If you want to have a zero-trust architecture, then a sha256 hex digest "signature" property based on the above values.

## 4. Be strict with accidental coupling
One common mistake I see in event driven architectures is "physiologically coupled" services. This often occurs when team 1 comes along and says "Hey Team 2, we need to build this feature, can you start notifying us when the name of a user changes". And team 2 begrudgingly agrees and starts emitting events when the name changes. No harm done right? Whilst an isolated example, once you start crafting events bespoke to one consumer you create an immediate coupling. And it means in the future, you have to maintain that event for a single consumer.
Another example is when another service needs an extra piece of information not entirely related to your event, but adjacent. For example, you might emit an event called "OrderCreated". Another system consumes this but has a requirement to display the expected payment information. Now this should theoretically be handled in a "InvoicePaid" event. But alas, due to the phase of the moon and/or time constraints the payment information associated with the order is added to this event. In this case, we've created a three way coupling - between orders, invoices and the end consumer. Whilst challenging, it's prudent to push back at requests such as these and treat any consumers as a black box. Emit events with the data that tells them about the event. Nothing more. Nothing less.


## 5. Avoid event chain
Sometimes your system might need to do a sequence like so
`Order placed > invoice created > invoice paid > order approved`

Whilst the instance above is a valid one, it’s extremely easy to fall into a trap where your event driven architecture becomes an “eventually consistent sync architecture”.
You eventually get nested chains of events each sequenced one after another.

As an antidote consider:
* Do those intermediate steps need to exist?
* Could I fan out an event to multiple consumers instead of sequencing?
* Could I process the event in parallel? Do I need the result of the preceding event to action the next?
* Is this an event in the true sense? Or more of a pub/sub architecture?

Let’s think of some examples based on this:

In the payment example above, it might seem impossible to architect around this. At the end of the day, the invoice should be paid before the order can be approved and shipped.
In this case, an EDA pattern is not what you’re after. Rather it’s a saga pattern, an event orchestrator to ensure an exact sequence execution.

Let’s consider another example: a social media system. You may have an event chain like this
`PostLiked > NotifyPostOwner > GenerateFeedEntry`
In this case, the events can be processed in parallel. The post owner does not need to be notified of the like before the feed entry is created.

One final example - a notification system.
Your event chain might look like this `UserRegistered > WelcomeEmailSent > AccountActiviatinReminder > OfferSent`
We’ll gloss over that you shouldn’t roll your own drip marketing funnel. Anyway…
In this case you can use a fan out pattern to react to the original user registered event. If there is some logic around not sending one email before another then create the event with an appearance delay.

In all the examples, dependencies are created unnecessarily making it difficult to debug and each step assuming the previous succeeded.

I'm sure you can think of many more than 5 rules of thumb for event driven architectures but these are just some I think are often overlooked.
