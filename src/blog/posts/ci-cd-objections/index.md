---
layout: layouts/post.njk
title: Common objections to CI/CD and why they are wrong
description: There is no excuse at this stage.
date: 2022-11-02
---

Continuous integration and delivery is something many of us take for granted. In reality, the vast majority of businesses are still using manual testing and deployments.

If you’re inside one of those businesses then doubtless, CI/CD has been suggested - but never implemented.

The reasons vary but here are a few common objections to CI/CD and why they are wrong. Use it as a template to speak with your team about this.

## We don’t have time

Often organisations are caught chasing their tails. They don’t deploy automatically or write tests, which leads to bugs, which leads to more time spent.
To take a data driven approach, measure how much time you spend doing manual deployments and fixing bugs that could have been caught by tests. Based on this you can say, if we implement a CI/CD system we can eliminate at least 70% of this time (bugs will always happen no matter how many tests).

## People won’t fix the build if it breaks

This statements suffers from a negativity bias - looking to the worst case. And the person who made the statement also doesn’t trust their staff.

A good CI/CD pipeline empowers the developers to resolve problems themselves. And whilst it’s impossible to eliminate 100% of issues, it is possible to add passing test suites as part of the requirements to accept a merge request.

Additionally, appoint a “build master” that rotates week to week who is responsible for fixing the build. Make sure that person has that time factored in for any planning.

## Releasing all the time will break things

This statement suffers from zero risk bias. If you’re wanting to introduce an automated system, my guess is that the manual system has gone wrong - a lot.

Taking a data driven approach, you can trial a CI/CD process, and then measure the amount of errors that occur, and the mean time to fix them.

After the trial period, compare it to the data taken when doing manual releases. If the results are favourable, then you can proceed the discussion further.

## We don’t have tests

This is, in some way, the only valid reason. And while it’s not possible to get a full CI/CD pipeline running, you can start. But how?

Start small. Require tests for new features and bugs. Invest heavily (via contractors or dev time) in building an E2E test suite.

If your business cares about shipping new features quickly and doesn’t want bugs then this investment should be an easy sell.

—

Ultimately, CI/CD is an investment. And many businesses are unwilling and afraid to take the plunge. Recognise that humans have biases that govern their thoughts and actions. You have your own biases too!
But, by taking a data driven approach it becomes a much more collaborative effort rather than one person championing a large change.
