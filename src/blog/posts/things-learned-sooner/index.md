---
layout: layouts/post.njk
title: Five Things I Wish I learnt sooner
date: 2023-02-13
---

I have been a software engineer for the best part of a decade (yikes, I'm old now?). And in that time, I have learnt a great deal about software development - languages, frameworks, architecture and much more.

But, since becoming a freelancer, I have learned how to make my work more successful and less chaotic.

I'm sharing those lessons here because I wish I had learned them sooner.

1. **Attach metrics (KPIs) to work.** If your work doesn't have metrics that business people can see go up or down, you will be in trouble. Metrics (or KPIs) are the genesis for doing successful good work. Developers often think that things such as technical debt cannot have business metrics. This was how I reasoned for many years. But turns out they do! Technical debt, for example, can be used against the metric of user retention or revenue. How? By reducing technical debt, we speed up the application, which increases customer retention.

   Additionally, by attaching metrics to your work, you can gain insight into how that work is progressing. Teams are motivated by seeing progress being made, so make sure to be transparent and share these metrics with them.

   Always attach metrics to your work. If there are no metrics, it's a sign that the project will likely not get done.

2. **Be requirements led.** This means to start with the problem first and the solution second. Developers often need help creating a solution to something before fully exploring the problem. It's a natural tendency - after all, we are builders. But, by approaching things from a solutions-first mindset, we fail to appreciate all the requirements customers (both internal and external) have.

   For example, many people start their new year's resolutions with "I need to start going to the gym". This is a solutions-first mindset. The requirements are more complex than that. Solutions are difficult. After all, why do you need to go to the gym? To look a certain way, feel a certain way, or stop eating certain foods? It raises many questions. But by asking and exploring the answers to them, we get down to the root of what you actually want. Armed with a list of requirements, you can now build a solution to satisfy them and maximise the value. Statistically speaking, when it comes to the resolution "go to the gym", by the 3rd Thursday of January, 80% of hopefuls will have stopped. In the same way, being solutions-first will often lead to a project failing and getting ditched.

3. **Adhere to engineering principles.** Principles are overarching guidelines that can motivate us to action. I don't mean "SOLID" or "DRY" when I speak about principles here. I'm talking about a way to approach problems and solutions with engineering rigour - collecting metrics, testing, challenging assumptions and being proactive. Principled thinking.

   For example, if someone asked you to migrate a REST API in a VM to AWS. You might start by asking what the motivations behind this move are. When they say it's because it's slow, you challenge that assumption by first running a load test.
   Then, review the APM metrics to see the average throughput from API consumers.
   If it turns out the API was slow, then great, the assumption has been verified. But without hard metrics to back things up, it was a stab in the dark.
   Engineering rigour helps developers to be more successful at the work they do. This particular lesson has made my work smoother.

4. **Secure, simple, fast, in that order.** When developing a product, we should adhere to this order closely. If you're like me, you likely want to make something as performant as possible - pre-optimising. But this is a waste of time at this stage. This order of making a product first secure, then simple, then fast allows us to prioritise the correct thing and work down the chain. It also means we can make something secure even if it's complicated. But we shouldn't make something fast but complex.

   Why this order, though? Security always takes top priority. In my experience, a security breach is far more damaging to customer trust than a slow application. Simplicity comes second. We develop software with a team of people, so we want to keep things simple (even if it's not as fast compute-wise) so they can understand and build upon our code. Finally is speed. We want to make all our efforts to make our application fast. Slow apps are the bain of our existence. And often, people don't wait around. Google's target for site loading is now 300ms and has seen colossal bounce rate increases when sites exceed that number. Speed drives revenue, so it should always be something important to us.

5. **Take the lead in making notes.** How many meetings have you been to where nothing gets accomplished. And afterwards, you are asked what the meeting was about and need help remembering. For me, it's a lot. I've just shared my screen with an Apple Note and then taken notes to remedy this. You can still make notes even if you're not "leading" the meeting. It's important to document what was discussed, what the actions are, who is responsible for them, and what the deadline is. Sharing your screen with everyone keeps people focused on the problem at hand and not getting sidetracked. It also means that everyone clearly knows why they are a part of that meeting and their responsibilities.
   Doing this has changed my "wasted" meeting percentage (which should be an SI unit at this point) from around 80% to 60%. A massive reduction, even though I have only started doing this recently.

All of the above deserve articles, so I may write about them more one day. But for now, keep learning!
