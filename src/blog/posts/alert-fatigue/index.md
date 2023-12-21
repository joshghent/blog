---
layout: layouts/post.njk
title: Alert Fatigue for Developers
date: 2023-07-12
draft: true
---

When your first outage happens, alerting and monitoring becomes top priority. You don't want to be woken up at 3am again.

So you add alerting. Lots and lots of alerting.

But soon enough, the alerts start returning false positives and everyone gets used to the alerts. They become background noise.

Alert fatigue is a real problem. And one I've seen at almost every company I've worked with.

But the process of reducing alert fatigue is laborious. You have to commit hours of time and there isn't always a best way to approach it.

Nonetheless, here are some tips I've found useful:

## 1. One problem causing multiple alerts

If your database irrecoverably crashes, you probably get a myriad of alerts. The database is down, the website is down, the API is down etc.
In isolation we want alerting for all these components. But when the root cause is the same, we want to consolidate the alerting if possible.

The implementation will vary depending on the tool you use. But, let's say the database goes down. You could only have the API alert trigger if the response does not indicate that the database is down. This would mean that the API monitor would only alert if the database was up but the API was actually down.

## 2. Alerts for self-healing problems

## 3. Non-actionable alerts

## 4. Alerts that don't have a clear owner
