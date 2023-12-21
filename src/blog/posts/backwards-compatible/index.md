---
layout: layouts/post.njk
title: "Why Backwards Compatibility is Critical"
date: "2020-07-03"
description: "In the 'move fast, and break things' world, backwards compatibility has been cast into the realms of insignificance, but here is why it's so important even now"
---

Backwards compatibility is not something I see discussed much in tech circles. It's all new-new-new, fast-fast-fast. Piling features on top of one another and tightly coupling releases between services. Previously Facebook, the [4th most popular site on the internet](https://www.alexa.com/topsites) no less, had the mantra of "move fast and break things".
These are the kinds of sentiments I see all around me, particularly from startup and SaaS companies. I've always felt that coupling releases too closely was insanity inducing and seen first hand how corrosive they were to a customer experience of the product.

But the web hasn't always been like this. The core backbone of the internet, in the form of TCP/IP, DNS, HTTP and even HTML and CSS, has been unchanged for many years - or at least changed in manner that doesn't break previous versions. As an example, both [Space Jam's website](http://spacejam.com) and [Million Dollar Homepage](http://www.milliondollarhomepage.com/) both still function on modern browsers, having been created in 1996 and 2005 respectively.
So what happened? There isn't one conclusive answer to this, more a prevailing zeitgeist amongst developers and product managers. But in my view, it's due to the large investment that technology has seen over the past 20 years. It's grown exponentially.
With that, we have seen bad business practises, ill thought out ideas and customers that are keeping a company afloat. These things existed before, but now manifest themselves in the technology that these organisations build.
Additionally, products are architected around small services given a single responsibility. Previously, the web was simple - throw a LAMP stack on a server somewhere and bobs your uncle. There were a lot less moving parts.

Now this isn't going to be a nostalgic post where we reminisce the days of the "good ol' web" or something, because I find that all a bit petty. I want to discuss how we need to build things to last and practical ways to do that in the face of "moving fast" (side note: watch Bryan Cantrill's fantastic talk on the principles of tech leadership [here](https://www.youtube.com/watch?v=9QMGAtxUlAc))

# But why do developers avoid making things backwards compatible?

This article wouldn't exist if there wasn't at least 1 answer to this question.
Primarily it boils down to "it's more effort". If you're making a major change to a service, and you have all other teams that consume or otherwise use this service in some way to also make the needed change then it's reasonable to assume you don't really need the old system. And potentially more work to maintain it.
Your team may also not even have a "versioning" strategy in place. I've sat in meetings well over 5 hours of meetings about how to version services with no outcome. A lot of people have opinions about this, and often, developers seem more intent on arguing the others point rather than accomplishing the objective behind the change.
Furthermore, there have arguably been a number of failures in attempting to preserve backwards compatibility such as with Java and SQLite3.
These challenges can be major roadblocks in creating stability and backwards compatibility in your products services.

# Why is it important then?

First we need to clarify that preserving backwards compatibility is not about holding onto legacy. If something is old, busted, broken or unused, then by all means, pave over it and start afresh. There's no need to attach infinite eels to yourself to support absolutely every single use case of your service. Things change as software changes. It's natural.
On the other hand, backwards compatibility is about not creating unnecessary work for hundreds of your users every time you make a change. Or coupling releases so tightly that everything has to be deployed at exactly the same time and caches flushed in sync. Or having no deprecation plan and changing external interfaces constantly.

Stripe treads this line very careful (however, I am unaware of the overall experience as a developer there). Being a payments processor, there has to be certain guarantees about how things will be handled.
To accomplish this, Stripe use a date versioned API system. You get assigned the latest versioned API when you create an account and can easily update the API if you so wish. But you also have the option to leave it completely. In fact, there are still websites I built a few years ago with now old Stripe integrations that tick along fine. They have a great post about their versioning mechanism [here](https://stripe.com/blog/api-versioning)

# How to do it

You might assume that because you use a /v1 and /v2 in your endpoints you're all set right? Well, not so fast. Ultimately, as humans we are subject to reason about things that we ourselves cannot fully understand. Therefore, what constitutes a major version bump for some, may not be for others.
So how can you do it?

## 1. General coding practise

If you're changing something minor like the name of a parameter on an interface or the type, then there is the possibility that you can support the old method by casting it to the new type and so forth. There are many general coding practises that allow your code to be bug hardened whilst not introducing lots of spaghetti.
Additionally, a good starting point for all backwards compatible changes is to mark the "old" code with a "deprecation" warning of some kind so that other developers in your team know not to use that code any more.

## 2. Documentation and Deprecations

If you're going to make a breaking change to something, you need a way to communicate that to the consumers of your product and you need to tell them how to update if they absolutely cannot be held on the previous version for some reason.
You can do this by giving the customer, plenty of warning via email, an account manager or a deprecation warning in the response. You could have a system whereby, when a deprecated API method is called, it logs it to a table. Each day, the table can then be scanned and you can tell the customer "You called X route which has been deprecated and will no longer receive updates, please see N website for documentation on how to update".
Hand-in-Hand with this goes a clear policy on how long you will support "deprecated" routes. Depending on the market you're in that could be a few months or a few years. Either way, be clear to your customers. Again, Stripe does a pretty good job of saying "you can use this near indefinitely" and including that as part of its marketing to developers.

## 3. Pivoting

If making something backwards compatible has become so incredibly painful that you'd rather play hopscotch on a floor of hot coals, then you need to ask if the service has pivoted to a point where it's potentially a whole new thing.
As an example of this, I created a service for a messaging application that kept track of when a customer had last read a particular message. However, it then needed the functionality to manage if the customer had left a group message and then if the customer had muted the messages and so on. Before you knew it, it was no longer an API for managing if the customer had read a message or not but more a fully fledged notifications API.
In retrospect, I should have seen this inevitability. But the service had devolved to a point where it wasn't anything like the original. Although it was an internal only service, it's something that looking back I should have redone and gradually migrated over to the new service.
Although this may not be preserving the backwards compatibility in a true sense, as long as you provide a sensible upgrade path and don't immediately shutdown the old service then it's ok in my books.

## 4. Versioning

We've touched on this a few times in this post, and arguments about different versioning strategies has been talked about since time began.
I'm not going to provide any guidance on which one is best or which one should you chose - simply decide on one as a team and agree upon clear definitions about what constitutes a version upgrade. Then include this as part of your release strategy.
If you work with continuous deployment then perhaps look at something similar to Stripe or a Semver strategy that goes beyond a "/v1" and "/v2" route structure (although may include it).
It will depend on a few factors
_ Expectations of the market you are in - how long do you customers expect to use your product and forget about the implementation - hint it's often longer than you think
_ What is your release cycle like? - if it's daily then you need something to automate the process, if it's each decade where you pack your software onto a disc then it can be something manual \* Do you have a lot of third party consumers - if there consumers to your service that go beyond your company then you will have different requirements about deprecation etc.

TL;DR - Pick one and go with it. You can even pick different mechanism for different services!

## 5. Limit dependencies

> Mo' Dependencies, mo' problems - Notorious D.E.V

By limiting the number of dependencies you use, versioning will be easier because you no longer need to provide constant security updates and check if every last version of your software works with it.
The Node community is particular bad at this one, and often does provide security and bug fixes down stream and instead just forces everyone to upgrade to the latest version. We can do better than this. But we make our lives a lot easier by reducing dependencies.

# Conclusion

There are lots of arguments against backwards compatibility and I can understand why. Personally speaking, I want to build to last. I'd like to think that in 10 years time I could still use my products without having to change the integration.
Something about seeing the spacejam website just sort of fills me with a warm glow of a moment in time that is accessible at any point.
