---
title: "How to make changes as a Junior Developer"
date: "2022-03-15"
description: "Learn how to stick to development principles when the rest of your team doesn't."
tags: ["junior developer", "career", "learning"]
---

When you start your software development career, you come into a new job with excitement filling your eyes. Think of the cutting edge technologies you will use, collaborating with other amazing engineers and building a fantastic product. Sadly, it doesn't always go like this. It rarely does. And that's ok! Ultimately products have budgets and deadlines.

Perhaps many of the expectations of a job that you had, have been unfulfilled. Testing is a secondary concern. And principles have been abandoned in favour of "throwing something together because it needs to be done by Friday".

At this stage, it is easy to become disenfranchised. After all, you do not have the experience or position as a manager to make widespread changes. But you feel like you're stomping over the software engineer's credo every time you ship a pull request. What can you do in this position?

First of all, especially if you're new and/or it's your first job, don't make testing, security updates, plain text passwords or anything else a hill you're willing to die on. I've been there, done that, and got the t-shirt (many times). And I can tell you it never works. 

The decisions have already been made, often by your manager's manager - who is equally saddened by the product's form. It takes time to build credibility to make a change in a company.

And sometimes, you might be wrong. A decision may have been made that it is the wrong one by the "golden standard", but the correct one for that company. 

Take time to digest a company, ask questions and be receptive to the answer. If you find yourself saying: "so why do you just...", **stop**.

So, what can you do? Make a personal change. After all, you're at the start of your career, there is still plenty to learn.

### 1. Write tests for yourself

Even if you're not "supposed" to write tests due to time constraints, do it anyway, but don't take ages with it. Block out 10% of the total time it took you to create a feature to write a test or two. It doesn't need to be a suite with 100% coverage, just to cover your little corner of work.

Use Puppeteer to create your own End-to-end (E2E) tests in a separate folder to the codebase. And use the defacto testing framework of choice (Pytest for Python, Jest for Javascript etc.) for writing integration tests. Again, put these in a folder that can be `git ignore`'d so it's not in source control for the rest of the team.



### 2. Review your code

Reviewing your code is a vital step to correct your work. Like proof reading an essay.

Before you create a pull request, look through the green part (the code you've added) and ask the following questions

- Can I explain what this code does to another (imaginary) person with little knowledge of this system?

- Can I explain why I've implemented this solution?

- Is it clear to others reading the code base the answer to the above questions? (i.e., is it in code comments)

Following this process encourages you to keep pull requests small and helps you to justify your technical decisions.



### 3. Do a personal post-mortem

After an incident occurs, many companies do a "post-mortem". A review into the problem, its root cause and ways to prevent it in the future.

When you make a mistake like taking down the app, shipping some broken code, or deleting the production database (check, check and check), write your post-mortem. There are many templates online that can help you formalize this document. Review these once a quarter and reinforce the learnings from each incident.



It can be frustrating if you want to make decisions but can't. Everyone goes through this process. Don't dwell on it. Take the time to learn, understand and ask good questions. Be an agent for change in your work and then use your expertise to help others. Doing so will build a solid foundation of knowledge and connections throughout your career.