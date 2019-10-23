---
title: "Personal DevOps"
date: "2019-10-23T12:26:00.284Z"
description: ""
---

If you work for a software company, more than likely you have someone called "DevOps" engineer who looks after all the infrastructure for the companies applications.
But what about all the infrastructure you have in your life? Who looks after that? Who thinks about how to make it better? The answer is of course, yourself.

Recently, I have been looking at streamlining my processes and making technology work for me, rather than the other way around. Here is all the "infrastructure" that helps me day-to-day. This is an ongoing effort, and I'm always searching for new places to automated and optimize.

## Automations
I run a number of automations, there are too many to go through them all extensively so here is a list with short summaries
* Auto Greet on Slack - on the LeicesterJS slack, whenever someone joins, I send a welcome message to them in a direct message as well as a message in our #welcome channel. The phrase is picked randomly out of 15 or so that are preset in a Google Sheet.
* TravisCI on my Blog - this blog (the one you're reading right now), goes through Travis to check for spelling errors, this allows me to quickly catch them. I want to expand this CI for my blog to include things like security and accessibility checks as well as something that checks all hyperlinks resolve correctly.
* Automated meetup organisation

## Personal Slack
* Family Calendar
* Github
* Travis
* Netlify
* Dockerhub
* Rescuetime Summaries
* Sonarr
* Radarr
* Bazarr
* Tautulli


## Bots
I also run a number of automated "bots" to help manage various services
* sshb0t - runs on all my machines (servers included) so I can always ssh into each one as long as the key is listed on my GitHub account
* lastfm-2-slack - a bot I wrote in PHP that grabs the currently scrobbled track on LastFM and posts it as your Slack status, this runs in docker on my server
* Ombi-telegram-bot - for requesting movies/TV to be downloaded to my Plex host when on the go
* Dependabot + Reference Instance - These run on Github and automatically post new package updates as new PR's. Then Reference instance goes in (hosted on Heroku) and merges the PR's automatically if they pass the unit tests
* ssh-notifier - runs on my server and sends me a message on my personal slack workspace whenever the server is accessed
* Jailb0t - Hooked up to fail2ban as a `banaction` this bot automatically posts new bans to Slack to give me instant insights on my server
* PocketCast stats tracker - Runs as a job on GitLab CI, it scraps the PocketCasts API for the delta time listened to Podcast (since the last run) and adds it as a new row in AirTable
* Mileage tracker - This is a shortcut I run on my phone after I fill up with Petrol, I input the mileage on the trip computer as well as the MPG and the cost to fill the car up. I'd like to implement this further with something like Automatic

## Other Tools
* Rescuetime
* Keybase
