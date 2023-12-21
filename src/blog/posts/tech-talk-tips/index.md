---
layout: layouts/post.njk
title: "10 Things I wish I knew before giving my First Tech Talk"
date: "2018-11-13T22:12:03.284Z"
description: ""
---

<div class="image">
	<img src="../../assets/images/me.jpeg"/>
	<em>Giving the talk — credit https://twitter.com/JamieTanna/status/1029428095223320576</em>
</div>

Glossophobia or fear of public speaking is cited as being amongst [mankind’s top 10 fears](https://www.washingtonpost.com/news/wonk/wp/2014/10/30/clowns-are-twice-as-scary-to-democrats-as-they-are-to-republicans/?noredirect=on&utm_term=.a61b1b9d11bc). It related to our inherent fear of failure. Although I have never been afraid of speaking publicly, for even the most experienced speakers, it can be a bit nerve racking at times.

Why did I choose to give a talk then? For one, I wanted the experience, ever since [going to my first meetup](https://blog.joshghent.com/how-to-attend-your-first-programming-meetup-835b74f6556f) I thought “that’s really cool to speak about stuff you’re excited about”. In connection with this, I enjoy teaching people, whether that be 1-on-1 or to a group — it’s one of the reasons I contribute to open source, and write blogs. It’s a creative outlet. Overall, my primary objective was simply to share something I’m passionate about and also _try_ and make them laugh — emphasis on the word “try” there.

My first talk was at the [NottinghamJS meetup](https://nottsjs.org/) and was titled “[Lightning Node Performance](https://github.com/nottsjs/speakers/issues/46)”. I’m hugely grateful to the organizers for giving me a platform. Previously they had people from Amazons Alexa division, Microsoft's Machine Learning team and more — so it seemed as if I had big shoes to fill.

But giving the talk is the ending, let’s start at the beginning with things I wish I had known when preparing my first talk.

## Preparation took longer than expected

First and foremost, the preparation took a long time. A long time. Initially, I had expected creating the slides and writing the talk to take around 2 days. It actually took over a week — plus all the additions I did late at night and changes to the content of the talk on the day it was supposed to take place. If there is any mistake I made, it’s I severely underestimated the time it would take. It gave me a newfound appreciation for any content I consume, whether that be talks, videos or podcasts. It takes a lot of time to prepare these things. Perhaps why criticism can hurt so much.

Part of the reason the preparation took a long time was I wanted to make sure I was 100% concrete on every last word I said — in case someone picked me up on it and tore the entire talk to shreds. For example, part of my talk was speaking about the [NodeJS event loop](https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c). Although I know roughly how the event loop works, there were still some questions I did not know. I thought that perhaps someone may ask me about the Node event loop and therefore, I set on down the rabbit hole to explore. This kind of pattern occurred at least 6–7 times when creating the talk and accounted for a large proportion of the time I spent.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/1*qO8ucAj7rpUXP_tD3W1A9Q.png"/>
	<em>The image I created for Node js clusters</em>
</div>

Moreover, I wanted to keep the slides almost completely visual. I wanted to keep words off the slides because I have observed people read those rather than listening to you. Finding images for NodeJS clustering is harder than it looks though and so again another time-consuming task was pouring over pages of gifs and images to find one that perfectly encapsulated the subject matter. Often times, I created my own in Photoshop, which again took a large portion of time — primarily due to my appalling photo editing skills.

## **Choosing a topic is tricky**

In connection with preparation time, it also took a long time to come up with a topic. Since I was not from a company, I wasn’t presenting any one particular “thing”. Therefore I went with a more general topic “application performance”. This proved difficult because it’s so broad and had so many subtopics I wanted to cover. For example, I wanted to speak about lambda cold starts, network resilience, asynchronous code in node and much more. Each one in of themselves could have been a talk in their own right. Therefore, a balance had to be struck between covering lots of topics briefly and covering a few topics in depth. I hope I eventually got that balance right, but it’s hard to tell. In the future, I would suggest coming up with a concrete outline in parallel to thinking up a topic.

## **Not all points are equal**

This is a lesson I learned after the fact of presenting the talk. Not every point deserves the same amount of time. Spend more time on the difficult to understand topics and breeze through the small minor points. There is often a sunken cost fallacy at play here, whereby you take lots of time to prepare all the slides so they each deserve their own ceremony. We should try to get rid of this thinking and instead prioritize the points covered. Ordering your points carefully can aid with this. No one wants to be bombarded with lots of heavy topics all in one go, so spread them out and interleave them with smaller, lighter points.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/0*8H9OLV-pu8qsvO4e"/>
	<em>Your delivery can get a bit wooden!</em>
</div>

## **Practice, practice… but not too much**

Practising your talk is essential of course but you can practice it too much. At a certain point, your delivery could become too scripted or wooden. Rather than attempting to memorize a script, remember the points you are covering. Then just speak. If you have the subject knowledge then this will produce results. Furthermore, speaking from within rather than from notes will vary your talk in different ways. I found that when practising my talk, I would do it a different way each time, adding anecdotes and talking points and cutting others. This was done at an unconscious level and would not have been achieved if I were reciting verbatim.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2416/0*p-iyI1WhYQGJUMQ2"/>
	<em>There’s an NPM module for that — <a href="https://twitter.com/iamdevloper/status/487606612757315584">https://twitter.com/iamdevloper/status/487606612757315584</a></em>
</div>

## **Don’t fear questions**

Questions are fantastic for people to get further insight on what you spoke about and can often reveal places where the talk should have explained a point further or provided a different angle. I didn’t so much fear these questions, more expected the worst. But the questions were about the talk. I did get a couple about technologies I hadn’t heard of but I can hardly be blamed for that — especially in the JS world. Overall, the questions were about the talk and asking me to expand on certain stories I had told about how [CloudCall](https://www.cloudcall.com/) was doing this performance improvement work.

I learned a lot from the whole experience, briefly here are my takeaways.

### Upload your slides to [GitHub](https://github.com/joshghent/talks) and [Slidedeck](https://www.slidedeck.com/)

One thing people always ask for with talks is where can I get the slides, so make them easily available. Creating a repo called “talks” and upload the file there, and upload them onto Slidedeck for those who may not have powerpoint/keynote.

### Visual slides worked well

A picture says a thousand words. Words on slides should be avoided at all costs unless they are used to re-emphasize a point. You can explain much more with visuals. For example, rather than putting a slide with the conclusion from a study, put a nice chart up there with the numbers behind the study.

### Avoid lots of code on slides

Code on slides are similar to words on slides. They should be used to make a specific point. Try to keep the code as short as possible, using an extract if possible. It’s not essential that the audience has a complete context around a program.

### Slow down delivery

When I gave the talk, I think I rushed a little. It’s a nerves thing I suppose. My advice is to just count in your head 1–5 between points and 1–10 between slides. It will seem like a lifetime from your point of view, but it makes the delivery far more fluid.

### Engage with the audience rather than speak to them

My talk was that. A talk. I hope the visuals were enough to keep people engaged but in the future, I will make an effort to ask the audience questions and engage with them further. For example, I may ask the audience if they have any experiences with dealing with X after explaining how I did it.

Since my first talk, I have given a couple of others and want to do more. It’s a good experience but takes a lot of time. Be kind to those who give talks and give constructive feedback, as they have sacrificed a lot of time to deliver this. And if you are interested in giving a talk — do so! Ask the organizers of the event and I’m sure they will be happy to pen you in. If you are in the Leicester, UK area and would like to give a talk, post an issue on the [LeicesterJS speaker’s repo](https://github.com/leicesterjs/speakers) and I will get it in the diary — we want to encourage first-time speakers. If you have given a talk, share your experience — it’s good to break down some of the fears people may have.
