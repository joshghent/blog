---
layout: layouts/post.njk
title: "Lessons from Open Source"
date: "2018-07-13T22:12:03.284Z"
description: ""
---

Contributing to open source is often touted as a great way to be recognized in the software development community, with many heralding their [Github](https://github.com/) profiles as a resumé of sorts. Additionally, open source software developers find their programming abilities enhanced and motivations for their day-jobs recharged. Beyond these, however, there are further lessons that can be learnt from contributing to open source.

## Code Ownership

When I first took over as maintainer for an open source project, I found myself with a good sense of how the code base _should_ be. It was my baby that I had cared for and was trying to improve. When I began to encourage the community to add to the project I began to see strange new solutions that I would not have chosen. Moreover, I was cautious about appointing anyone else as a maintainer to the organisation I had created.

I was not focused on delivering features and bug fixes but instead on how I perceived the codebase *should *be.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/0*KzBNzDDzzdTtEh32."/>
	<em>“No, it should look like this!”</em>
</div>

It highlights an interesting point, you can’t be precious about the approach. Problems can be solved many different ways. There is more than one way to skin a cat as they say — and it could not be truer when it comes to software development.

Your goal as an open source maintainer should be to enable and encourage people to solve these problems however they like. The specifics of the code should be ignored and instead focus should be given to how well documented it is and how well tested it is.

Of course, sometimes a certain approach is more convoluted than perhaps necessary. In these cases, **discuss** the reasons why the person went for that approach. Perhaps they tried the approach you were thinking of, but it did not work for whatever reason. Don’t go in all guns blazing, as the more the code changes the more it might favour one solution over another.

## Communication

Open source by its nature is open to basically anyone with a Github account. Therefore, people who stumble across your project and want to contribute to it may not be from the same time zone or have English as a second language. This can often lead to miscommunications. Therefore, it is best to make a concerted effort to ensure there is no ambiguity with what you are saying. Furthermore, different nations may have certain customs in their language that whilst might offend you, are thought of as nothing from others. This can be the case in reverse too, so be mindful of any language that could offend others unnecessarily.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/0*2nwpaiTXHO_QQXR1."/>
	<em>Emotion doesn’t always travel well on the internet</em>
</div>

An important thing to bear in mind when communicating with either maintainers or contributors of open source projects is that they are doing this in their free-time unpaid. With that in mind, you need to be wary of pressuring people into timeframe commitments or being overly critical in merge request comments. Make sure you are kind and considerate throughout. This principle applies to your day to day work, sure there might be times where ruffling some feathers in needed, but buy-and-large it pays to be positive and encouraging.

## Writing

Beyond writing code, there is an even more important, yet seldom thought of, form of writing — documentation. Critically in open source, if you want people to use your thing — you gotta tell them how to use that thing!

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/0*0Ijnny5zhcXA1nUM."/>
	<em>Where is the “any” key?</em>
</div>

This presents an interesting challenge, you need to write your documentation in a manner that suits your target audience. If your application is aimed more towards beginner programmers then gear your documentation towards that. Don’t assume someone already has [Node](https://github.com/nodejs/node/wiki/Installation) or [MongoDB](https://docs.mongodb.com/tutorials/install-mongodb-on-windows/) installed, show them how or point them to further guides where they can learn. A good way to hone your documentation writing skills is to discover a new API and write documentation for it. Dig through the source code and find out the usage of that endpoint and what it outputs. Since you’re approaching that project as an outsider your documentation will naturally lend itself to that audience and will provide an outstanding benchmark for how future documentation you will write.

As with all writing, the point is to be clear, concise and easy to understand.

Open source software is a lot more than just adding features and fixing bugs, it’s about the people. These lessons are important to embrace for use in a real-world environment and will prove invaluable. If you’re looking for a place to start contributing [Up-For-Grabs](https://up-for-grabs.net/) is great. Alternatively, find some software you already use and if it is open source, try and tackle an issue on their Github page. Open source has opened many doors for me and furthered my career more than anything else I’ve done — and it can with you too.
