---
layout: layouts/post.njk
title: Making the case for CI/CD
description: If you are struggling to implement CI/CD in your team, here is how to do it.
date: 2022-08-31
tags: ["cicd"]
---

If you browse developer forums, continuous integration and continuous delivery will not be new concepts to you. We all love the utopian ideas of being able to open a pull request and commanding an army of robots to do your bidding and get the application tested and shipped.

Unfortunately, the reality of many businesses is different. Developer experience is an area seldom invested in; despite being such a huge opportunity for large productivity gains.

Perhaps already you have been pleading to tinker with github actions, switch to a PaaS or use a IaaC but to no avail.

So, how can you champion the move to a continuous integration and delivery?

First let's look at the reasons people may object.

- **They are scared of change.** This is a powerful force not to be underestimated, even in the fast-paced technology industry. This excuse is particularly potent with stakeholders, who don't (understandable) know the ins and outs of technology.
- **They don't trust the team.** If things are already going wrong, why would they invest time in a risky new deployment strategy? Often upstream trust issues rear their heads in these discussions and it's important to navigate as carefully as a sailor does with rocks by a shoreline.
- **They lack metrics to determine if change is successful.** As Peter Drucker famously said "that which cannot be measured, cannot be improved". Without numbers going up, down or sideways, a stakeholder cannot correctly understand the team and systems overall health.
- **The vision seems too good to be true.** If we dream of deploying 50 times a day to production like Instagram does, then it can seem like we'll never catch up to that level.

## Start with approval

It's utterly pointless starting any of this without some kind of green light. Although we love stories of people doing things under ground and against the odds, the fact is that you're not creating a cure for cancer. You should speak to your immediate team and get their feedback. Then create a formal proposal and, again, get more feedback. Then get the green light from the relevant stakeholder.

The proposal should outline the overall vision for the system, the advantages, the risks and the downsides. If you can't think of risks and disadvantages, then you haven't thought about this problem enough.

Throughout all this, make sure to not just push your vision on the team. Be collaborative. Keep an open mind. And don't pretend that it will be a breeze and nothing will go wrong (hint - it will!). The worst thing to do is to try and do it all yourself or with only a couple true believers. This is a sure fire way to make sure the initiative is abandoned.

## Start with the data

Often times, stakeholders say they want a fancy dashboard with burndown rates, bug reports and the position of Saturn. In reality, an excel spreadsheet will work.

Create a spreadsheet with the following attributes:

- **Release frequency.** For tracking the number of releases on a given day/week.
- **Rollbacks or defects detected.** A count of the number of times you have had problems you have had to fix or rollback on a production system.
- **Hours to deploy.** This one requires a bit more coordination. But, developers could start tracking their deployment time with a specific time tracking measure in software like Toggl or Harvest.

Start measuring these metrics for at least 4 weeks before making any changes. And make sure the spreadsheet is shared, collaborative and documented well - both inside the team and to any stakeholders.

## Start small

Now you have your numbers, you can start to look at improving them!

Using your original proposal as a guide, build up a step by step plan that can be implemented in a sprint (a 2 week period) or less. Be mindful of any steps that will create blockers for others and plan around this accordingly to mitigate their impact.

Unlike with code, we often can't rollback changes made to deployment and testing systems. So, think carefully about how those changes can be reversed if needs be. I've been burnt many times by not considering this carefully enough.

After each step, take a 1-2 week break before making other changes, continuing to record your data points. Verify that the numbers are heading in the right direction. And if they aren't, you can address this in a retrospective meeting.

A sample plan may look like this.

```
Goal: Be able to merge into the `staging` branch from a feature branch and have the code automatically tested and deployed to our staging environment.
Currently: FTP files onto a server manually once a week on Tuesday. No test suite.

Step 1: Create a testing suite for critical components of the application
Step 2: Create a github action (or other CI service) to run the test suite for all new pull requests
Step 3: Add a github action that FTP's files from the `staging` branch to the staging server
```

Obviously I have glossed over a number of details, but hopefully you get the idea. It's about making small changes and not just going for a "big bang" type change (which are always doomed to fail).

It can be tempting to prioritize big change first, but as a word of caution, try to focus on being iterative rather than catching the big fish.

As you go forward, and the metrics improve, the buy in from stakeholders and others will improve. Nothing makes a stakeholder happier than knowing that it's cheaper to do some work!

This can drive further change which follows a similar process as outlined above.

By the end of it, you may not be deploying to production 50 times a day, but doing something much more humble. Saving you and your colleagues, hours of mundane, repetitive and error prone work. And isn't that just as valuable?
