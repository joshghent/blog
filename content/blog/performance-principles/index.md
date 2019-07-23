---
title: "Principles of Performance"
date: "2018-05-16T22:12:03.284Z"
description: ""
---
<div class="image">
	<img src="../../assets/images/cheetah.jpeg"/>
	<em>Photo by Cara Fuller on Unsplash</em>
</div>

On the web, speed is everything. But you knew that right? Rather than throwing percentages and statistics at you about site retention rates, let’s take a look at some key principles to bear in mind when looking to improve your app or website’s performance.

These are principles to be used no matter what technology you use and are more broad in their scope. The aim is to make this into a small handbook, not a manual. Just as once you learn to drive a car you, in theory, can drive any other, this article aims to teach the principles and not the implementation.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/0*-PJFFL6w3b2sbjF5."/>
	<em>This is your website</em>
</div>

## More Network Round-Trips = Slower Load Times

Without a doubt, one of the main contributors to slow page load times is network round trips. By having more assets to download (javascript libraries, CSS modules, images), the more network connections the end-user will have to establish. Regardless of network speed, this will have negative repercussions on page load times — the effect will be more noticeable at slower network speeds.

The first way you can solve this is by compiling your assets. You can try something like Webpack to compile various stylesheets and scripts into bundles — meaning you have a single CSS and JS file that you use across the board. Further, if you have a lot of icons or sprites on your page, it may also be worth putting these onto a single image and then be referenced like sprite sheet — this is a trick used commonly by game developers but can be utilized on the web too.

Another approach is to reduce the assets you are using — question whether you really need that library. There are lots of sites that have sprung up like [youdontneedjquery](http://youmightnotneedjquery.com/) illustrating why you might not need to include that specific library. Additionally, if you do decide you need that library or framework, then often you can import only what you need. In the case of [Lodash](https://lodash.com/), you can specify a singular function to save to your dependencies (improving ‘npm install’ time for new contributors) as well as importing only that function thereby not bloating your application with unused code. I find myself keenly aware of this with Bootstrap. Often bootstrap is hastily imported and used for nothing more than it’s easy-to-use grid layout. Truth be told, bootstrap includes a **lot** of CSS modules for jumbotrons, icons, wells, breadcrumbs and anything else you could think of for building a site. But in 99% of cases, you just don’t need all of its features. With [Bootstrap 4 you can use webpack](https://getbootstrap.com/docs/4.0/getting-started/webpack/) to import specific plugins. With Bootstrap 3.3 you can get even more granular and create your own [customized version of bootstrap](https://getbootstrap.com/docs/3.3/customize/), including only what you need.

Note this tip applies only to HTTP 1.1. With the rise of HTTP2 around the corner, it is actually **faster** to have lots of assets rather than 1 single bundle. However, HTTP2 has yet to see widespread adoption for performance reasons.

## Larger Assets = Slow

A [fantastic talk by Addy Osmani at CSSConf](https://www.youtube.com/watch?v=FEs2jgZBaQA) demonstrated the detrimental effect of having large image assets on your page (especially in the visible viewport). To have a fast running app or website, you have to shed the things that slow you down.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/0*weuFQ40LFR1eJQyR."/>
	<em>I couldn’t find a photo of Usain Bolt with a bag of sand but here’s the next best thing!</em>
</div>

Usain Bolt can run the 100m in 9.58 seconds. That’s very fast. But if he was carrying a bag of sand, he would be a lot slower. It sounds silly but the bag of sand illustrates all those cumbersome libraries and images you are using to try and make the website look sleeker but end up slowing it down. Sure, your image pops in and does a little twirl, but people will have left the site long before that animation library even loads in.

If you decide, no I need that 10Mb 4k image to load on first paint, then look to deliver it via a CDN (such as [cloudflare](https://www.cloudflare.com/) or [cloudinary](https://cloudinary.com/)) and then cache it aggressively at the server and client level. This will benefit recurring users and can reduce page load times by a factor of 10 on the second load. Customers will thank you for respecting their data plans. Excess mobile data charges can quickly rake up and if your app is a major culprit for this, then you may find users dropping off the service.

## Feels fast = Is Fast

When loading something, if it “feels” fast then it will be fast. But what does it mean to “feel” fast? Well, when loading a website, for example, prioritise the part that the user can see first — this is called the initially visible viewport. It will vary on a per-device basis but using tools such as [Penthouse](https://github.com/pocketjoso/penthouse) and [CriticalCSS](https://github.com/addyosmani/critical) you can bundle and inline the styling that renders the top of your website.

It also means being interactive in the shortest time possible. You want a person to scroll down your website and not hit a load of, what I will call, the “Tasmanian scrollbar devil”. I’m sure you’ve had it yourself, scrolling down a website then an image above the visible viewport loads and pushed the content you were trying to look at down. Incredible annoying UX and takes up valuable CPU time.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/0*sOAULjFJsJE0_kYf."/>
	<em>You don’t want this guy on your site</em>
</div>

To combat this, place invisible div’s with the width and height of images before they load, this will prevent this scrollbar devil from ever arising. You can also perform the same trick with large areas of text or the like, for example, you may have seen Facebook and Jira using Background masks. [Here is a great article](https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html) on specifically how they work.

But what about the rest of the page’s content below the initially visible viewport? That can be lazy loaded. Simple. Utilize async scripts and other methods to ensure your assets are delivered swiftly. Try to defer any background tasks or other assets for later on down the line. For example, if you have a to-do app, I would render main menu bar critically inline as well as placeholder masks for tasks. I’d then prioritize loading the JS that will then request the to-dos from the database. Anything else, such as account settings, the users’ profile image etc. can be saved for later. The goal of the app is to display to-dos. Make that the fastest thing, and forget everything else.

## Hosting

Consider your hosting provider as a possible bottleneck for performance. Although we have spoken a lot in this article about initial loading times, it’s worth considering the performance of certain interactions.

Using the to-do app example above, the most important interaction is marking to-do items as completed. It might be the case that you are triggering a serverless function hosted on AWS lambda when the user marks the item complete. If you find this action slow, investigate the bottlenecks. Is it the database connection time? Is it the memory assigned to the lambda function enough? With serverless, perhaps the function is going cold and so has a slow startup time — so it’s better to host it on a long-running server instance. The point is, there are many considerations and possible bottlenecks in even the most simple action.

If you are using a relational database (such as MySQL or PostgreSQL) it’s worth taking a look at your table architecture. Bad database design can necessitate more JOIN’s than would otherwise be needed. Further, joining on un-indexed columns with large datasets will be detrimental to query performance so it’s advisable to take look at what queries you are performing and optimize them. You may even want to consider using Redis or Memcached to cache common query responses.

## Set budgets and targets

Chances are, if you are the developer then you will be fairly intolerant to anything slow. In addition, you will have a good idea of how fast things *should *perform as well as the device that people use most often.

Now you have a clear picture of your most common use case, the next step is to create a performance budget. In other words, how fast should it load? Having a clear target will give you something to aim for and to keep a close eye with each new code change that is made. Be vigilant with sticking to that sub 1 second load time, and don’t accept any new code that pushes it over that limit.

Hopefully, you can utilize these principles in the future an apply them to your own website or application. They should be transferable no matter what technology you are using. Let me know any performance principles you have at [hola@joshghent.com](mailto:hola@joshghent.com) or comment below! I’m also on twitter [@joshghent](https://twitter.com/joshghent?lang=en) where I tweet about web performance and more.
