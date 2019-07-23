---
title: "The Art of Good Code Review"
date: "2018-05-30T22:12:03.284Z"
description: ""
---

Code review is a critical part of any software development process. In theory, it is designed to broaden system knowledge amongst the team and ensure that the code is maintainable and easy to read. Perfecting code reviews can be somewhat of an art, it requires a balance of being picky and not sweating the small stuff.

Before we dive into the principles around good code review, we should first define what it **isn’t. **Many believe that one goal of a code review is to address any styling issues. With the rise of [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/), arguments about code formatting have become moot. Automating formatting with the use of tools removes the personal opinion and sway from any one person. Additionally, this also has the benefit of formatting the code more consistently across all areas of the code base.

Other believe that code reviews should be to catch bugs. Whilst this can be true if you spot something glaringly obvious, it is often challenging to understand the code in a wider context. Bug catching should generally be left to a set of watertight unit and integration tests as well as your top-notch QA department.

Now we know what code review **isn’t**, what makes a good code review?

## Know when to say “it’s good enough”

Although the aim of all software companies should be to deliver A-class code, there is such thing as too nitpicky. There is no need to find fault with every little niggle of code. This will only end up demoralizing the developer. It’s a fine balance between picking at the fine details and not going overboard. Only you can be the judge of that and time with hone your perception of done. I often find that overly-nitpicking comments can come down to personal preference of the reviewer. These types of comments should be avoided whilst instead focusing your attention to *actual* issues in the code.

## Stay Positive

Code review can often seem like the reviewer has marched in and torn to shreds the priceless artwork that you’ve digitally sculpted. Instead of focusing only on the issues, often time it’s good to step back and reflect on the positive attributes of a merge request. Maybe someone has used a kick-ass language feature you had no idea about. Or perhaps they’ve just written an informative function header. Commend them for this type of work. It lifts the spirits of the developer and will mean they are more receptive to the issues you do find.

## Look out the output not approach

A key part of code review is analyzing the output, not the approach they have taken. There are many different ways of solving a problem, and it’s important to avoid enforcing one solution over another.

In some cases, a developer might not be aware of another approach. For example, let’s say they have written a method that loops through an array to find a matching element in that array. They might not be aware that [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) (in Javascript) could solve their problem! In such cases, it’s best to go and talk to the developer in person. It might be the case they cannot use Array.includes. You are most likely tackling this code base as an outsider so it is best to assume that the author is the expert.

## Be constructive

When you find an issue in a merge request, which comment do you think would be better?
> No. Don’t do this.

***OR***
> Can we change this to not include X as this may cause Z and perhaps do Y instead? What do you think?

In the first approach, the comment is not constructive, not only does it not tell the author the reason for the issue, it also doesn’t suggest an alternative. On the other hand, the second approach suggested using Y instead of X because Z might happen. You might have more experience on a code base to know certain ins-and-outs that the author might not be aware of, your comment will mean the developer will benefit from your wisdom. Additionally, the second approach asked what the author thought. Rather than ruling with an iron fist, it opened up a discussion.

Code review is a fantastic way for all developers of any experience to get their heads stuck into different parts of your companies code base. Furthermore, it’s a great way for developers to gain experience on new approaches to solving problems. If you don’t already, try and include code review into your process and involve the whole team.
