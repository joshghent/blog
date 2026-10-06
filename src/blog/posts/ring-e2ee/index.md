---
layout: layouts/post.njk
title: "Ring is deliberately nefarious when you E2E encrypt your video"
description: "I turned on Ring's End-to-End Encryption for a bit more privacy. Previews vanished, recordings broke and answering the door stopped working. Here's what happened."
tags: ["privacy", "security", "smart-home", "rant"]
date: 2026-10-06
---

Over the past few years, I've embarked on a journey towards more privacy. This has ranged from migrating away from Gmail to removing data about me online and more. (I've also [moved my 2FA codes off Authy](/blog/claude-migrated-me-off-authy) along the way.)

One bugbear remained: our doorbell. I quickly realised I'd made a huge mistake. I bought a smart home product from [Ring](https://ring.com), a company [Amazon bought in 2018](https://www.cnbc.com/amp/2018/02/27/amazon-buys-ring-the-smart-door-bell-maker-it-backed-through-alexa-fund.html). I'd purchased it a while ago, primarily to answer the door remotely whilst travelling.

As I didn't want to wastefully throw it away now that I was more privacy conscious, I decided to work with what I had.

That led me to a Ring feature called [End-to-End Encryption (E2EE)](https://ring.com/gb/en/support/articles/7e3lk/using-video-end-to-end-encryption-e2ee). Ring describes it as enabling only you to have access to your video streams. That implies Ring employees can presumably see your video if you don't have it switched on, but I digress. I activated it so that the video was at least encrypted. Better than nothing.

![Ring's explanation of End-to-End Encryption: your videos are protected with a unique key so that only you have access](/assets/images/ring/e2ee-explainer.jpg)

I took it in good faith that the feature did what it said. As you'll see, the way the system behaves afterwards is so spiteful that I can only assume they really want that data.

## The warning signs

Once I activated the feature, the warning signs started.

Firstly, it disables the video previews on the dashboard. The message they give is that even the greatest minds working for a thousand years couldn't crack this problem. Given that the doorbell can still record video, take pictures and stream live video in E2E mode, I assume that's guff. It's simply a feature they can remove to make it more challenging to use.

![The Ring app dashboard where the Front Door camera preview reads "Access Restricted"](/assets/images/ring/dashboard.png)

Next, I went to view some recordings of when motion was detected. Not only were the thumbnails scrambled (not all of them, but quite a few, as you can see), the videos couldn't be played either.

No problem, I thought. Perhaps a temporary issue. But I've had a number of instances of this since activating E2E mode, and I'd never seen it before.

![The Ring event history screen, with corrupted, scrambled thumbnails on motion events marked "End-to-End Encrypted"](/assets/images/ring/event-history.png)

## Answering the door

Now for the crown jewel of all these issues: answering the door. It's the reason 99% of people buy one of these things (myself included).

After activating E2E mode, as soon as someone rings the doorbell, my wife and I both get a notification. We tap it and... it doesn't work.

![Live View showing "Another user is currently connected. Only one user at a time can watch Live View."](/assets/images/ring/live-view-another-user.png)

![Live View showing "Someone else is watching Live View from this Ring device. This Ring device is enrolled in End-to-End Encryption, and can only serve Live View to one mobile device at a time."](/assets/images/ring/live-view-someone-else.png)

It's odd, because I get this same message whether only I'm signed in or we both are. I tried a single account on a single device: same problem. A single account on two devices: same issue.

Apparently, supporting E2EE across multiple accounts is, again, too much of a technical challenge for Ring. They do at least [document the limitation](https://ring.com/gb/en/support/articles/7e3lk/using-video-end-to-end-encryption-e2ee), though it's not something that's made obvious when you switch it on.

For me this is the most egregious example of Ring being deliberately spiteful once encryption is enabled. Their main selling point, just gone.

And it only happens when the doorbell is rung. If you wait around 10 minutes, we can both view the live stream.

## Recordings, subscriptions and support

Because I cancelled the subscription, we also can't watch any recordings. This appears to be a change to Ring's plans, as previously there was a 30 day window where you could watch recordings without a subscription. My guess is that isn't great for [EBITDA](https://www.investopedia.com/terms/e/ebitda.asp). Of course, Amazon is only worth over a trillion dollars, so they can't possibly afford to make a little bit less. I'm increasingly convinced that if a penniless orphan could work to make something and be paid next to nothing, Bezos would employ them. Oh wait...

Reaching out to Ring support is a nightmare too. You get an AI chatbot with no hope of reaching a person who can do anything other than regurgitate knowledge base articles.

## Lesson learned

Don't buy smart home stuff, even if it's cheap. You pay with your soul and tears of frustration. And Amazon hates encryption. I wonder why?

On an unrelated note, would anyone like a second-hand Ring doorbell? Free to a good home.
