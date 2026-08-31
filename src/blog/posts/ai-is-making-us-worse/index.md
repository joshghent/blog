---
title: AI is Making Us Worse Engineers
date: 2025-02-04
---

Artificial intelligence, that is to say "large language models", has exploded in recent years. It's truly revolutionary technology that will have a lasting impact on society.
Having used Cursor, ChatGPT, Claude and other "AI tools", I've found their productivity boosts noticable. But, having used them day to day for the past year and a half I believe they are making us worse as engineers.

## 1. Lack of critical thought and understanding
Initially, cursor was a fantastic tool - snippets created directly in your editor that you just simply needed to accept! Genius! But, in accepting all these snippets I wasn't actually understanding the code. It led me to having a littany of code that I didn't understand. Sure, I could _read_ the code but I didn't know what all the parts stitched together worked.
By having these suggestions done for me, I wasn't using my critical thinking to understand an efficient way to solve a problem.
Furthermore, the code created was consistently of poor quality. For example it wasn't easily testable, and favoured functions with many different pieces of logic and branches. It was the code I would have written when first learning to code.

## 2. Blind action
There was the age old stereotype of programmers who blindly copy and pasted from StackOverflow, we were all there at one stage or another. With AI tools, this problem is 10x worse. More often than not, the accepted suggestions don't work in anything moderatly complex, or that require and up to date understanding of libraries and frameworks.
Through this blind action, I was spending more time accepting snippets, testing the code and then reprompting the model than if I had just taken the time to read the docs.
I found this especially the case when writing terraform code. I had Cursor (with Sonnet 3.5) create me some fairly basic terraform to switch an api to use the private endpoint for a database. This is fairly straight forward but it was using a provider I wasn't familiar with (DigitalOcean). Happily it spat out some code that largely looked correct. I pushed this and soon encountered an error, I reprompted it with the error code and it gave me another suggestion which I gratefully accepted. Then again, I encountered another error this time worse (it has invented an entirely new attribute for a resource). I asked it to undo the changes and try again. Again, there was an error. In anger I turned to DuckDuckGo, and quickly found in the Digitalocean docs that apps don't support private endpoints for this specific type of database I was using. This took all of 3-5 minutes. Whereas the prompt crafting had taken well over 20 minutes because I was waiting for CI jobs to restart. All of this could have been avoided by just reading the docs.
Perhaps in the future, LLM's will have near real-time access to the internet and can fully ingest and digest the information they have access to. But, at least for now, that's not the case.

## 3. Skill decay
I won't pretend that I have every single standard library reference memorised but I used to be able to get by without constantly searching for something.
Fast forward to today and having had AI autocomplete for over a year has destroyed my memory for every day things. For example, I realised the other day I had forgotten what the second 

The crux of all the above points is that it had removed my enjoyment from programming, getting into flow and cracking a hard problem. It was simply just poking a virtual monkey to get it to do the dance a specific way. That was no fun and it was wasting my time.

## The AI desire
But I understand why AI tools are so highly regarded. I put this down to 2 key reasons for developers in particular.
1. **Code is mostly boilerplate web stuff.** Unfortunately, for better or worse, most of the "professional" programming that is done nowadays is web programming. And once you've done one or two large scale projects, you've largely done them all. There isn't a great deal of complex programming there (aside from memorising tailwind classes). It's mostly stitching together frameworks, adding an API in front of a database and job done. What's more is that most of the debugging you need to do is related to packages needing to upgrade. Who can blame people for turning to AI to get rid of that pointless churn? Not me, it was certainly one of the main reasons I began using AI tools personally.
2. **Google has become much worse.** Prior to the release of chatgpt, Google's search quality had begun to fall off a cliff. Not only did ads dominate the top results but the other first page results were consistently SEO farming sites that wouldn't actually give you a good result. It's a common "hack" to this day to append "reddit" to a search query to get actual people discussing something.

## How AI can be used mindfully
Before we go all amish and abandon using tools, 
- What you might have used Google for
- Understanding legacy code bases

## What I'm doing
* Learning lower level languages.
* Switching to Neovim (with NvChad), and abandoning my Cursor subscription.
* Year of focus.

## The future
Will I ever use AI tools again? Probably! At the outset of this article I said that it's code I would have written when first learning. This can only get better. We will likely see it reach the stage of a "senior" developer within the next few years.
But, I will avoid falling into the trap of blind copy and paste
