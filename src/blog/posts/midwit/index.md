---
layout: layouts/post.njk
title: Midwit
date: 2023-09-05
---

The midwit meme encompasses an idea that I've been thinking a lot about lately

**The more complicated something is, the worse it is.**

People _love_ to overcomplicate stuff

- Note taking - Evernote, Obsidian, Notion, "second brain" etc.
- Productivity - GTD, Pomodoro, "deep work", "flow state" etc.
- Software development - "best practices", "clean code", "SOLID", "TDD", "DDD" etc.
- Investing - "timing the market", "dollar cost averaging", "value investing", "growth investing" etc.
- Reading - "speed reading" etc.

But this "meta-work" that comes from the complexity distracts from the actual thing...

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Realized the most successful folks I know have a natural tendency to simplify everything (work life relationships etc)<br><br>Least successful meanwhile have a natural tendency to complicate everything instead<br><br>Probably not always the case but man, having a hard time unseeing it now</p>&mdash; aj (@ajlkn) <a href="https://twitter.com/ajlkn/status/1655833382914228227?ref_src=twsrc%5Etfw">May 9, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I massively resonate with this tweet. Simplicity is a key identifier of both understanding and success.

It lines up with a note I made a while ago:

> Always be wary of people who complicate the work they are responsible for. It’s either incompetence or them trying to make themselves into a single-dependency. Both cases are bad.

https://joshghent.com/notes#2023-04-11T16:04

I've seen this especially in software.

When people say things like "we can't do that because of system Y and that has a dependency on X". It's a red flag.

This video captures the essence of this reality in many engineering organisations:
https://www.youtube.com/watch?v=y8OnoxKotPQ

In tech especially, we love to overcomplicate things.
Most enterprise software companies I have spoken to build integrations with k8s. This demand is disproportionate to the number of companies that actually need Kubernetes.

I've personally found keeping my stack and system simple allows me to deploy quickly.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Creating a new product<br><br>❌ No development environment<br>❌ No local development<br>❌ No commit messages (just &quot;x&quot;)<br><br>It&#39;s the fastest I&#39;ve ever shipped.</p>&mdash; Josh Ghent (@joshghent) <a href="https://twitter.com/joshghent/status/1625458796351848448?ref_src=twsrc%5Etfw">February 14, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

More infrastructure and systems slows you down. And are usually introduced too early.
Even in enterprise software, these solutions come about mostly due to Conways law rather than in response to a genuine technical need.

Increasingly, I'm deterring new clients from using AWS, GCP or Azure. And instead favouring PaaS solutions like Netlify, Fly, Vercel or Render.
It allows the organisation to have simplified billing, and delay the need to hire "DevOps engineers" for as long as possible.

AWS, Kubernetes and other cloud native solutions are not a bad thing. But they are often overkill for most organisations starting out and even many mature ones.
