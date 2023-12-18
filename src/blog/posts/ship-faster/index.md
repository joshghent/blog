---
layout: layouts/post.njk
title: How to Ship Software Faster
date: "2022-01-18"
description: "Releasing new versions of software be a panic-inducing experience. Here's how to ship faster quickly and calmly"
tags: ["software", "productivity"]
---

Remember when software came on a physical medium like discs, USB sticks or [punch cards](https://www.smithsonianmag.com/smithsonian-institution/margaret-hamilton-led-nasa-software-team-landed-astronauts-moon-180971575/)? Me either. Software release lifecycles used to be lengthy - years-long in most cases.

As software flourished on the web, we grew accustomed to "moving fast and breaking things". This approach has a lot of drawbacks. Not least because some customer bases are more sensitive to problems than others.

They still wanted to "move fast", but not "break things". The speed of the web, with the safety of physical releases.

The solution that many teams came up with was to mass up lots of work and then release it every so often. Taking the bad of both release systems. The lack of safety from a "move fast" release and the slow speed of physical releases.

It's likely that you work in a place like this, or have worked there in the past. Organisations where DevOps are a secondary concern to the application itself. Places where "continuous delivery" is considered voodoo reserved for the FAANG's.

I have found myself at these organisations all my working life. I quickly noticed the following patterns:

1. Developers have little to no confidence that a new release will not break something.
2. That low confidence means there is anxiety when it comes time to release.
3. The time between releases meant upstream work causes conflicts.
4. Manual testing cycles had to be done to establish any confidence.
5. Bugs upon release caused finger pointing; with [psychological safety](https://www.pageittothelimit.com/psy-safety-with-tom-geraghty/) diminishing as a result.

What can you do if you notice these patterns?

### The solution is to ship faster. How?

**Set expectations of delivery time**. Start by opening a discussion, with stakeholders, about what the expected time to ship new versions will be. Establishing these rough boundaries govern the setup of processes used to ship software. Generally speaking, shareholders will want features as soon as possible. But, if you are currently releasing once a month, you should aim to start releasing bi-weekly. Get a bit further along before promising to [deploy 30-50 times a day like Instagram](https://instagram-engineering.com/continuous-deployment-at-instagram-1e18548f01d1).

**Make systems observable**. Low confidence in releases often originates from systems with little observability. This means that if something does go wrong it's a nightmare to figure out why. Before starting to increase deployment frequency, you need a system you trust. Focus on the fundamentals - searchable logging, automatic monitoring of key website pages and API endpoints (using [UptimeRobot](https://uptimerobot.com)) and automatic tests (integration and unit at least).

**Set small concise deliverables**. Doing manual releases requires an immense amount of cognitive overhead. Having a small number of tickets and clear deliverables in each release reduces this cognitive load. There is less to remember to test and check. And other areas of the system are less likely to be affected. If releases are simple to do, it's more likely they'll get done.

**Invest in your DevOps**. This is the crucial technical step. There are many other articles about having top quality development tools to aid deployment, so I won't add to them. But principally, look at the areas that take the most time or have the least confidence, and automate them. For example, a bash script written 2 years ago for bundling the app is unreliable, take time to address this.

**Use Feature flags**. Often releases get delayed because stakeholders don't want to reveal new features to customers. Using feature flags allows you to ship unfinished features without breaking things for everyone. A further selling point for stakeholders is that feedback can be gathered from select customers before a full rollout is done.

**Make mistakes a non-issue**. If the risk of a new release causing a bug is on par with starting a nuclear war, people will shy away from it. By making it easy for developers (or better yet, a blue-green system) to rollback to the last known stable release, it will break down the fear around releasing.

**Use checklists**. Anything that cannot be automated (or you don't have time to do so), should be made as programmatic as possible. Using checklists reduces the guesswork out of manual tasks. It means reliable releases are simple to do.

---

Shipping software faster is a mix of both cultural and technical aspects of an organisation. Both are equally as difficult. Work towards the "release nirvana" that awaits once these systems are set up. Your team will be rewarded with lower blood pressure and your business will be rewarded by getting and retaining more customers.
