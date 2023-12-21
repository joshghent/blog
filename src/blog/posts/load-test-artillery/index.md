---
layout: layouts/post.njk
title: How to Load test an API with Artillery
date: 2023-02-23
draft: true
---

Load testing is often thought of as a daunting endeavour.

But it's actually quite simple! Let me show you how you can do it using a tool called Artillery.

## Pre-requisites

One of the main hurdles with load testing is making sure that your own machine is not a bottleneck. When load testing, you use a large amount of CPU and Network I/O in order to simulate large numbers of users hitting your endpoint. If you do anything more than 20 virtual users then you will probably want to avoid using your laptop for the load tests.

For this reason, I highly recommend spinning up a VPS (for example with [DigitalOcean - referral link](https://m.do.co/c/1bde5ebad5ef)). This will enable you to have a high amount of bandwidth and CPU.

Next, install Artillery with `npm install -g artillery@latest`

Then, hey presto, you're ready to go!

## Basic Example

Let's say we have a simple HTTP API with no authentication. It has an endpoint we want to test for speed `/health`. Let's setup the artillery configuration to run a basic load test against this.

## Authenticated Example

## How to read the results
