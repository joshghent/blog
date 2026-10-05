---
layout: layouts/post.njk
title: "I created my own status page"
description: "Status pages are a single HTML page that somehow costs thousands. So I built an open source, config-as-code one on Cloudflare, almost entirely with agents."
tags: ["ai", "open-source", "cloudflare", "product"]
date: 2026-10-05
---

![A screenshot of the uptime status page showing the current status of each monitored service](/assets/images/uptime/status-page.png)

Status pages have forever baffled me as products in software engineering. Most of the FAANG mafia use [Atlassian Statuspage](https://www.atlassian.com/software/statuspage), which inevitably costs tens of thousands of dollars while providing almost nothing except a single HTML page. Then you have other solutions like [UptimeRobot](https://uptimerobot.com) and the "indiehacker" ilk of products.

I was on the hunt for a status page, largely so I could keep an eye on my own services that I run in a Kubernetes cluster.

A hit of [Ballmer's peak](https://xkcd.com/323/) one evening led me to create my own. I've been running it for over a month now and it's great! I'm also pleased that it was 100% agentically developed. I barely read the code, least of all wrote it. Just prompt and ship.

But why bother creating my own when I could use something pre-existing?

1. **Free.** I'm cheap, so I really didn't want to pay for something like this. It just seemed so trivial as to not warrant the cost (except my time, which I'm valuing at $0. Note to readers: my day rate is somewhat higher than this, so don't get any ideas).
2. **Open source.** There seemed to be a stunning lack of open source status page software. There is the fantastic [Upptime](https://github.com/upptime/upptime), which runs on GitHub Actions. But GitHub's [recent reliability](https://github.blog/news-insights/company-news/github-availability-report-july-2026/), and the fact that it needs updating every so often so it doesn't pause, made it a non-starter for long term usage.
3. **Code based settings.** Most status page software pushes you towards a UI. I wanted something my agents could interact with, and that I could keep under version control.

With this vision, I moved on to tech choice.

Having recently created a number of SaaS products on Cloudflare, I'd been quite pleased with the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) local development setup.

For a long time now I've been a huge fan of [Hono](https://hono.dev), a lightweight, batteries included web framework, so I adopted it again. I cover this stack in more detail in [How I build products with AI](/blog/how-i-build-products-with-ai).

After the environment was set up, the agents set about creating the UI, the backend and, of course, the health check logic.

The frontend output improved significantly because I'd previously created a design system, which included standard tokens to use and design cues. The [same post](/blog/how-i-build-products-with-ai) explains how I do that.

Some back and forth ensued on the automated check logic while I came to grips with the implications of Cloudflare billing, but by and large the model took care of everything. At the time of the build that was [Opus 5](https://www.anthropic.com/news/claude-opus-5) on high effort.

By the time I'd finished, I had a working status page with all the features I wanted. I thought others could benefit from it (see point 2 above), so I set about making it open source.

Here's where things got annoying. I'd created one repository called `uptime` and deployed Cloudflare from there. That meant the repo held both the status page code and my own deployed settings, like the health checks for my services.

So I cloned it into a second, private repo and repointed my Cloudflare deployment to that. The private repo is the implementation of the public one: it holds my config, such as which services to check and how, while the public `uptime` repo went back to being a blank slate.

Then I realised I'd missed something else: updates. If I made a change to the public `uptime` repo, how would I get it onto my own status page? And how could I keep updates central rather than pushing them onto the consumer?

So again, I reworked the system. This time I added a command to create a new status page:

```bash
npm create uptime my-status
```

I also removed almost all the files from the private repo. It now holds just the config, and everything else inherits from the public `uptime` package.

From there I had Claude set up [Release Please](https://github.com/googleapis/release-please), so we got [semantic versioning](https://semver.org) and, hey presto, updates flow to every status page!

I truly believe that while we are witnessing the death of many SaaS and open source products, we are also in a golden age of them. I found this project super fun to create, and it gave me an appreciation for status page technologies. If you care about health endpoints more generally, my posts on [building awesome application health checks](/blog/health-checks) and [allgood](/blog/allgood) are a good companion to this one.

### What's next

Mostly, maintaining it. I don't have any other major features planned. The main thing left is more notification options. I want to build Discord, Microsoft Teams, Slack and webhook integrations, so you hear about an outage before your users do.

Check out the project on [GitHub](https://github.com/joshghent/uptime) or grab the package from [npm](https://www.npmjs.com/package/@joshghent/uptime).
