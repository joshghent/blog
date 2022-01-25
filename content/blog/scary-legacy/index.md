---
title: Facing the Legacy Code Monster
date: "2022-01-25"
description: "Be the hero of your team and face the monster that is legacy systems."
tags: ["software", "productivity", "legacy code", "software engineering"]
---

I start new jobs like a spelunking caver, exploring all the systems, code and pipelines. I time myself to see how long I can ask questions about a system before I get a dreaded response:

*"Oh, that's a critical system that handles our core business. A developer wrote it years ago, who has since left. Now we reboot it when it breaks. You don't want to mess with that."*



I'm sure we've all heard words like that.

It seems almost a law at this point that every mature software company has at least one system that "works". But, has a few horrendous bugs meaning it needs rebooting and there are workarounds to its inflexibility that have built over time.

It's software that has no tests. Runs on an extremely specifically configured server (likely in a closet in the office). Where documentation has been passed down in folklore. And the person who originally wrote it now resides on the moon where they are unreachable.



Oftentimes, this software is left to rot because it's so critical that it's safer to have the workarounds and reboots than to fix it for good.



But, you shouldn't be deterred by this rhetoric of what current employees tell you. Why not?

* **No one deliberately writes broken or bad software**. I say no one, there are of course exceptions. But buy-and-large, software is written with good intentions in mind. And as it is running in production, it means it solved the original problem. Adopting this ethos will help dissolve the image of this evil unknown developer spiting you.

* **Current employees might be misinformed**. Depending on how long ago the software was implemented, current employees might have been misinformed. Swaths of developers may have come and gone and simply repeated what they were told on their first day. What started as a healthy respect for a critical system, soon becomes the subject of fear and anxiety.



Fighting these tendencies to buy into the anti-legacy cult will mean you can deal with legacy code. It will be dirty work, but gaining a deep level understanding of these systems will make you a hero among your team and an invaluable employee. 

How can you gain insight into these systems?

1. **Understand why it became legacy in the first place**. Finding the why on these systems is vital because it can help clarify your own journey's priorities. In some cases, it might be that the system was impossible to run in a sandbox. If so, that should be your first port of call. Focus on first principles and get to the core of the problem you're trying to solve. 
2. **Get it running in a sandboxed environment**. Provide safety for yourself and others, by setting this up to run in a sandbox. This might need the buy-in from someone on the DevOps team. This is a critical dependent step to working with a legacy system as without it you do not have the psychological safety to make changes. This process might take a long time and should be considered just as important as writing tests.
3. **Follow the code, and document it**. Target your reading of the codebase by following the various paths it takes. Review the entry points and build a map of the various "journeys". Then, pretending you are one of those calls, follow the path that the code takes. It's sometimes helpful to draw these paths on paper for further reference. After reading it through once, read it again, but document the functions as you go. In some places, you might not know "why" something has been written a certain way; mark these areas with a quick `TODO` comment for later review.
4. **Write integration tests**. Not unit, functional or anything else. Focus on integration at the moment. This maximises the test coverage whilst minimizing the level of understanding you need. Early on in this investigation, you likely don't know all the in's, out's and gotchas of the system. So, to avoid getting overwhelmed, it's best to write a suite of integration tests that mirror the "journeys" you discovered in the previous step.
5. **Share the knowledge**. Don't let yourself become another bus factor. Be quick to share the knowledge, even if there are gaps. This also encourages other developers to get involved, helping write tests and documentation.



This process is by no means perfect. But, be sure not to skip any of the steps, as they are all as critical as each other. It will likely not mean you are a complete expert in this system. Nor will it mean you can rewrite it in a more modern tech stack with the confidence of a solid test suite behind you. But, it does mean you have shed some light on an otherwise dark scary legacy code monster.

