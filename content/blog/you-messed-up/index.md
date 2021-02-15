---
title: "So, You've Messed Up"
date: "2021-02-15"
description: "What to do when you've messed up at work... big time."
tags: ["radical transparency", "incident response"]
---

So you've messed up... big time. You've dropped the production database, pushed a broken update to production, throttled the API and literally set the internet on fire. Cold sweat gathers on your brow, you stare longingly at your alcoholic beverage of choice and you perhaps start to update your resume. You are convinced you're going to be fired.

I'm sure if you've been a software developer for more than 6 months, you've been in this situation. It can be an manic situation and you might be unsure about what you are supposed to do.

Here is my guide for when you inevitably make a catastrophic mistake.


## Things to Remember
* *You _probably_ won't get fired* - I say probably as I'm sure there are some instances that a person may get let go, but in 99.99% of situations you won't. Employers know you will make mistakes, they themselves make mistakes. What matters if how you respond to your mistakes.
* *Don't Rush* - The natural instinct when things go wrong is to try to resolve them - quickly. Try to slow yourself down and don't act irrationally.
* *Be Radically Transparent* - Even if you feel you work in a company that thrives on concealing mistakes, it's best to be radically transparent with your mistake. If you literally did `DELETE * FROM *`, then admit that. [Even GitLab admitted they did an `rm -rf` on a production server that caused an outage](https://about.gitlab.com/2017/02/10/postmortem-of-database-outage-of-january-31/). It's best to be upfront about your mistakes and learn from them. You could even write your own personal post mortem.
* *Keep a Cool Head* - It's easy when you've made a mistake to lash out and blame others. Instead, keep a cool head. Remind yourself that A) nothing will be accomplished by getting angry. And, B) the situation has most likely not resulted in direct physical harm to anyone, so it's not that bad in the grand scheme of things.

## What's Next
1. *Access the Impact* - who is affected? Is it actually as bad as you think? Can you resolve the situation quickly? For example, if you have just done a deployment that has gone wrong, then can you roll back? In any case, continue to the next step.
2. *Start a Log* - You'll thank yourself later for this one. Open up a new text file on your computer and record the current time and date. Write down exactly what the impact is, and what has happened. It can seem like a waste of time to do this in the middle of an incident, but is important for reflection later on.
3. *Report the Problem* - Next, you need to report the problem to someone. You should know who this is - likely it's your line manager, the technical project manager or lead developer. Speak to them about the problem, your findings and ask if they have any suggestions. In some cases, you may need to send an email to your support team to inform them that there is an ongoing problem and updates will be given every 30 minutes - this gives them confidence that they can relay to angry customers. Make sure to follow through with this, even if you haven't found the "solution". 
4. *Debug the Problem* - If you have made a direct mistake, then hopefully this step will not take too long. But, work to debug the problem and find the root cause. Use logs, graphs in your APM and anything else you can get your hands on. The focus here is the root cause. Often, it's the second order problems that are the surfaced issues. As an example, you may find a particular API endpoint that stops working and returns a 500 - problem 1. Upon further investigation, it appears that the request is timing out at the gateway - problem 2. After careful examination of the `top` logs, you see that the CPU usage spikes when that endpoint is called and crashes the server - problem 3. But why does it spike the CPU? You spot that Jerry has added a random `for...loop` calculating the digits of Pi to 10,000 places - the root cause.
 5. *Resolve the Problem* - Now you know the cause, you can resolve it. Work with people on your team and be extra communicative during this entire process - you'll build trust and prevent work being done twice.
6. *Review Your Log* - Look into each stage of the process and analyse whether you used your time well here and what mistakes were made along the way. Root out any efficiencies you implement personally as well as changes to make at the organisational and team level.

But what if you're in a position where others come to you with their catastrophic problems? Here are some things to remember.

## What to do when someone comes to you with an incident
1. *Ask them to Keep a log* - This will be a savior when it comes to implementing preventative change and help you learn the mindset of those on your team.
2. *Be empathetic* - It's not the time to point fingers, or say I told you so (to anyone, not just the person who reported the incident). Focus on resolving the issue and learning.
3. *Be a force for change to prevent future issues* - As someone with some authority, you have the power to implement changes to prevent future issues. Otherwise, these things will happen over and over again and customers will get angry. You'd think that things fix themselves on their own and get sorted but you'd be amazed at how many teams spend large swathes of time, simply putting out fires. Implement changes such as mandatory testing, code reviews by experts and restricted access to prevent these incidents in the future.

I'd like to say this won't happen, but it will. Overall, learn from your mistakes and communicate abundantly. You'll learn valuable skills in the process and be an asset whenever more incidents come down the line. 
