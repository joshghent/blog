---
layout: layouts/post.njk
title: "Improving Koru's API Performance"
date: "2020-09-21"
description: "How we analysed performance pain points and improved them"
tags: ["api", "koru", "performance"]
---

If you don't know already - I love performance. It solves a genuine frustration for users and provides meaty problems to sink your teeth into. Koru's API performance was a little lacking since we had added a lot of features, rewritten large swaths of code and generally not thought about it, since our system is not dependant on returning results quickly. Never the less, we chose to do some performance improvement primarily aimed at reducing database load. This work was in preparation for moving to a multi-tenant architecture. When the move to a central database cluster is complete, reducing database load for each endpoint will be critical to ensure that we continue to have acceptable response times.

This work is still largely on going but here I'll discuss some of the foundation work we have done.

## Gathering Data

Firstly, we started by collecting data on query performance in our system. We don't use an application performance monitoring, but this is simple enough by attaching onto the `receive` [event on the PG Promise constructor](http://vitaly-t.github.io/pg-promise/global.html#event:receive). We then want to report queries that take over 500ms into Slack so that we can then focus our attention on them.

```js
const pg = pgPromise({
  // {... other options }
  receive: async (data, result, e) => {
    winston.debug(
      `${e.query} received ${result.rowCount} row(s) in ${result.duration}ms`
    );

    if (result.duration && result.duration >= 500) {
      await Slack.reportSlowQuery(e.query, result.rowCount, result.duration);
    }
  },
});
```

This sends the query, the amount of rows it returned and the duration of the query to a Slack webhook which then produces a message like this:

<div class="image">
	<img alt="slow query slack message sample" src="../../assets/images/slackmessage.png"/>
</div>

Ok, so now we've got a steady stream of slow queries coming into our system! 🎉

## Optimization

Quickly, we began to see a pattern. Most of the queries that were reported as slow contained two things:

1. A `WHERE` clause on the clients ID - added for prevention of accessing other clients resources
2. An `ORDER BY` of a property within a `JSONB` object

The first was a fairly easy change, simply add an index on the client ID column.

```sql
CREATE UNIQUE INDEX IF NOT EXISTS client_id_key ON clients USING BTREE (client_id);
```

I'm still unsure why we hadn't got an index here before, but I put it down to the fact that there was very little in the way of cross-client security. It was as if the system said "well you're authenticated so have what you want!". Thankfully, we have long since added these protections.

The second was a little more of a challenge. Initially, I began by looking up if it was possible to create an index on a certain property of a JSON structure or if you instead had to create just an index on the entire column.

Soon I discovered it was possible! But there was a lot of conflicting advise as to whether it actually improved query performance or not and if the building of the index netted a performance negative.

Anyway, I decided to create the index like this

```sql
CREATE INDEX candidate_response_score_indx ON responses((data->>'score'));
```

This took down the average query time from around 885ms to 7ms 🚀

## Conclusion

There is still many more queries to improve the performance of but this was a great start. It taught me a lot about the internals of Postgres and experimentation.

## Takeaways

1. Learn but don't be afraid to experiment - there becomes a point with learning that the best way to see if something will be a positive change or not, is to just try it out
2. "Reckons" don't always reflect reality - I believed there was lots of performance improvements to be made in a number of common operations but after trying the queries out and collecting data, they were already very performant. Therefore, be more data driven rather than "reckon" driven, even if those assumptions point you in the general direction.
