---
title: Devblog - LoginLlama 001
date: 2023-02-05
---



I'm starting work on a new SaaS!

I want to document my process because I used to love devlogs on tumblr and tigsource.



I am creating an API-as-a-Service that monitors suspicious login attempts.

At the moment there is a couple of solutions in this space. But they fall down in a few areas

* Bad pricing
* Bad marketing
* Rigid integration path. In the case of the main competitor, they make it so they have to send the emails out, rather than send them out yourself. It also doesn't have the concept of teams so not setup for enterprise.



My MVP:





001

* started with the subscription starter pack from vercel

* Had to upgrade from 12->13

* Main fix was done by the codemod dependency. Mainly had to update Link components to not include a elements

* Then had to manually migrate the database

* And get the types form the repo

* But then all setup!

* Added the first edge function.

* Decided I’m going to for an mvp of

* - Basic admin interface to control the sensitivity

  - Api to check if the login is suspicious and return the reason why

  - Good looking doc pages

  - NodeJS SDK

  - Allow customers to get the data in a computer readable way so they can send their own emails.

  - Homepage listing features

  - Pay as you go pricing model

  - - $1 per seat
    - $0.00015 per request

  - Teams but off only one person

* Added basic /api/v1/login/check endpoint
* Added basic accounts screen with API Key![Screenshot 2023-02-06 at 02.27.33](/Users/joshghent/Library/Mobile Documents/com~apple~CloudDocs/Pictures/Screenshots/Screenshot 2023-02-06 at 02.27.33.png) 