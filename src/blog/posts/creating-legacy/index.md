---
layout: layouts/post.njk
title: "Creating legacy code is ok"
tags: ["legacy code", "refactoring"]
date: "2022-06-08"
description: "As devs, we want to create things that outlive us. Here's why you shouldn't worry."
---

"Legacy code". Words that will strike fear into the hearts of most developers. We hate to work on legacy code, it's complicated, untested and often larger than the observable universe.

Worse still, we shudder at the thought that any of our code would be considered "legacy". And so, as developers, we try hard to create "clean" code, choose the "right" framework, and implement solid principles.

But I'm going to argue that you shouldn't worry about creating legacy code.

Now, this isn't a post to blag on about how you should forget programming principles and write spaghetti code. Rather it's to say that you shouldn't worry about creating legacy systems[^1].

Why? Because most[^2] systems become legacy on a long enough time.

Think about it. How many systems have you built, or contributed to, professionally that is still running more than 5 years later? I'd wager the figure is below 3[^3].

And this is ok.

#### But, why does this happen?

1. **Requirements change.** Probably the biggest reason for system change is because requirements do. If a product is made a certain way and it's cheaper to rebuild it with new requirements, then it will be. Requirements are one of the few things that I have never seen done flexibly. So, there is a tendency to commit the "not invented here" bias.
2. **People change.** As teams change, so does the knowledge that is inside the team. In my experience, knowledge transfers between developers can take place twice before the link to the original ideas is broken. If a system is complex enough, and the team has long gone, then it might be easier to rebuild the application. Often teams justify this with the "better the devil you know" argument.
3. **Technologies change.** New frameworks, libraries and patterns come up all the time. What was once considered cutting edge soon becomes cumbersome. The length of time varies depending on the language. But, in Javascript-land, large changes happen yearly. As teams evolve, so will the preferences and ideas that they bring to it. So, it's natural to assume that the coding style will change as individuals change and the ecosystem matures.

#### Where does this leave us?

- **Don't sweat choosing the "right" thing.** I remember sitting through lots of meetings where we would debate the merits of various frameworks. Although this felt like important work at the time, it was largely pointless. Developers often forget that technology will improve. We tend to focus on the inputs rather than the outputs. Because that's where we live - the code, the framework, the deployment system. Rather than the customer who lives with the outputs - the website, app or game. Ultimately, technology dies and gets replaced over time. And this is a good thing.

- **Write tests, but not too many.** There are two polar situations I have seen with tests. Either they have tonnes that break when you indent a line, or there are absolutely none. Aim for enough to cover your main happy paths, the complicated parts that no one likes to change and customer critical functions. But don't sweat creating a large test suite, it won't reduce the likelihood that the system will be replaced.

- **Write documentation, but not too much.** Documentation is difficult to keep up to date. So, aim to write documentation that answers logical questions and covers the most common use cases in a sensible order. This will assist a new team when they come along. This is a piece of work that may, principally, stand the test of time. Because it could be used by a new team to develop a compatible system in a new framework or language.

Overall, remember that technology moves fast. Be accepting of change. And don't try to make stuff that will outlive you. Solve the problem the customer has, and keep the system tidy whilst doing it. Write tests that save you time and documentation that saves your customers time. Legacy code is not something to be feared. It's to be embraced.

[^1]: By "system" I mean a module or discreet unit of code. For example, an email system, an authentication system, a customer API etc.
[^2]: I say most because there are obviously exceptions to the rule. The Curl code base for example is 24 years old at the time of writing.
[^3]: This is based on my own personal experience. Having had some contact with developers at businesses I previously worked at.
