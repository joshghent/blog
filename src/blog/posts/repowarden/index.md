---
layout: layouts/post.njk
title: "Launch: Repowarden - AI-powered repository maintenance"
date: "2026-02-15"
description: "Repowarden automates dependency updates, test generation, and custom code tasks as clean pull requests."
---

Today I am launching [Repowarden](https://repowarden.dev), an AI-powered repository maintenance tool.

The pitch is simple:

- Automated dependency updates
- Test generation for changed code
- Custom code tasks based on your rules
- Everything delivered as clean, reviewable pull requests

## Why I built it

Most of the burden of maintaining my projects falls into a few catagories:

- Death by dependabot PR's that stack up
- Test coverage falls behind changes so there are gaps I'm not quite aware of
- Repetitive cleanup tasks never make it into sprints
- General bug fixes, QoL improvements etc.

I wanted something that is like a "dev in a box". Sure I could boot up claude code in each of these projects, but that's a huge chore. This is completely automated, like another member of staff.

## What Repowarden does

Repowarden connects to your repository, understands the codebase, and opens PRs that do specific maintenance work.

It can:
- keep dependencies current without noisy upgrade spam
- generate or improve tests where changes happen
- run repo-specific tasks like refactors, lint migrations, docs updates, and other custom workflows

The key constraint is quality: changes should be readable, scoped, and easy to merge.

## How it fits into a team workflow

I built Repowarden to work with existing engineering rituals. It's not designed for feature development. It just keeps things ticking along so you don't need to worry about how to upgrade Eslint configs, or patch an obscure security problem.

Repowarden just handles the repetitive work and leaves the final call to humans.

## What is next

Next up is improving task customization, broadening language support (currently Node, Python and Rust), and giving teams better control over how aggressive maintenance should be.

If your repo has a backlog of "we should tidy this up later," Repowarden is built for that.

Check it out at [repowarden.dev](https://repowarden.dev).
