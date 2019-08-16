---
title: "A Guide to Leaving Your Job"
date: "2019-08-16T12:31:03.000Z"
description: ""
---

Recently, I handed my notice in to my previous job at CloudCall after receiving an new offer at Capp&Co. I won't go into _why_ I chose to leave, but handing my notice in did leave me with the challenge of how to uncouple myself as a Developer from the services that I managed. Jamie Tanna has suggested using blogs as a form of documentation, which is exactly what this is, everything you need to do before you leave your job - broken down by time. In my case I had just under 30 days to get everything ready.

## 30 Days to Go

### Take Stock
What products do you own? What does everyone always come to you for? Think about these things and begin to write documentation around all the gotcha's and a FAQ for common issues. Playbooks are often a great resource for the next developer that maintains you systems. I'd suggest writing a playbook on the core functionalities of a system. In my case, I looked after the SMS/IM backend systems, so I documented things such as messages not sending or the messages not being sent to our sync service.

### Holiday
Take a look at how much annual leave/holiday/vacation time you have accrued throughout the year. Confirm whether your employer will pay you for any remaining unused annual leave with your last paycheck. If they will not pay you, then best get booking it! Nonetheless, even if they will, now is a good time to take a break so you can prepare for your next role and get other errands done that you'd been putting off.

### Organise hand over
Speak with your manager about who will take over the services you manage and make sure to schedule a release of those services (if you do not do CI/CD). Additionally, schedule meetings with these new individuals so you can spend time discussing the systems going through the documentation. I would recommend getting the new developer to read through the documentation and trying to solve any problems that come up whilst you're still there. It "tests" the documentation and means you are still there as a backup if that test fails!

### Write no code
Ok maybe, not "No code" but spent the last remaining pieces of time working on anything that will make the systems more resilient as well as tests and "overkill" levels of documentation (better to have more than less - just make sure it's relevant and useful!). If things don't go wrong then it will make the new developers life a lot easier and mean they won't need to suddenly dive in and fix something. 

## 10 Days to Go

### Payslips
Download archive if you do not get them paper based. These are useful for your records and may be needed for tax reasons in the future.

### Final release
If you don't do continuous delivery then deploy all services you manage alongside the person(s) who are taking those systems over. This will enable them to discover any issues and also it gets all the code you've written out in the wild before you go.

### Uncouple Accounts
Over time, as much as you keep it separate, "work" logins and things of that nature seep into your personal devices. Now is the time to sign out of all those services as there will be ones you have forgotten!

In my case I had a list of the following:

- Github
- Gitlab
- Npm
- Jenkins/CI
- AWS
- Removing Email from phone
- Removing iCloud from Macbook
- Deactivate any work-related IFTTT rules

### Logging out
View all passwords stored in Chrome, check if there is anything you need then begin using a "Guest" login to Chrome. Because this won't have any of the passwords, you'll find accounts you need to recover or accounts you need to sign out of on your main chrome login.



## Last Day

### Take home personal belongings
Remember your mug in the cupboard, the cables that are yours etc.

### Security
Remove any SSH/GPG keys from the laptop itself as well as removing them from your Github/GitLab accounts. Additionally, if you use Keybase and your GPG key contains your work email address then remove it and re-push the key to Keybase.

### Log out
Along the lines of the previous point, make sure to nuke your browsers cookies/history so you are not signed into any services such as GitHub or Stackoverflow which may have been personal logins but are inherently corporate in nature.

### Remove apps or Containers
It's worth removing any apps that have your logins such as Spotify as well as any running docker containers that may contain sensitive data. For example, I ran my LastFm2Slack bot on my work macbook which contained an API keys for my LastFM account.


## Take aways
I hope this article can help you in the future if you're moving on from a job. It can be a stressful time and the last thing you want to worry about is becoming a blocker to the rest of your team. Planning ahead, as I have outlined here, allows you to make a clean exit and not have future developers cursing your name for lack of documentation. You want to leave with positive opinions, on both sides of the table - tech is a small world.
