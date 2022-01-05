---
title: "Software Beauty"
date: "2022-01-05"
description: "Why you should strive for beauty in software, why it's forgotten and how to make software beautiful."
tags: ["software design", "user experience"]
---

> Design is a funny word. Some people think design means how it looks. But of course, if you dig deeper, it's really how it works.

Those famous words spoken by Steve Jobs, was the cornerstone of Apples great success in building beautiful products. But these words can be applied, not just to hardware, but to software too. Code at the end of the day is simply words - albeit in a wonky form. Asimov can write beautiful works in English. Why can’t we do the same in code? The answer is, we can. But why should we as developers be concerned with the “beauty” of our code? In this post, I’m going to answer this question. But also drill down into specifics on how (often posts like this can be a bit too romantic and theoretical).

## Why Beauty is Important

So, why is software beauty important? After all, we are engineers, not artists! By way of example, let’s say you buy a new car. It’s the fastest one on the market. When you get it, you’re all excited - until you open the drivers door. Before your eyes you see the pedals on the dashboard, the steering wheel on the roof and a literal bucket for a seat. Safe to say, you wouldn’t be impressed.
What’s the connection to software? Although something is usable, it may not be nice for someone to use.

If you work on a system with an API of any kind, whether internal-only or integrated with third-parties, beauty should be a concern. Bad design breeds bugs, extra cognitive load, increased time to develop new features and more.

Gliding past the obvious examples of having a nice REST API like Stripe (which we will cover later). Let’s say you have a large React frontend and express backend. If your code bases are not “beautiful”, on boarding new developers becomes an increasing hassle. You may try to fight this by having lots of documentation. But there comes a point in software, as with jokes, where if you have to explain it, it’s bad.
Further, when someone comes to add something to the code base, because it wasn’t designed in an extensible manner, it becomes brittle and wonky. If you’ve ever played Tetris you’ll know this feeling. You keep having to deal with these fast falling blocks and before you know it, you’ve lost the game.

## Where has beauty gone?

If beauty in software is important, why is it seldom considered? In your organization, there is some care and thought given to the general architecture. But, the specifics of how the software plugs together is handled ad-hoc - without any guide rails to support developers. This leads to individuals writing software for them, not for others. It's natural - we are all a little bit selfish.

A further reason is that rarely are companies "dogfooding" their software. Sometimes, it's not possible because the developer is not the customer. That's fine. But failing to have a deep understanding of the software and how it will be used leads to false assumptions and clumsy design.

## Principles

What's the solution? Design has no hard and fast rules. And generally, people have a good sense of something working "well" or not simply by using the thing. Software design is no different. Therefore, principles make sense in order to guide developers to design great software. I’ve attempted to distill the principles of beautiful software into three key attributes.

1. **It should be a joy to work with**. No headaches or screaming at the computer should be seen. It should be joyous to work with or on your system to be able to accomplish their tasks.
2. **Simple**. “If you can’t explain it simply, you don’t understand it” - Einstein. Beautiful systems need to be simple by definition. That doesn’t mean they cannot be complex. Rather, the complexity should be presented simply. If quantum mechanics can be explained then so can your system.
3. **Extensible**. Doubtless, requirements change and you often need to modify or add functionality to meet a use case. In the case of beautiful software, this should be easy to implement, document and test.

## How to Use These Principles

On a practical level, I've found it best to codify these principles into a short checklist.

**1**. Are all successful use cases of methods of the API documented?
**2**. Are error codes and edge cases documented for each method of the API? - i.e., if you pass X with a value of Y, you also need to provide Z.
**3**. Does the API have side effects?
**4**. Do all the methods do “what they say on the tin”? - in other words, does the API method in question do what is described by the method itself. For example, if we have a REST API method `GET /packages` - does this return a list of packages for a customer? It’s always good at this stage, if you’re experienced with this system to ask someone who has never seen it - even if they are non-technical. Just ask “if you asked me to get packages”, what would you expect me to answer you with?
**5**. Is it possible to run the API with 2 commands or less? - if the answer is no, then we can look into creating a setup script.
**6**. Are testing patterns already established to test the API, including mocking data or dependant systems etc.
**7**. Can I quickly tell what version of the API I’m using
**8**. Can I quickly resolve any errors myself? - does the API return error messages that are actionable and consise. 
**9**. If it is not possible to rectify an issue myself, can I provide a means of recreating an issue to the API author? - requestId’s, trace logs and the like are all helpful here and need to be accessible to the consumer.
**10**. Are there significant efforts to mitigate issues? - Does it handle retries and other complexity that should not be a concern for the end user.

There is a lot of overlap here between sound software development practises and beauty. As the famous design adage goes "form follows function". By creating good development practises, you end up creating beautiful software.

## Takeaways

- Keep an eye on beauty, no one else will. Even in your little corner, strive for beautiful design. If you’re stuck making something beautiful, ask coworkers, friends, customers or join the #softwarebeauty irc channel on freenode.
