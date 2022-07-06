---
title: The Culture of Estimations
date: 2022-07-04
tags: ["productivity"]
description: "Estimations are something we do daily. But they are estimations, not deadlines as many believe. Where did we go wrong?"
---

In business, moving fast is everything.

Sales depend on them, marketing wants to advertise for them and the CEO want's to award themselves a large paycheck without any quarrels.

But, it's the software engineers who have to design, build and test the features. And because software is an inherently creative pursuit, figuring out when something will be done is hard.

Thus, we are led to the creation of software estimations. You may know them as story points, or ticket points as well.

On the surface, the goal of trying to "estimate" when work will be done is a good one. Software is not something done in isolation, and we have to recognise that other teams depend on the work we are doing.

But the reality is that estimations are just that - estimations. But they are treated as absolute values. Blame is assigned when your 3-point ticket took longer than a few days. Your job and any promotions are weighed in the balance of a single figure, that was perhaps not even decided by you.

But where did we go wrong here? Why are estimations and the culture around them harmful?

### Managers ask for estimations but want deadlines

One of the biggest issues with estimates is that they are used as a proxy word for a deadline. In reality, deadlines are important. It allows other teams to prepare their department. For example, a deadline for a feature allows marketing to prepare a campaign, sales teams to be trained on the new feature and support teams to learn the ins and outs.

But estimates are not deadlines. So why not remove the middleman?

In some cases (not all), it would be best to communicate with your manager and ask them what deadline there is. And then, practically, discuss the work item to meet that deadline somehow.

### Developers rarely have all the information required

At their core, estimates are only as good as the information provided to them. And, unfortunately, there is no extra "confidence" number to put against an estimate. You have the estimate, and that's final.

In my experience, tickets rarely have all the information you could need to make an informed estimate. You don't need everything and the kitchen sink. But, I have often seen cases where critical business logic was not listed in the requirements. Other times, designs are not listed because the work item is "basic". Only for the feature to be redone when it turns out the stakeholders had very precise ideas of what the feature would look like.

I'm sure you have stumbled across cases like this before, maybe even being on the receiving end of them. One solution I have found practical is a checklist along with a ticket. It goes something like this:

- Do we have designs for this item?

- Do we have all the critical business logic listed in the acceptance criteria?

- Do we have a clear idea of what systems we need to change to deliver this work?

- Are there any potential blockers we can foresee in doing this work item?

In practice, you can never have 100% of the information. It's a ticket, not a crystal ball. But, having a high confidence level when making your estimates will improve a developer's happiness and decrease the chance that the feature needs to be changed after being built.

### Estimates are formed based on a small set of factors

The premise of estimates is that the ticket being evaluated is a neat loop of functionality that can be rounded off and shipped by anyone in the team. Although in a software utopia that might be the case, the reality is much different.

Tickets often overlap each other. Or only contain one part of the work involved in a larger feature. A common pattern is to divide backend and frontend tasks. In large companies, one team may need to create a ticket for another team to add a new value to an API. In all these cases, there is a question mark as to where the "effort" is assigned. To this ticket or that ticket.

Furthermore, in my experience, estimates are based on previous work experience at a company in that project. The more experience a developer has, the less effort score they will give. I know I have been guilty of this. So, the estimate has an inherent bias towards people who have knowledge of the system. That then ties the ticket to an individual - which creates a bus factor.

Additionally, there is the psychological factor. Estimates assume we are worker robots churning out code ad infinitum.

But that's not the case. Here's an example.

Your team has just finished a huge rewrite of a spaghetti ball of ASP.NET into a nice modern framework. Your team is pretty happy with their work. But, after that large set of work where progress seemed a foreign concept, they are given an enormous feature to do. Although their estimates may reflect their expertise on the project. The actual time it will take to complete the feature will be longer. Why? Because they are mentally exhausted from the first feature they built.

Another example, you have a family member who has a serious illness. Again, your estimates may reflect the theoretical time it would take you. But the reality is different. You struggle to complete the task because of the mental tax on you from other sources.

Although it's not possible to control these inherently human issues. We need to keep them in mind when making estimates, drawing up quarterly timelines and promising features to customers.

### Estimate numbers are meaningless

What does 3 points even mean exactly? Is 3 a day, a week? In all teams I've worked with, when you go in it seems like an advanced race who have understood time in a new dimension. A lingo evolves that categorises a 3 as a day, a 5 as 3 days and a 13 as two weeks.

But there is no consistency. The numbers are simply a proxy for the days.

The original purpose was to be an estimate of both risk and time.

And this, in theory, is good, but in practice is hard to pin down a single number that represents two values and communicate that across a set of people. Especially given the fact that the number is arbitrary. When a doctor provides an estimate of the risk to a patient's life during an operation, it's given as a percentage. And this gives us some grounding. Because we know that it represents the number of people per 100 that will die during that operation, in theory.

But estimate points lack that grounding into something real and practical.

When I've joined new teams in the past, they've circulated an image listing the number of points and how that correlates to days. What results is that you are working like Alan Turing to decode the estimates during sprint planning meetings.

My preference is to just drop the proxy. In the vast majority of cases, you can simply use days. Or, if possible drop estimates altogether and prioritize rigorously. Often work takes as long as it takes. Enough trust should be built in your team to do the work diligently but not take too much time.

### Conclusion

- If you use estimates, be mindful of what that number represents.

- Consider switching to another estimation system.

- Don't invent lingo that new team members need to learn to take part in the planning meetings.

- Estimates are not one size fits all. Sometimes you may need a deadline. Other times you don't need an estimate at all.

Like many things, estimations started out with good intentions. But, along the road, they took a bad turn. Question the pre-existing routines and you quickly realise they've been passed on as gospel. But, working as a team, you can build a system that works for all and continues to deliver a quality product.