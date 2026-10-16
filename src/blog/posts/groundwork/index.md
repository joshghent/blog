---
layout: layouts/post.njk
title: "/groundwork v1.0 - a new skill to help your projects"
description: "Most repos only run on the machines of the few developers who set them up. /groundwork is an agent skill that finds the missing env files, databases and docs, then fixes them."
tags: ["ai", "open-source", "developer-experience", "product"]
date: 2026-10-16
---

A recurring problem in many organisations I've worked in is that a project is set up by a few developers, and from then on they are "the project's devs". Later, one leaves, another goes on holiday and the last is off ill for the day. This is the [bus factor](https://en.wikipedia.org/wiki/Bus_factor) in action.

Then a ticket comes in. Another developer on the team clones the repo and discovers:

1. **They don't have the `.env` file.**
2. **They don't have a database.**

They have the code, but none of the very specific, undocumented things needed to actually run the project locally. Configuration that lives on one person's laptop isn't configuration, it's folklore (the [Twelve-Factor App](https://12factor.net/config) has been telling us to keep it explicit for years).

## Introducing /groundwork

So I created `/groundwork`, a skill that finds those gaps and fixes them.

Principally, it reviews your repo (or several repos) for anything that stops someone running it locally. It doesn't just read the README, it walks the path of a new joiner for real, in a fresh copy of the repo without your `.env`, and scores ten steps from clone through to reset. Each failure is recorded with the exact error.

Then, provided you have the project working yourself, it fixes what it found:

- **Environment files.** It compares what the code reads against what `.env.example` declares, and fills in the gaps.
- **Databases.** It adds local services to Compose and a guarded `reset → migrate → seed` command that refuses to run against anything that isn't local.
- **Seed data.** Small, deterministic and synthetic, covering the real states of your app. To be clear, it never copies production or customer data.
- **Docs and agents.** It fixes broken scripts and runtime mismatches, and checks that an [`AGENTS.md`](https://agents.md) exists, stays small and is linked from `CLAUDE.md`.

Safe changes go straight in. Structural ones, like new Compose services, it asks about first. At the end it tears everything down, re-runs the ten steps from clean and opens one PR with a before and after scorecard.

## Try it without risk

You can dry run it first, which audits and scores without touching anything:

```bash
/groundwork audit only
```

That output pairs nicely with another skill that turns the findings into Jira tickets, if you'd rather plan the work than have it done in one PR.

## Install it

The skill lives in my [skills repo](https://github.com/joshghent/skills). Install it with the [skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add joshghent/skills --skill groundwork
```

Or, if you use Claude Code's [plugin marketplace](https://docs.claude.com/en/docs/claude-code/skills), add the repo and install the plugin, which bundles all my skills:

```bash
/plugin marketplace add joshghent/skills
/plugin install joshghent-skills@joshghent-skills
```

Then run it from the root of any repo:

```bash
/groundwork
/groundwork apps/api
```

Let me know how it goes, especially if it finds something embarrassing in your project. It found plenty in mine.
