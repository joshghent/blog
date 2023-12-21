---
layout: layouts/post.njk
title: Rules of Thumb for creating API's
date: 2023-03-14
---

Building good software often starts by having good principles upon which to design it upon.

But, principles are high level and so often don't allow for much practical application. On the other hand, rules, although more specific and practical, are used by many as something to bash others over the head with.

In both cases, these are hardly desirable to build good software.

What we need, is something inbetween. The practicality of a rule, but the heuristics of a principle.

Enter the rule of thumb! We've all used rules of thumb ("righty tighty, lefty loosey" anyone?). But, recently I was asked by someone to create a list of rules for creating API's. Instead, I created some rules of thumb that I have documented here:

1. **Pluralise routes.** For example use `/users` not `/user`.
2. **Make use of HTTP methods.** It sounds basic but many API's break this convention. If you have an update use a `PUT` or `PATCH`. If you're getting data, you use `GET` - get it? Why use this convention? Mostly because it's logical. It stops people guessing your routes. For example if you tell someone you have a route of `POST /users` to create a user, then the person may logically assume that doing `GET /users` will fetch users as well.
3. **Don't include method in the name.** For example, don't create routes such as a `/createUser` or `/changeName`. The action "create", "change", or whatever, should be clear from the HTTP method (POST, PATCH, DELETE etc.).
4. **Return HTTP response codes appropriately.** Only return a 200 when successful. And equally, only return a 4xx/5xx code when there is an error. HTTP response codes are a simple way for API consumers to respond to issues when calling your API.
5. **Return JSON to the client.** Makes handling your data handling far easier on your frontend.
6. **Use query parameters for filtering data.** Don't use POST bodies for filtering data for a fetch request. Instead add filters via query parameters. For example `?age=88&surname=Ghent&company=Turbo Technologies`.
7. **Avoid backwards incompatible changes.** Generally, API's are tightly coupled to the consumers that are built against them. To avoid having to tie releases together and having to issue lots of updates to your frontend, try to avoid backwards compatible changes. For example, instead of removing a field, just add a new one. Or alter the response based on a "Version" header.
8. **Keep versioning basic. It's not a lunar mission.** Favour using V1, V2 and so on rather than anything complex like dates, or semver versions. You likely won't need it.
9. **Keep data, business logic and request life cycle handling separate.** Clear separation of these different areas will make maintenance of your application far easier. Additionally, by segmenting the request life cycle (for example, error handling, authentication etc.) it standardizes responses, making it easier to use for consuming applications.
10. **Put changes into OpenAPI first.** Specifications seem like a huge pain to write. If you're like me, then you likely want to jump straight into the code. But, OpenAPI specifications are a great resource so that your frontend team can develop their code against a contract. Further, if you're API is used by 3rd parties then this OpenAPI spec can serve as documentation for them.
11. **Mock DB responses when testing your API.** When testing, you want to test your code, not the database. Mocking the database response will accomplish this and mean you can run your test suite in your CI suite without having to spin up a local database.
12. **Emit events.** Event-based architectures are not 100% practical. REST API's are far easier for handling basic CRUD operations. But, beyond this, it's prudent to release events (to Eventbridge or another event bus) from your CRUD API, which can then be consumed by other systems asynchronously. For example, let's say you have an endpoint to update a customers details. When the customer updates their email you need to send an email to verify that new email and notify the old email of the change. You could place all this logic in your CRUD API system. But, to improve resiliency and segment logic, it would be wiser to release an event of "CustomerEmailChanged", and then have another consumer send the email, and another notify the old email address of the change.

This list is by no means complete, or exhaustive. But it does serve as a good set of guidelines to build your API around.
