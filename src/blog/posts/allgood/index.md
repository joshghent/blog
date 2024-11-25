---
layout: layouts/post.njk
title: "Allgood - Instant healthcheck webpage and API for JS/TS projects"
date: "2024-11-25"
description: "Why and how I created allgood"
---

Over the weekend, I shipped a new open source project - allgood. It's an npm module designed to instantly add a `/healthcheck` page to your app. Out the box it supports Express, Fastify and Hono. It could be adapted to use Next as well (although I haven't tested this).

After you set it up, you get a page like this:
<img src="../../assets/images/allgood/allgood.png"/>

You can find the [code on GitHub](https://github.com/joshghent/allgood) and the [library published on NPM](https://www.npmjs.com/package/@joshghent/allgood)

It was a fun project to build and satisfying to ship something in a weekend. I haven't built an npm module in over 5 years(!) so it was nice from that perspective also.

## Why I built allgood
It mainly boiled down to 3 key reasons:

1. Shipping is good. It's often easy to get caught up in the trap of endless delivery timelines, interspaced with laborious planning meetings, discussions and the like. Creating something and putting it out into the world is amazing. And this project was something small I could deliver and provide value. It was satisfying to actually see the project live.
2. Open source is good. A lot of my recent programming work outside of the jobby job has been on commercially focused products (a side hustle if you will). To avoid the complexity that billing and marketing bring, I wanted to create something entirely free and for no tangible benefit to myself other than self-satisfaction. Doing so enabled me to focus on the code and to craft a nice API (internal) - thinking about extensibility and simplicity.
3. It's a tool I'll use. Like most, I scratch my own itches. It's one of the great things about knowing how to code. You stumble across a problem you have, and you can solve it!

## How I built it
By far, the most difficult part was setting up the build system so that it worked with both `require` and `import` syntax. It was a total pain, and tells me something not that nice about the state of the JS ecosystem - I digress. I knew this was going to be a pain though so I figured I'd use a boilerplate. The one I landed on needed a little bit of fudging but I got there in the end.

Afterwards, I got started on writing the check code. I started with memory usage as I thought this would be the easiest - simply using `process.memoryUsage()`.

Now though, there was a challenge. The user could configure N checks to run on their healthcheck page. I needed to run all of the checks (in parallel, for speed) and then display the results in a consistent order. I also needed to call the correct check function.
The solution I landed on was for all checks to use a consistent interface. This meant I could guarantee the output of each check was consistent. They are sort of decoupled from the app itself meaning the display message and other properties are entirely within their control.

Here is how the interface looked
```ts
export interface HealthCheck {
  status: Status;
  value: string;
  componentName: string;
  message: string;
  time: number; // Time in milliseconds that elapsed running the check
}

// The interface that each check implements
export interface CheckFn {
  (config: Config): Promise<HealthCheck>
}

export interface CheckRegistry {
  [key: string]: CheckFn;
}
```

I then created an object mapping of "checks" to their functions. And then tethered it together with `.maps` and `Promise.all`.

Knowing my own monkey mind, I wanted to make this as maintenance free as possible. So when new dependency PR's are created, I can just merge them straight away. Therefore, I took some time to create a test suite. Initially I wanted to use the new native node test suite. But after trying to wrangle with mocks I gave up and used Jest instead - which just worked.

One surprising outcome of this project was the package manager. Using pnpm was a really nice interface and extremely quick. There wasn't a lot of dependencies to install but I never got into the usual hassle of dependency wrangling I usually do.

## The future
I'm not sure what this project will yield but after sending it round to some colleagues I've got a good response and had some good feature requests. It's fun to code and create things purely for the sake of the act of creation. If you know how to code, do the same - you'll feel amazing.
