---
layout: layouts/post.njk
title: "Lessons learned from using GitHub Actions"
description: "Four years of GitHub Actions with teams and on personal projects. Custom scripts, reusable workflows, pinning to SHAs, and protecting yourself in CI."
tags: ["ci-cd", "github actions", "devops"]
date: 2026-08-05
---

Since going generally available in 2019, GitHub Actions has cemented itself in the development zeitgeist. It's the default now, about as ubiquitous a choice as Postgres or React was a few years back.

I've been using Actions with teams for the past four years and lean on it heavily for personal projects, including a few nifty things built on edge cases in how it behaves.

Like all technology it has sharp edges. Actions gets punishing the moment something goes wrong, because debugging it is a nightmare.

Here's what I'd tell you before you start.

## 1. Use custom scripts

The common complaint about Actions, and about most CI systems, is that workflows are hard to debug. The real problem is the feedback loop. Modify the YAML, push it, wait for the runner, read the log, repeat. Twenty minutes gone to a typo.

Push the actual work into your own scripts. Bash, or whatever suits. The workflow becomes a thin thing that calls them.

You lose some fidelity in the step-by-step view, but a failing script still exits non-zero and still writes to stdout, so you can see what broke. What you gain is being able to run the thing locally and iterate in seconds. As a bonus, when Actions inevitably enshittifys, your CI is mostly portable to whatever comes next.

## 2. Write reusable workflows, but keep them inside the repo

At $dayJob we fell into the trap of "company standard" workflows. The logic is sound. Most projects use the same stack and the same deployment model, so a shared workflow standardises everything and saves duplicated effort.

What we found is that the moment those workflows did anything beyond the basics, they turned into internal software. Updating one meant propagating the change across every repository, handling the repos that had drifted, and fielding the questions when a build broke for reasons nobody could see in their own codebase. That's a maintenance burden landing on a platform team that already has too much to do.

And if you keep the shared workflow simple enough to avoid that, you've built something so thin that copy and paste would have served you better.

## 3. Pin dependencies where possible

Given how popular Actions is, security issues were a matter of time. Plenty of people treat each one as a black mark. I read it the other way. The surface area here is enormous and it's a small miracle there haven't been more. Every issue found is one that gets closed, and it drags the rest of the ecosystem into paying attention.

One big class of attack is overwriting a release. GitHub does now offer [immutable releases](https://github.blog/changelog/2025-10-28-immutable-releases-are-now-generally-available/), which went GA in October 2025 and stop assets and tags being changed after publication. Useful, but it's opt-in, so you can't assume the action you depend on has turned it on. A tag is still a moving pointer.

So pin to a SHA. Even for internal jobs.

What that means in practice. Instead of this:

```yaml
steps:
  - uses: actions/checkout@v4
```

Go to the release page, find the release you want, copy the commit SHA, and use that:

```yaml
steps:
  - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
```

Keep the version in a trailing comment so it's still readable by a human. Now the workflow runs the exact commit you reviewed, and a rewritten tag can't touch you.

## 4. Protect yourself in CI

Pinning is one layer. The other is stopping a dangerous workflow from getting into your default branch in the first place.

A few things worth blocking or checking:

- `pull_request_target`, which runs with a privileged token in the context of a fork's pull request
- npm installs that don't use the CI flags, and don't set `--ignore-scripts`
- Missing `permissions` blocks, and overly permissive grants where they exist

Run those checks as a pre-commit hook on developer machines and again in CI, so the hook being skipped doesn't matter. This gets more critical the moment your project is open source and anyone can open a pull request.

---

All of the above is my own experience talking. YMMV.
