---
layout: layouts/post.njk
title: "Vendor Lock-in is an Imaginary Problem"
date: "2024-10-23"
description: "Anyone ever actually moved from AWS to Azure? No, me neither."
---

Vendor lock-in is often cited as a reason to chose on-premise hosting, or to be mindful of "avoiding" it when using the cloud (whatever that means). Whilst there are some compelling arguments to mitigate risks associated with vendor lock-in, I'd argue that this is a completely imaginary problem.

## 1. You're already locked-in - at every level
Vendor lock-in is always discussed through the lens of the cloud. But, in reality the cloud is not a special class of tooling, it's like everything else. If you use a language like Javascript, you're already locked in to using the myriad of NPM packages you have. Worst still is if you're using NextJS, React, Rails or Laravel. These frameworks all lock you in to some degree. What about your continuous integration? The same organisations that worry about vendor lock-in to the cloud providers never bat an eye lid writing thousands of bespoke lines of github actions workflows.
The point is, the cloud is not the only place you're locked in. You're locked-in everywhere. But, it's about making appropriate trade-off.

## 2. Businesses rarely migrate from a cloud provider
Asides from a few extremely rare cases, it's likely that once AWS or whatever other cloud provider puts their claws into you, you won't escape it's clutches. Rather you'll likely embrace it. Abandoning the lift-and-shift you originally oversaw, and build "cloud native" - but why? Because it's cheaper (on the surface) and the recommended way to do things (according to the cloud providers). You also end up hiring staff with the skills to wrestle these tools to do your bidding. It's unlikely then that after doing all that work you would want to migrate to another provider. No only is the cost so astronomically high to make it unfeasible but there is also no reason, commercial or otherwise, for doing so. Even if they heavily raise prices, it's still a footnote for the costs that most businesses pay. In some cases however, at enormous scale, it does become economically advisable to migrate elsewhere. If you built the product in a vendor agnostic way, I'm sure the migration team will thank you. But if not, you're likely at a scale that the cost of doing this migration is just viewed as "one of those things".

## 3. You know what you're signing up for
When you go to a shopping centre (or mall), you might need to buy some clothes, gifts or yet another Apple device. But then you suddenly realise that you need shampoo. Now, will you go to the pharmacy shop that sells the shampoo despite the cost being a little higher? Or will you get it from your regular supermarket that is 20 minutes away? Of course, you'll pay the premium and buy it at the shopping centre. There are no tangible benefits to the product - they are the same. What you are paying for is convenience.
The cloud is no different, you might go in first of all to simply get some compute. But then quickly you start using it for everything - it's convenient. The business has already signed off on it, there is budget and your tooling is setup for it.
In other words, you know what you signed up for when you started using the compute. And if you need to pay a bit extra to use other things then big deal, you would have paid that cost elsewhere in the first place.
Public cloud pricing is publicly available (although notoriously difficult to forecast). So, due diligence should be taken up front to understand what kind of cost implications the cloud could have. While convenience often outweighs cost at smaller scales (like buying shampoo one time), in larger enterprises, even slight cost increases can lead to substantial expenses. This is why some companies consider multi-cloud or cloud-agnostic strategies to balance convenience with financial prudence.

## The only sound argument against vendor lock-in
Local development. That's it. Once you use bespoke cloud software, it becomes extremely challenging to create working development environments that mimic your live deployment. Therefore, I do favour against using "cloud-native" tools because it makes your life a lot more difficult for doing development work (which makes the money).

## Summary
As discussed vendor lock-in is largely an imaginary problem. There may well be 1 (or 2) extremely valid reasons for avoiding vendor lock-in but generally it's something that you need to not worry about and get on with shipping.
