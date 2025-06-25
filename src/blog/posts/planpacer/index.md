---
layout: layouts/post.njk
title: "Just launched, PlanPacer - The easiest way to add payment plans to your app using Stripe"
date: "2025-06-25"
description: "I made a thing! Here is how and why I built PlanPacer"
---

I launched a new microsaas - Planpacer is the easiest way to add payment plans to your app using Stripe.

Now the elevator pitch is out the way, here is some more information about why and how I built it - as well as some musings on the advantages LLM’s can give solo founders.

## Why I built it

Whilst in a meeting with some coworker's, we discussed Stripe as a potential candidate to serve as a payment gateway. The one blocker to using them however was a lack of dynamic payment plans based on products and other variables.

Another coworker lamented that they had a similar issue and ended up rolling their own solution.

I was surprised that stripe didn’t have this functionality since it had such a rich ecosystem. So I dove into their documentation to see what I could find. To my surprise, there wasn’t anything.

I concluded that there must surely then be product offering for this. Again, much to my surprise my search turned up short. There was one product but the documentation was complex and this feature wasn’t their core offering.

Now sprung the idea. If two people had the same problem, that’s product validation.
In order to validate it further I would need to put the feelers out. A couple social media posts later and I found that others did have this problem but there was no good solution.

## How I built it

On the train home, I decided to get to work. Using a hono template on cloudflare workers and Claude sonnet, I managed to get a bare bones MVP up within a couple hours.

I took the rest of the evening to then polish it up manually as the AI had spuriously created a lot of things that weren’t needed. I also ran through some manual testing of the API.

It broke me from a developer point of view, but I concluded that to launch an MVP there would be no automatic sign up (I run a DB insert and email api keys), or dashboard at all.

Next stage was to launch, I posted to socials and Reddit and am now continuing to post to share the product.
Whilst it’s not been a stampede to gain access to the product, I was able to launch in just a few hours. This is crucial because it meant I hadn’t wasted time building a product that no one might have wanted.

If nothing else, it was a great exercise in learning how to launch a proper MVP. And I hope it can serve as a good micro-saas that gains a user base.
