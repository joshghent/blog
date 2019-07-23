---
title: "Architecting the Next Generation of Communication"
date: "2019-01-23T22:12:03.284Z"
description: ""
---

With the shift to mobile and the statistics of the “younger” generation (hi there) not using phone calls as a means of communication, there is a constant push towards reaching people in a platform agnostic way — via email, linkedin, twitter dm, you name it. The challenge arises when you need to create a platform that is scalable demands and flexible enough to hack in any other new communication streams later down the line — maybe we suddenly want support for MySpace messaging.

The architecture I discuss below comes out of experience with this problem first hand, and the solutions we came up with — all to be delivered for a deadline.

## Way of Websockets!

Since this needed to be real time in the case of IM or near-real-time in the case of SMS, websockets are the best way to go and a defacto standard for real-time operations on the web. For this, PubNub is a great choice since it already had a lot of the functionality baked in, such as different channels and mechanism to subscribe, send and receive on those channels.

PubNub also had a mechanism called “PubNub functions” whereby any new websocket message on a channel matching a certain pattern would be handled by a function written in plain ol’ javascript. This meant you can fire SMS messages off to other systems that would handle the actual sending of the SMS message and another route that sends whatsapp messages to Twilio’s API for example. It provided immense flexibility, especially as you expand to different communication methods and channel types.

Although PubNub has it’s own datastore in the background, you can only query it through their API, making it difficult to just dive into the DB and find let’s say all channels containing accountId 123. Additionally, you can only bring back 99 records at a time with PubNub which means producing accurate reporting a challenge. The solution was to introduce a second data source. This potentially opens up the problem of many sources of truth. This can be avoided by having an API stood in front of a non-relational database (I would recommend ElasticSearch) which all read operations would go through.

## Typescript Time

With a project that is going to span many different API’s and services, Typescript would prove invaluable because it allowed us to reuse a lot of code whilst increasing developer productivity and reducing bugs. Sounds too good to be true right? Well, there were still bugs sure and productivity only took an upwards swing after all the developers got comfortable with it, but overall it was a fantastic move. One of the first things you should do is create a common “type” library that you can share across all of your services and systems that needed them. In this types library was all the interfaces and enums that were going to be used throughout the system. You can store everything there from error codes, to channel types and an interface for how a message was structured. You can then include this library in all your services to ensure consistency.

## Different channels

To differentiate the communication types you have, group instant message, direct message, sms message, mass sms message, carrier pigeon etc. you can build this up as part of the channel name. Again, PubNub (who I promise aren’t sponsoring this post) gives great flexibility by allowing channel names to be whatever you want them to be. I would recommend they are built up with the platform, channel type and then a unique identifier .e.g, `production.sms.123456`. In your pubnub function, you can then check the channel type within the channel name, using regular expression, and handle the message accordingly.

Channels should be created per group of participants per channel type. For example creating a new sms to a contact creates a new channel, sending an sms to the same contact again will not create a new channel. But, creating a group with Bob, June and Sally called “Sales Call” and then another with the same people but called “Another sales call”, would create two different channels. This is how many other chat applications are built which in accordance with [Jakob’s Law](https://lawsofux.com/jakobs-law.html), is what you want to do.

![](https://cdn-images-1.medium.com/max/2808/0*uy2HVNILokIO_fsG)

Now that we have a basic instant message and SMS system, we had a new problem to solve — How do we get notifications to the user? Emit a message of a different type on the existing channels sounds like an obvious solution but it assumes the user is subscribed to channel. Fortunately, one way you can solve this is with a “notification” channel. Each account should be assigned a notification channel. Every time a message is sent, it is also sent to the participants notification channel.

For example, if Bob creates a new group chat with June and Sally, it will send a new message on June and Sally’s notification channels informing our application “hey there is a new channel you need to subscribe to!”. This will then trigger a process in the app to subscribe to that channel in the background. When Bob then sends a message on that channel, it sends another message on both the participants (June and Sally) notification channels. When this message is received by the application you can then pop a desktop or mobile notification depending on the platform.

![](https://cdn-images-1.medium.com/max/2000/0*DilygOA_B31jva_5)

Additionally, you can use this notification channel to send other kinds of messages like when a channel has been read, or when the user mutes, leaves or hides a channel. Utilizing the PubNub function again, these notifications can be captured and forward them onto a CRUD API which saves them in DynamoDB. This allows us to provide a consistent experience across any device that the account uses.

Some may be wondering why we don’t just call the API directly, but instead go through PubNub, this is to cater for the case that a user has both our mobile and the desktop application open at the same time. Sending the message via the notification channel means if you hide a channel on the desktop, it will immediately be hidden on the mobile app.

## Authentication

![](https://cdn-images-1.medium.com/max/2000/0*b4LSzT0YAF4jZf6O)

Authentication can be a big hurdle when breaking up a monolithic architecture into microservices, this is the situation my company found itself in. Prior to developing these SMS/IM systems, users were authenticated to our backend using a username, password and license key. All requests to the API used these parameters. This was not an option when authenticating with PubNub as firstly we did not want to give them access to our accounts database, and second because it’s not an option on their system. A token based system was the only way. We considered a number of different options for token based authentication but eventually settled on JWT because of its flexibility, ease of implementation and security. Combined with this, we had found Kong along with the JWT plugin to be fantastic at handling all the traffic we threw at it.

An enormous amount of work went into not only overhauling the API to accept JWT authentication but also to change all our apps to handle JWT’s. Additionally, we required a refresh strategy for these tokens, for example, if a person remains logged in for a number of days it could be the case that your JWT token we have cached is now expired. This means we need to refresh the token. On any request from our application, we check how long the JWT has until it expires. If it is a day or less away then we refresh the token first.

We leverage the JWT to store information we need for requests, for example, when a request comes into an API, then we will most likely need the accountId, we can find this in the JWT without having to pass anything through with the body of a request.

There is more to tell with the architecture of a deceptively simple system, if you have ever had to architect your own communication platform, how did you do it? I’d be interested to find out and build a knowledge base.
