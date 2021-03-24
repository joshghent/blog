---
title: "Solve Your Problems. Not Others."
date: "2021-03-24"
description: "Some thoughts on NIH, Boilerplate code and Solving core problems"
---

What is your business? What is your product? What is your core mission? These are questions I ask myself and my clients, continuously. They help delve into _what_ the customers are paying for, and in turn, what your staff are paid for. In the world of flowing VC money, it's often never questioned what practical value that £X is giving you. But businesses of all sizes are prone to this. Losing sight of these questions often evolves complex service criteria that leads teams to create a bespoke solution rather than something off the shelf. I'm willing to wager that, if you're a software developer, you've worked on a service or feature that could have been handled by a third party in the past month. Or, worse, you've resolved a bug that wouldn't exist if you had used a third-party solution. I know I have - on both counts.

Through my career and starting my own business, I've developed my understanding of what I'll dub "business thinking". Business thinking is putting your numbers hat on and practically evaluating options. Not just on "can I do this or not" but what it will cost the business in both money and time. As an example, at York-E we needed a contact form with some complex routing to different support teams based on the locale a customer-specified (an Egyptian customers request would go to the Egyptian support team etc). I began to scope this out before realising we could likely use something off the shelf. After some DuckDuckGo'ing, I found Formspree could handle this. The catch? It's $40/mo. That's quite steep for a contact form. Any developer worth their salt could bash one out in a few days. Right? At this stage, many teams would dismiss the idea of handling such a trivial task to a third party, but we chose to keep it as an option. Afterwards, we calculated that it would take 2 years before building our own contact form system would be worthwhile - not factoring in maintenance.

> The lesson? Don't ignore third-party solutions even for trivial tasks. Contact forms are not York-E's business. Providing an online education experience is.

## Boilerplate
When creating new products, I've reviewed these questions as well. I poured a great deal of time into creating [TurboAPI](https://turboapi.dev) from scratch. The only "boilerplate" I used was create-react-app. The express API, lambdas, serverless configs, GitHub actions CI/CD pipelines, all written from the ground up. In retrospect, this was a mistake, I should have taken more time to find a boilerplate and use that. The parts that took me the longest with TurboAPI, were fixing bugs with TypeORM queries, Stripe billing and user authentication - not the actual "app" itself. The core technology of TurboAPI was written between 1am to 3am on our hallway floor. This pales in comparison to the overall time I spent on TurboAPI for the MVP. Which, according to Toggl, was about 45 hours. To have used a boilerplate that saved me 20 hours would have been a lifesaver. Now, when developing new products, I use a boilerplate and am familiar with chopping and changing it according to my needs. Sure, I still need to build some bespoke but basic elements but this is small by comparison.

There are lots for free that offer a basic CRUD API with Mongo and React. And recently, there has been an explosion of paid boilerplates, either offering a one-time payment or monthly subscription. Although it seems like a great deal of money to part with, getting up and running quickly is invaluable. I'm in the process of creating a niche boilerplate that I'll share soon.

> There is another lesson here. Solve the problems that are not solved. Displaying tables of data, handling authentication, and billing are problems that have already been solved and many boilerplates are stitching these together.

Some argue that boilerplates mean that you won't have system understanding and will make it more difficult to debug. This might be the case. But, the focus here is to get your MVP out and start delivering value. Even if this is the MVP of a feature inside a company, the same principle applies.

Here are the key takeaways for all software developers - regardless of experience:
1) Know how much your time is worth - this is important in evaluating if it's cheaper and faster to use a third-party service
2) Know what problems your solving - is it part of your core business? If not then try to outsource it in some way
