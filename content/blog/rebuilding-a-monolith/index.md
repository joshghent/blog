---
title: "Rebuilding a Monolith"
date: "2020-08-20"
description: "Why we chose to combine over 3 microservices into one central API"
---

It's no secret that microservices are the hotness right now (I won't say new at this point because they're fairly well established). But you only have to Google the phrase "Why not to use Microservices" to see a treasure trove of articles about why to be sceptical of this pattern. As with all things, in some instances it's the "correct" approach and in other's, it's not. I'm not entering into a holy war of which is better, nor am I a Basecamp hipster who despises frameworks. This is a story about why and how we collapsed a few "microservices" into our central API.

## The Setup
Koru is a pre-interview assessment filter. That sounds wordy but basically it's designed for large corporations who get thousands of applications to jobs, and this tool aids companies in seeing what different strengths a candidate has based on an assessment. The product is fairly simple infrastructure wise. An event-driven microservices architecture with a central API, a React frontend for customers and a admin interface for employees. In addition to that we have systems to generate PDF's and send emails that are part of the candidate lifecycle through our system.

What we wanted to combine was the following:
* Our admin interface and it's API
* Our internal tooling API
* Our internal API documentation
...into our main API that serves customers and their candidates.

It's worth noting that these were all separate repositories.

## Why?
The reasons for doing this were simple
* Our admin portal was incredibly buggy and since we had moved over to a new assessment provider, our API no longer provided us with all the functionality that we needed. Additionally, it had no tests suite, or documentation. The biggest reason however, was that Koru runs (currently) as a single tenant model. In other words, each client gets their own API and DB instance. The problem with this is that the admin API needs to then connect to each customers database. And because we're not insane that means we have to create a VPC peer with each individual customer database from the admin API. Not only is this complex to maintain and debug but also a pain to update. Furthermore, it was hosted on it's own EC2 instance which meant that it was costing us a reasonable amount of money. This would be fine if it was high usage but it was barely ever used.
* Our internal tooling API had the same issue as the admin API, we wanted to keep things simple from a "what has access to the DB" point of view so we chose to collapse this one as well.
* The API documentation was something that we wanted to be constantly updated along with new changes to the API. To make developers go to a whole new repo, make a whole new PR and such meant that it seldom got updated. We chose to combine it so it can be referenced as part of a Pull request change to any code.

## How we did it
As all things should be, we tackled these one at a time and released each one of them so we didn't have any confused boundaries about where large swaths of code got introduced.

1. The documentation
The documentation site was written using Slate, which is a Ruby based project. To add this to our *NodeJS/Express* API, sounds painful but all we did was put it in new folder 'devdocs' and treat it as it's own separate project. Next we added a GitHub Action (Our CI/CD tool of choice) to build and deploy the 'devdocs' to the S3 bucket where they are served from.

All I can say is...
`youtube: https://www.youtube.com/watch?v=3YmMNpbFjp0`


Right, next...
2. Internal Tooling API
Since this was a new service written only a few months prior, it was already similar to our main API in terms of the patterns used. Additionally, it was written in Typescript so the code could quite literally be copied across. We took the time to fix up some tools that were broken and created new ones. Additionally, we added a few simple sanity tests for each one so that we could verify they worked.

3. Admin Portal
This is where things became a bit tricky. As stated previously, one of the main reasons we wanted to merge these API's was because the current API didn't really serve the needs of the system, we were sort of bending it to our needs and in a number of cases, it snapped under the pressure. We embarked first on a mission of discovery, what were all the things that it did, why did it do them, and how did we want to improve them.

The API was written in Python using Flask as this is what the previous team had mostly used. But since there was little expertise within the team for Python, we decided to rewrite it in Typescript. One of the main improvements we wanted to make was to merge the creation of different records in various tables into one easy to use endpoint. Previously, each individual section when creating anything (like a study, survey etc.) had to be saved individually. This lead to confusion from users and confusion when debugging issues where some data was relied on by another part of the system. By combining them, we made the save process one simple API call, and more importantly, one set of errors to deal with.
Along with this merge, we added new tests, both unit and integration so that we could verify the integrity of this process. We also made plans to improve the service further by adding tools for Koru employees to be able to "Copy" existing studies to make them easier to setup.

The difficult part with this merge was authentication. In our main API we had no mechanism to authenticate requests only from Koru Employees. Thankfully this was a breeze, because we use Auth0 to handle authentication. We simply wrote a new middleware handler that reads from Auth0 based on the JWT `req.user.sub` field and checks certain properties of that user in Auth0's system.

The interface was built in React but although not inherently bad, it was clearly coded in a bit of a rush. Things over time had been hacked in as new features came along so we took the time to clean this up (as the boy scouts that we are) before merging it into our central tooling interface. Again we added tests to make sure that the interface loaded the data correctly and behaved the way we expected.

## Conclusion
Overall, I'm really happy with "the big merge", because it's meant that we've created a useful resource for Koru employees and they can self-serve for whatever customers ask of them. Additionally, it will be easier to add documentation for the API and consolidate that back to a single work ticket. On top of this, the main Koru API is now a complete CRUD API rather than having bits of "R" and "U" with "C" and "D" being all the way over in a different service! Hooray!
