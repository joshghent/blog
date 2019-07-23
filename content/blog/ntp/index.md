---
title: "Why does NTP Exist?"
date: "2019-03-05T22:12:03.284Z"
description: ""
---

NTP is one of the most essential and complex systems that never gets spoken about. But why? And what even are they? And why do we need them? If you’re like me, you might have known about NTP servers and known they were important to keep clocks in sync. But don’t computers have clocks already? It was when I visited the Greenwich observatory recently that I realized how complex time was and with a fascination in both computer systems and horology, I decided to dive into the backbone of our lives, time.

## What is NTP?

At a high level, NTP or the Network Time Protocol is a network-based protocol and standard by which distributed computer systems can synchronize their time with UTC. The protocol also defines a means by which these systems can passively listen to updates for upcoming leap second adjustments (more on that later).

## How do they work?

NTP defines different “stratum” or tiers from GPS or atomic clocks (Stratum 0) down to computers synchronized to a microsecond (stratum 1) and so on until you reach Stratum 16 which NTP defines as unsynchronized.

The stratum number is used to measure the distance between a given device and the “ultimate” time source Stratum 0. This number means NTP can prevent cyclical dependencies too.

![](https://cdn-images-1.medium.com/max/2000/1*UMh6Wu8Mg-55mHR3NaOzCg.png)

As you go down the chain, each “tier” is configured to synchronize with the tier above it. A given device in a tier may sanity check other computers that are in the same stratum (asides from stratum 0). Furthermore, a single computer may query multiple computers from the tier above to gain even more accuracy.

You may think your service needs to be ultra-accurate, therefore you should synchronize based on Stratum-0. Alas, unless you are working in Goldman Sachs, this precision is probably unnecessary. Stratum 1 is used for all primary time servers e.g., time.google.com.

Now how do we actually calculate the time? The client will go and query multiple computers for the time. The client then calculates the offset between its time and the time it received from the computers taking into account the round-trip delay. And hey presto you’ve got time! A computer usually does this sync around once every 10 minutes by dispatching a UDP packet to the desired synchronization servers.

## Why do they exist?

This was the big question I was attempting to answer with this research. Why do we need them? Can’t computers keep their own time?

Keeping time is notoriously difficult on something that is not always going to be running like a computer. Furthermore, computers get hot, experience high loads and other factors which could affect it keeping the correct time even when it is on. Additionally, time is relative, literally. If it weren’t for NTP then satellites would not work, since they orbit the globe and therefore experience time at a much quicker rate than us Earth dwellers. There needs to be something else.

On top of all this, the Earth’s orbit is a bit awkward. An Earth “year” is not exactly 365 days. It’s 365 days 5 hours 48 minutes and 45 seconds. Since we can’t just round off that 5 hours, we have to put it somewhere. The Gregorian calendar does this by introducing a 24 hours day every 4 years at the end of February. Ok simple enough.

But now you learn that not only does it not take exactly 365 days to complete an orbit of the sun, but the Earth’s spin slows and speeds whenever it damn well feels like it. There are a lot of factors that can contribute to the Earth speeding up or slowing down but the main one is tidal friction. But other events such as changes in the convection currents within the mantel and earthquakes have slowed the earth down.

Either way, if we just left clocks to it, they would be off by a large margin even after a single year. NTP helps solve this problem by being able to broadcast changes in time and have that synchronize. Google and Amazons NTP servers both use strategies of leap smears, where a second is broken into small chunks and distributed between noon and the following noon UTC. If this strategy is not taken then a double second or skipped second is introduced depending on whether the time is being increased or decreased.

But why is it essential to keeping computer clocks up to date? To name a few:

* **Stock market** — trades need to be nanosecond accurate to guarantee that a certain seller got a certain price from a specific buyer. Exploiting time is how high-frequency trading became so profitable (if you haven’t read about it I highly recommend Michael Lewis’ book Flash Boys).

* **Filesystems** — accuracy about when a file was written or read aids in knowing which version is most up to date and allows the filesystem to set recovery points in the cache. This means when you hit CTRL+Z to undo, it always goes back to the last thing! It also enables things like table and row locking in databases by knowing if a request has completed or not.

* **Logs** — you need them in order, and computers run very fast. Accuracy in time for these logs is important to trace through the exact order of operations

* **Update times** — how many sites have you seen where they have something along the lines of “Last Updated 2 hours ago”. Well if it weren’t for NTP, you wouldn’t have that because if you were in the US and the update came from Japan it would say “Last Updated 5 hours from now”.

There are of course many other use cases for NTP and time synchronization as it underpins the clock of every computer out there. Java brags about being run on over 3 million computers. Well NTP, and all it’s implementations run on every single computer produced since 1985. So take that Oracle.

In any case, NTP sparked my curiosity in low-level systems and protocols and helped me appreciate the foundations of what we today build upon. Understanding them may not improve your code on a meaningful level, but it is vital to have a knowledge of the systems your code run to help you debug and improve performance.
