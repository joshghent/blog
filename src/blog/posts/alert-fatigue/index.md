---
layout: layouts/post.njk
title: Tips for Battling Alert Fatigue
description: Sift the signal from the noise with these tips on how to prevent alert fatigue in your SaaS platform.
date: 2024-03-09
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

If your primary server goes down, but the second takes over. Do you need alerting about this? Maybe, but likely not.

In reality, if you have a "cattle not pets" approach to infrastructure, that primary server should be terminated and another started up. In such a case, the problem has "self-healed" - it has resolved itself without any human intervention.

This is a case where alerting is not needed as there is no direct action you or your team need to take.

## 3. Non-actionable alerts

Similar to the above, if an alert doesn't require an action, then it should be ditched or filtered out into a separate "notifications" bucket.

As an exercise, do the following:

1. Go through your alerting channel (Slack, Email, etc.)
2. Analyse the language of the alert to see if it has a clear action (e.g., "Reboot the server", "Increase auto-scaling capacity", "Contact 3rd-party vendor as the API is broken").
3. If it doesn't have a clear action then either: **A)** Delete it - the preferred choice or **B)** Reword it - include the action as part of the alert message

By spending just 15 minutes on this, I bet you'll handle some of your noisiest alerts and restore sanity to your team.

## 4. Alerts that don't have a clear owner

Another symptom of impending alert fatigue is alerts that don't have a clear owner. Now you have actions in your alerts, you need to consider who will complete those actions.
Some alerting tools now have this built in, that can automatically `@` the code owners/maintainers who will then swarm on the problem. Even so, if there is multiple individuals, it's likely worth making sure expectations are clear. It shouldn't always be person A that picks up the alerts. It should be shared around the team. But equally, if a person is in back to back meetings, they can't be expected to pick up any issues. Keeping clear expectations within your team will make sure one person doesn't end up being the "go to" when a siren sounds.

## Conclusion

Hopefully these tips are actionable and help you reduce the noise of alerts on your platform. Alerts are a useful tool, but there are seldom thought of as being a key part of the developer experience. But, to run systems reliably at scale great observability is crucial - with alerts being a cornerstone of that.
