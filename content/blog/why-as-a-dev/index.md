---
title: "Starting with Why as a Software Developer"
date: "2019-02-26T22:12:03.284Z"
description: ""
---

Developers are like jackdaws — “oh shiny!”

As you progress as a software developer, you should begin to build an innate sense of when something should be done a certain way, perhaps to future proof it in some way or make it more resilient. It’s an odd feeling, but you just get a sense for something.

I found this happened more frequently as I advanced and learned. But I never stopped to consider *why *I came up with the solutions I did, or a reason *why* I made a certain decision over another.

I’m a big fan of first principles thinking, and that concept really brought it home to me that to truly progress in my career, I need to start with the why. Understanding the reasons for my decisions and solutions and be able to communicate them in a concise manner.

Let’s give an example of this, we had a few resiliency issues with our SMS system. At the outset, coming up with a solution to this problem appeared to be a black and white exercise. But, I decided to dig a little deeper, why did we want to address these resiliency issues? Is it simply so we would have developer “cred” that our systems are robust enough to handle failures? Partially, but not entirely. The reason we wanted to improve the resiliency of our systems is so that the people using our product would gain faster feedback about the state of their message. If a message failed somewhere along the pipe, we need to make sure we shout back down that pipe to the customer so they know we failed. That is a much better user experience than a message escaping to the ether. Furthermore, we wanted to allow users to retry sending messages, so again this is a consideration in our solution.

Perhaps you might be a product-customer-centric-genius though and think this does not apply, but I bet there are solutions you have come up with where time has not been taken to weight up other options and be able to meaningfully justify the reasoning behind it.

A common example arises when choosing technologies. Developers are like jackdaws, they love new shiny things. Sometimes the new shiny things are amazing, for example serverless technologies would be like a gold ring. But other times, you might encounter things that are like figurative bits of foil. Looks great, and has its place but you already have some nice shiny foil, so is this better? Maybe not. This is not to say that technologies have no merit, but they have to be seriously weighed against the current approach and other options out there. Instead of saying “X will revolutionize how we work, it has Y and Z feature”, go out and investigate what advantages it has over other similar tech, what the learning curve is like and so on. Perhaps even create a PoC if you feel confident. All of these things will help you discover the why. Why do you want to use this technology? Why do you need to change technology in the first place? And so on…

As an example of this process in action, I considered porting a serverless based API written in Node to Golang. I wanted to do Golang because it seemed cool, Docker was written using it and because I had read it was incredibly fast — that was it. However, when I investigated, I infact found that Python, Go and Node have similar cold start times and there would be little advantage in porting. In terms of the processing we were doing, again, Node was just as capable as Go for that particular task and we had the advantage of all our libraries written in Node already. I decided against this and instead poured time into optimizing the existing Node API. This was a far better use of time that porting to some new language I barely knew.

When you’re looking at something new, or dreaming something big — start with the why. You will grow far more because of it.
