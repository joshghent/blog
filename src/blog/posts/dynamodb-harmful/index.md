---
layout: layouts/post.njk
title: "DynamoDB Considered Harmful"
date: "2024-10-21"
description: "Why you shouldn't use DynamoDB pretty much ever."
---

I think DynamoDB is quite a useful database. But, I'm here to tell you should pretty much never use it whether in a greenfield project or a mature product. Let me explain why.

### 1. It's inflexibility will slow you down.
Initially, DynamoDB's speed and schema-less nature can make development fast. Although DynamoDB isn't modelled around schema's (like a traditional SQL database), it is modelled around queries. This means you need to know the query model up front. In a mature product, you might have a good idea of what possible queries you would want but in a greenfield product it's downright impossible. But, regardless of how mature your product is we all suffer from a fog of war. It's impossible to know what feature requests will be fired at us by a product manager. This is where DynamoDB will start to become as cumbersome as jeans in a rainstorm. Because you originally modelled the database around the queries you knew about, it becomes inflexible to change for the new queries you need to perform. Often times, teams just add new global secondary indexes (which behind the scenes is a complete copy of your database). But these are limited to 20 per table. And it creates another problem, deciding what index to use when. This becomes a headache to maintain and build upon.
Some may reason that they can create other tables around the new query model, or change the existing database. But these solutions are also rife with complexity. For example, DynamoDB has a 1MB limit on results from scans. Therefore, to write a migration script you'd need to loop through all this data, update it in memory, remove the old data and then write it back to the database. Try doing that in a no-downtime fashion.
SQL on the other hand can be mashed, broken, cracked and mangled in order to create whatever queries you want. You can join tables where there are separations of relationships. And if you ever get into place where the table design is bad you can do a SQL migration - it might take a while but there are no query limits to contend with.

### 2. You don't have the scale nor will ever need it
DynamoDB was designed with hyperscaler levels of traffic. Sites receiving this level of traffic clock in at less than 50 across the entire internet. Ergo, you do not need DynamoDB's scale. Even Facebook who started on MySQL (but eventually use other supporting databases), didn't need DynamoDB level scale (initially) and when they did they refactored. Choosing a database technology for scaling reasons is akin to getting "CEO" business cards before writing a line of code - it's premature optimisation.

#### "But what about scale?" I hear you cry
This is a non-argument made by people who haven't launched serious products. Any SQL database with enough money thrown at it can scale plenty fine. SQL databases power some of the most used websites in the world - including all Wordpress sites [(43.3% of all websites)](https://colorlib.com/wp/wordpress-statistics/), Spotify [(626M MAU)](https://the-cfo.io/2024/07/29/revenue-radar-spotify-hits-high-note-with-q2-2024-results-but-faces-industry-discord/) and Twitter/X [(516M MAU)](https://www.demandsage.com/twitter-statistics/).
If you reach a scale where SQL becomes the blockage then you likely have the money to solve the problem either by refactoring parts of your app or mitigating the issues (with caches, increased horizontal capacity, sharding etc). In any case, scale is not a reason to discount SQL.

### 3. You need other technologies to handle basic database functions
Let's say you are using DynamoDB for your little CRUD app. Percy the product manager swaggers up to your desk and asks "Can we add search and sorting of tables to our product pretty please?". After a few umms and ahhs, you probably realise that DynamoDB ain't gonna cut it. You're going to use another tool, like Opensearch or Algolia. Before any DynamoDB rage nerds ask, yes you can do search using "contains" and you can do sorting. But try doing something even remotely complex and it becomes impossible to perform. You know what could add search and sorting to your app, SQL! DynamoDB needs all this other cruft to provide basic functions to your app. And it's not just a case of spinning up some new system and hey presto it works. Nope! You've got to keep those systems in sync (DynamoDB streams or Kinesis), then you've got to configure indexes and so on.
Your technology choice is slowing you down from delivery of features to your customers. Guess who also doesn't care about your database - your customers!

### 4. It's challenging to work on your system locally
Working with DynamoDB locally isn't as simple as running a docker container (like ehem, MySQL or Postgres). So, then you're focused to have a "remote" development environment. Where you have resources deployed to the cloud that are used by each developer. These can work, but provide horrendous experiences. Changes to system configuration have to be deployed and you can't work offline. There are a whole host of problems that arise as a result of systems that cannot just be run on a computer.

### In summary
DynamoDB isn't a bad database. It's simply a tool that came from a certain context - in Amazons case high throughput writes and reads. In 99% of cases, you are not going to be in that same context. Focus on getting there first with the power of a SQL database. Most apps are just CRUD, SQL is super good at that - use it, and get back to building the thing.

PS: A good litmus test to see if your tech stack is working is asking "in the last 6 months to what extent has our technology impeded or prevented the development of new features or fixes?". If the answer is > 3 then you probably chose wrong.
