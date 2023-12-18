---
layout: layouts/post.njk
title: "Bulletproof Node — Security Best Practises"
date: "2018-01-23T22:12:03.284Z"
description: ""
---

<div class="image">
	<img src="../../assets/images/node.jpeg"/>
	<em>Make your Node app like this guy</em>
</div>

System breaches are now commonplace. [Stories of IoT devices being compromised](https://www.iotforall.com/5-worst-iot-hacking-vulnerabilities/), [entire countries credit history leaking online](http://www.bbc.co.uk/news/business-41575188) as well as thousands of other systems [compromised](https://www.theverge.com/2013/11/7/5078560/over-150-million-breached-records-from-adobe-hack-surface-online), [hacked](https://www.theguardian.com/technology/2016/dec/14/yahoo-hack-security-of-one-billion-accounts-breached), [infiltrated](https://en.wikipedia.org/wiki/2012_LinkedIn_hack) and destroyed.

Now it may seem that from all these stories, that **_any_** attempts to improve system security is fighting a losing battle. And in a way, **you’re right**. But, think about it this way, your house (or apartment) is not impenetrable. However, you still have a lock on your door and make sure to secure the premises before you leave. Security measures such as locks, alarms and perhaps even CCTV cameras are preventative — **not guarantees of complete security. Web application security is the same**, the more barriers we put up, the harder it is for attackers to exploit different [“vectors”](https://www.techopedia.com/definition/15793/attack-vector).

Here is a quick guide on changes you can make to your application right now without large code changes.

### **Use [Synk](https://snyk.io/) to monitor security vulnerabilities**

Nowadays, modern web applications use many dependencies, those dependencies in turn use even **_more_** dependencies. [It’s dependencies all the way down](https://en.wikipedia.org/wiki/Turtles_all_the_way_down). Either way, it’s unfeasible to know every single dependency and keep up to date with security news. [Synk](https://snyk.io/) is a handy tool that allows you to automatically scan security vulnerabilities in your web applications, it supports a wide range of languages from NodeJS, Python, PHP and Ruby as well as many others. Additionally, if you just have a NodeJS application, [Github now comes with automated integrated CVE security alerts too.](https://github.com/blog/2470-introducing-security-alerts-on-github)

### **Add [Helmet](https://helmetjs.github.io/) for all requests run through Express**

A chain is only as strong as its weakest link, therefore make sure **all **API routes are secured. Additionally make sure that all those routes are used! By reducing the surface area, there is less chance of an exploit being found.

[Helmet is a NodeJS tool](https://helmetjs.github.io/), that bolts onto Express and acts a middleware. It takes any outgoing requests and adds various headers that help to keep the request secure.

### **Keep NodeJS and all dependencies up to date**

Although you don’t want and/or need to update the latest major version of NodeJS, it is important to update to any minor version that include security updates. The same applies with project dependencies. The main push back on this has always been that you can’t trust [semver](https://semver.org/). I wholly agree, but with a handy tool called [Next Updates](https://github.com/bahmutov/next-update), you can run your test suite against new dependency versions automatically. Now this is not a guarantee that new versions of dependencies will work as it will vary on how broad and thorough your tests are; But, it does automate a large portion of work. In line with automating processes, you can configure [Greenkeeper](https://greenkeeper.io/) to submit a new pull request for new versions of dependencies that your app uses. By submitting a pull request, this should flag up any problems as it runs your test suite.

### **Monitor for multiple invalid requests, and any other potentially malicious traffic**

Your routes could be as secure as [Fort Knox](https://en.wikipedia.org/wiki/Fort_Knox) but attackers could still potentially bring down your site by DDoSing it or brute forcing login forms. You can configure monitoring of your site to log out to [Papertrail](https://papertrailapp.com/) or [Logstash](https://www.elastic.co/products/logstash) that will then notify you if a certain type of log (I recommend having a “malicious traffic” category) that will then notify you directly (via SMS or Email for example).

Pair this with running your server with [foreverjs](https://github.com/foreverjs/forever) which will automatically restart the server if it crashes or gets timed out.

### **Monitoring**

This is, in my opinion, the most important aspect of them all. By implementing monitoring of your applications usage, you can potentially pick out malicious activity. Here are a few recommendations of what you can monitor:

- Multiple failed login attempts for both the application and the server itself (FTP, SSH etc.)

- Logins from new IP address — many services have automated emails go out to the user if this event occurs. They can then click through and report malicious activity themselves.

- Attempt to access application resources directly (e.g., environment variable files)

- Changes to user details (email, password etc) — this is to cover the case where people may have access to the person’s computer and want to hijack the account.

- Attempt to login with hacked credentials — a new common hack is to take details from other breached services and apply them to other services (because most people use the same password for multiple services). This one sort of ties in with multiple failed login attempts but adds a new angle in what a potential attacker is trying to do.

- Attempt to do SQL injection or other XSS attacks — if you see a particular user attempting to do any of these sorts of attacks, most likely no action will be necessary, as your app should be secure and the likelihood is that they are just messing about. Nonetheless, it may be worth keeping track of these users and the IP address as a sort of “black book”.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2000/1*TOb464uqspF5k7dG81YyNg.gif"/>
	<em>Me talking to my API routes</em>
</div>

You may have noticed the general theme going here — **automation**. I had a plethora of other tips for this article that I cut, as **a)** you can find them in articles elsewhere and **b)** data is the only way you will be able to find weak points. A chain is only as strong as its weakest link. For example, perhaps your application (targeted at a less than tech-savvy audience who don’t use crazy high entropy pass-phrases with a password manager) has a password policy which means many people are writing their passwords on post-its and putting them on their desk. This may lead to someone spotting the password and using it. Without data and monitoring, you would never be able to see that the users account was accessed from a new IP. The point is, there is no “one-size fits all” solution to security. Take a look at how your app is being used and prioritize security methods to help those use cases first.

And that’s a wrap. **Let me know which tip you found most useful or implemented yourself!**

👋 I am available for hire as a freelance web and application developer. Contact me at [hola@joshghent.com](mailto:hola@joshghent.com) if you would like to discuss any projects you have in mind.
