---
title: The Cobra Effect and Software
date: 2023-02-28
---

We like to focus on inputs, not outputs. Inputs are simple. Sugar for baking, metal for factories and petrol for cars. Software is no different.

But by focusing on inputs, we often encourage the dreaded [cobra effect](https://en.wikipedia.org/wiki/Perverse_incentive).



**Basically, we incentivize bad behaviour.**



For example, let's say we have metrics for a team to write 30 tests a sprint and maintain 90% code coverage.

On the surface, it sounds good! 90% coverage will mean our code is tested thoroughly and 30 tests a sprint means we definitely will be making the system more robust.



But, consider the other side of the coin.

* The team is now disincentivized from writing new code to not reduce the code coverage. 
* Tests are written for the sake of it, not because they are required and therefore the CI/CD pipeline takes longer to run.
* Any new feature that is added has to be tested to absolute oblivion, thereby increasing the time to ship new features.



### What's the solution?

**Focus on what you want the desired outcome to be and then design metrics that would change based on that outcome.**

In the above example, rather than enforcing code coverage, we could measure the number of defects raised, the number of releases, and the number of failing test cases.



Metrics are important. But, consider the kinds of behaviour that those metrics will encourage. Otherwise, you'll need to watch out for the cobras.

