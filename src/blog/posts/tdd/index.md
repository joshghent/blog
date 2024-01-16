---
layout: layouts/post.njk
title: "What people mean when they say - we do TDD"
date: "2024-01-16"
description: "TDD has lost all meaning. Here is why..."
---

Test-driven development is that - test-driven. Not test passenger.

This means that tests come first.

> What people usually mean when they say “We do TDD” is that they believe that all the code shipped has tests against it.
> Rarely in my experience is this actually true. [^1]

When the common understanding of a methodology is not true to its original meaning, it ceases all meaning. You then have people talking across each other who are speaking slightly different languages.

Worse than this is a business that claims to be both BDD and TDD! This leads to some lead developers and product managers pushing for BDD and therefore implementing systems to support that. Whereas another team may be doing the same but with TDD.

> Like a car, you can only have one driver.

So what’s the solution?
As with a car having a **single driver**, you need a **single methodology** to lead the charge. This doesn’t preclude you from having tests if you’re BDD or vice Versa. But, having clearly communicated expectations about the software development life cycle will be crucial to make sure that teams can work productively.

Having chosen a single driver, support it! For example, in the case of TDD, invest in fast CI runners, put developers through training courses, and communicate the impact across the product team.

---

[^1]: I would also argue that in TDD you do not need tests for every single function you write. This has been written about a lot in other places, so I won't rehash it. Generally however, my rule of thumb is to primarily test integrations and only unit tests where it makes sense.

P.S. I’m not saying that BDD is better than TDD or vice versa. I’m just saying that you can’t be led by both.
