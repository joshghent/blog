---
layout: layouts/post.njk
title: "I don’t know what to say…"
date: "2018-12-04T22:12:03.284Z"
description: ""
---

<div class="image">
	<img src="../../assets/images/githubscreenshot.png"/>
</div>

The issue raised for the event-stream breach. It’s a grizzly flame war that I would not recommend reading

I’m a little late to the party here but after having a couple of conversations at work and with others I wanted to document my thoughts on the recent security issues around the [event stream npm package](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident) which was used by lots of popular packages such as nodemon.

Surrounding this controversy was many questions about vetting packages more carefully as well as the tendency for node developers to just have a package for basic functionality they could implement themselves (looking at your left-pad).

Whilst all these questions are valid and worth discussing, this is not what I wanted to talk about in this blog post.

I want to talk about giving back to open source.

Most notably around all the discussion around why the original author handed over ownership to “some random”. People questioning how “dare” the author hand over ownership. Others even suggest a conspiracy between the package author and the perpetrator.

I had co-workers approach me saying they couldn’t believe someone did that and how it was “stupid” to hand over permissions to another person.

But was it “stupid” to do so? Well no.

This is open source software that is completely free. It was relied on by hundreds of packages and it alone had over [76M downloads](https://npm-stat.com/charts.html?package=event-stream). Yet, despite being depended on so much, it was not financially backed and was a labour of love — as so many open source projects are.

When you are a maintainer of a project, especially if it is popular, there may be many issues but not enough time to fix them. People often simply complain that the free tool they are using often for enterprise software is not working. I myself have handed across ownership of a project and given them full write access. I still take a look at PR’s every now and again but for all intents and purposes, it is their package. I was originally contacted when someone [posted an issue](https://github.com/OTRChat/NodeChat/issues/31) about how they wanted to work on it for a class project, I was delighted! Someone wanted to actually spend their time working on a project I originally authored. It never even cross my mind that they would do anything malicious and even if I did, in the politest way possible — it’s not my problem.

Rather than looking at this malicious package and thinking you either need to abandon node js or reject the whole concept of open source, **show appreciation for the packages you use.** Maybe get your company to give back either by either donating development time or financial resources to it. All other assets in a business are paid for — so why shouldn’t the underlying pieces of your code base be? It is as black and white as this — if the npm library disappeared, a lot of companies would be in serious trouble, yet only a small fraction of libraries receive support.

It is comforting to know that the node ecosystem is not isolated to this issue. Just last year, Equifax [blamed Apache struts](https://www.theregister.co.uk/2017/10/02/equifax_ceo_richard_smith_congressional_testimony/) for a breach to their entire customer base. Apache had fixed the issue but they had failed to update their servers — yet blame was still pinned to that project. From my research, I can find no record of them donating to or sponsoring the Apache foundation — yet their [net income last year was $587M](https://www.marketwatch.com/investing/stock/efx/financials).

The message is this, go and check out some packages you use a lot across your projects, see if any of their issues need help. If you do not have development time, check out how you can donate to packages with “[npx thanks](https://github.com/feross/thanks)”. If you cannot do either of those things, leave them a star, [there is even an npm package to do this](https://www.npmjs.com/package/appreciate). Just don’t complain about an issue in software you make money off, which you originally got for free.
