---
layout: layouts/post.njk
title: An engineers guide to the Solutions Architecture role
date: 2024-08-21
description: How you can bridge the gap between business and technology
---

For the past couple of years, I've worked as a solutions architect. Originally I stumbled into the role after being offered a contract, but found I'd been doing something akin to it for years. Coming from an engineering background (rather than business), I found I had to make lots of changes with how I approached work. This article is centred around those who are coming from an engineering background but have minimal exposure to business.

## Defining the role
A solution architect can be difficult to define as they often have a broad remit. It can often include (ordered by technical involvement from low to high)
- Enterprise Architect - working at an organization level to align IT strategy with business goals.
- Solutions Architect - Focuses on specific project designing end-to-end solutions based on business requirements and technical implementation.
- Technical Architect - Focuses on low level code based design decisions influencing the implementation heavily.

But, presuming we fit nicely in the second category, you will be responsible for:
1. Creating end-to-end designs for systems based on technical and business requirements.
2. Innovating and introducing new technologies to the platform.
3. Working with delivery teams to make sure they understand the designs created.
4. Working with business users (and business analysts) to translate requirements and pain points into technical improvements.
5. Creating PoCs for new systems.
6. Selecting vendors to solve business problems.

This isn't an exhaustive list but gives you a flavour.

## Understanding the business needs
This is the key role that transforms you from a developer into an architect. I'll admit, it's something I'm still working on. Unlike technical skills you can "train" by smashing leetcode, these softer skills cannot be approached in the same way. But there are some good patterns to follow:
1. Spend lots of time gathering requirements. I've always ended up making mistakes when I've rushed this part. This "discovery" should end up making up at least 60% of the overall project work - depending on the complexity. Principally you're trying to uncover the known unknowns, and the unknown unknowns. It's challenging to know when you're "done" here but a litmus test I do is  "could I explain how this project works down to the minute details to someone outside of this team?". This stage involves carefully diagramming the current architecture. It also involves creating sequence, bpmn, or state machine diagrams (amongst others) that map out business processes, and other artifacts of the system. Use different diagramming systems based on the problem you're trying to solve. Consider, "what am I trying to communicate?". Before moving onto the solution phase make sure to have all the business and technical requirements in one place. Then you will be able to validate all your possible solutions meet those requirements.
2. Consider the solutions. Notice the plural, solutions. Although you may have a good idea of what the "best" idea is, it's vital to consider more than one solution. Why? Because you risk narrowing your focus and going for a solution that appeals to you rather than the business. Openly share the possible solutions with other architects, developers and engineering leaders. These ones will be able to share insights to improve your designs. They may also shed light on other systems that have an impact on your system - I find this especially true when being new to an organization.
3. Handover - Once a solution has been selected, it's time to make sure it's documented so that the delivery teams can implement it. This phase involves things such as story mapping (what tickets do you need to build the thing), RFCs (for cross cutting technological decisions), ADRs (for project specific concerns), and workshops with developers. I've often found it useful to record a talk track which commentates the architecture diagrams and talks through how it all works.

## Tools of the trade
In most organizations, the technology choices should be fairly well trodden - AWS, serverless, NoSQL databases, you get the idea. So what are the "tools" of an architect. Some have already been mentioned but here is a complete list of tools that I use regularly as part of my work.

- Diagramming. There are a myriad of diagramming techniques. Try to learn as many as you can. If in doubt, ask others in your team. And when you feel confident enough, run a knowledge share session where you teach others about this technique. In general, for architectures use the C4 model. It's by far the most effective way of communicating technical designs. Ultimately, all diagramming is about effectively communicating to others about how a system or process works.
- Frameworks - Think TOGAF, AWS Well Architected and Zachman. These are frameworks that can be used to inform how you create system designs. In particular, the Well Architected framework provides a huge amount of value through its best practices. Make sure you can competently complete the well architected review and understand the terms within it.
- Documentation - In addition to diagrams, written documentation is a vital resource that you can provide to stakeholders and delivery teams. Becoming well adept at written communication is a great skill to have that will stand you in good stead. Documents you can produce (but not limited to), are RFCs, ADRs, Vendor comparison matrices and runbooks.
- Technical thinking - Coming from an engineering background you should have a good sense of if something you're designing will be secure, performant and cost effective (in that order). Make sure to validate these understandings against the real world by perhaps doing a proof of concept for your selected design. On this point, consider making yourself knowledgeable in things like the OWASP Top 10.
- Misc - I couldn't think of an umbrella term for this one. But, I've often found myself reaching for calculator.aws in order to provide a cost analysis/comparison for the systems I design. There are many other tools that can enrich the designs you do.

## Measuring success
Engineers can easily measure success by looking at what is delivered. Solutions architects are an "enabler" - they don't "deliver" anything customer facing in the true sense of the word. But, as we have discussed, the success measure is that the project was discovered correctly (i.e., there were no further iterations required after new requirements came to light), good documentation was produced, and the designs were handed off smoothly to the team. Further, you can make sure that your systems were aligned with business goals and the costs matched what was expected. It's a challenge to be disconnected from delivery but still measure success - but it's still possible. And crucially this makes sure that you are delivering value.

## Closing thoughts
I've enjoyed working as a solutions architect. Business was a weak area of mine and so it has been useful to understand and expand my knowledge. Further, the opportunity to teach and communicate (through diagrams, code and words) is what I love to do. I hope this small collection of thoughts helps you to become an architect!
