---
title: "Lessons from Battling with Elasticsearch"
date: "2019-07-05T12:31:03.284Z"
description: ""
---

This is a story of changing requirements being impeded by architecture and software. It’s an age-old adage but I thought it was worth telling this story as a lesson in foresight and blame.

The bug goes as follows, CloudCall developed an instant messaging and SMS application that plugged into their existing application, that previously only handled phone calls. When planning this new messaging system, since we had the requirement to do full-text searches on the message contents, we decided to use ElasticSearch as a data store. No-one had used it before, but we knew the problems it solved and were happy to start development with it.

Later down the line, we began to get bug reports of messages that failed to sync into CRM’s (a primary USP of the product), as well as channels that were no longer visible after refreshing our application. It was a whole host of different bugs that ultimately lay at the doorstep of one simple truth — Elasticsearch is not strongly consistent. You can do your damnedest to try though, which is exactly what we did.

The bugs arose because a user would go to create a channel or send a new message, this would then create the record in Elasticsearch. If the user refreshed immediately, when our API went to look up the channels that belonged to that user, it returned an out of date list — since the new channel was not yet indexed on the shard. Additionally, when syncing messages into CRM’s, we first queried for that message across the shards in Elasticsearch (shards of messages are segmented by calendar month). Again, the document was not available in the shard at the time of syncing — as this process is kicked off right after the Elasticsearch insert.

The solution was threefold. First, where possible we queried for the document on the shard we expected it to be on, and then had a fallback mechanism to do a wildcard search.

In the instance of searching for a specific message, we first query the latest calendar months shard since we assume that messages will only be queried for in a calendar month. If that returns no data, we do a wildcard search across all message shards, where the message will always be available — since we do not insert into previous months message shards and therefore the document has been indexed already if it is present.

Secondly, we tuned the refresh interval for indexing documents from 30 seconds to 1 second. This is a lot more intensive on the boxes we host Elasticsearch on but it’s worth it for the benefits it gives us. This is a simple configuration option within Elasticsearch itself. This means that a shards index is recreated every second to immediately make new documents available on it.

Lastly, there is an option you can pass called “[refresh](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-refresh.html)” when doing an insert into Elasticsearch. This tells ES to immediately refresh the index and make the new document available on the shard once it has been created. This again prevents issues around going to get documents that are not yet indexed.

At the outset, I said this was a story about foresight and blame. Picked up the backend services for our messaging application after it has been architected could have led me to curse my predecessors for not thinking about future functionality. And for a time, it did. However, I quickly came to realize that this is a repeated pattern in software development. You can never foresee the future and gaze into a crystal ball made up of 1’s and 0’s.

This thought was inspired by reading [http://boringtechnology.club/](http://boringtechnology.club/) and the story of how Etsy built the activity feed and their battles with Memcache’s ephemeral nature. But you know what, after they fixed it, it worked later down the line even after scaling.

I felt the same way about the work I have done on our Messaging backend. I hope that, as Etsy did, they can leave those API’s and consumers to whir away and hum quietly in the background. It is a testament to how good your code is if 20x scale later it is still humming along nicely and a pseudo-metric I aim for with everything I write.

<div class="image">
	<img src="https://mk0osnewswb2dmu4h0a.kinstacdn.com/images/comics/wtfm.jpg"/>
	<em>Credit: <a href="https://www.osnews.com/story/19266/wtfsm/">https://www.osnews.com/story/19266/wtfsm/</a></em>
</div>

It has taught me a lesson not to march in and say “why didn’t they think of this when designing the system??? Time to tear it out and start again”. Instead, take a look at why the design was chosen in the first place, and to work with the design, rather than against it.

Legacy code often gets equated with bad code. But this is seldom truly the case. Legacy code contains bug fixes, resiliency, hundreds of hours of review and many different sets of eyes tweaking and refining. Every line of code written has a reason for being present — even the bad stuff.

Nonetheless, on the contrary, it has taught me vital lessons into thinking at scale and really diving into a technology before using it. Perhaps simply googling “what is <TECHNOLOGY> bad at” or something similar. This can help you discover the pain points that others have run into. In retrospect, I would have used MySQL as a data store for our messaging service, since we have a vast array of experience in-house with it. We know that MySQL is not good for full-text search but we could use Elasticsearch or something similar to provide just the search functionality rather than the storage of all the data at a later point. Hindsight is 20:20 though, and who’s to say we would not have had issues with MySQL?

There is no real definitive conclusion to this article but here are the main points:

* Don’t blame your predecessors for architecture designs or code that was written at the time, have respect for the code and leave it a little bit better than you found it

* Go with technologies that people in-house understand and have experience with, you will run into issues you cannot anticipate if not

* Hacking around can feel like, well a hack, but there is always a hack in every large bit of software. So don’t be afraid to work with the tools you’ve got to make them work, it’s a lot easier than ripping everything out

* Structure your code in a way that makes it easy to rip out one data source and use another

* Remember that if a technology has an advantage, there is usually a disadvantage. Especially databases, where there are hardware limitations at play. For example, Elasticsearch has great search functionality, but consistency can be a problem.
