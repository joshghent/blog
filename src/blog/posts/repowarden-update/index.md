---
layout: layouts/post.njk
title: "What's new with Repowarden"
date: "2026-05-05"
description: "Three months in. The product has grown teeth: security patching, license flagging, weekly digests, audit-friendly evidence trails, and a CVE catalogue."
---

I [launched Repowarden](/blog/repowarden) about three months ago. It started as "a dev in a box that does the boring jobs." It's grown teeth since then. Here's what's actually shipped and why some of it matters more than I thought it would.

## The thing that changed everything: positioning

Originally I pitched it as "automated dependency updates and test generation." That's true, but it's also boring. Dependabot does dependency updates and is free.

What customers actually want is _the maintenance work that ends up on their compliance dashboard_. SOC 2, Cyber Essentials Plus, ISO 27001. They have a 30-day patching SLA and they keep missing it. Wiz tells them what's broken. Tenable tells them what's broken. Nothing fixes it.

So the new pitch:

> The AI dev that handles maintenance, security, and compliance.

Same product, sharper edge. Most of the features below were obvious once I admitted that's what I was building.

## Security patching that actually patches transitives

`npm audit` will tell you that some package three layers deep has a CVE. Dependabot will look at it, shrug, and not open a PR because the package isn't in your `package.json`. So the CVE sits there, opened by your scanner, untouched by your bot, until audit day.

Repowarden now writes `pnpm.overrides` (or `resolutions` for yarn, `overrides` for npm, etc.) pinned to the advisory's first patched version. The PR description lists every override with the CVE ID, severity, and the version range, so your auditor can copy-paste the trail.

This was actually a bug I caught dogfooding on Repowarden's own repo. 113 vulns sitting open. Turns out the deps update path couldn't fix transitives. It can now.

## License flagging

If your repo declares MIT and you've quietly pulled in a GPLv3 dep through some transitive chain, that's a legal exposure most teams don't realise they have. Repowarden now flags dep-license conflicts against your declared project license. Opens an issue, lists the offending dep tree, suggests alternatives if there are any.

Not glamorous. Quietly important.

## Weekly digests to wherever your team lives

Slack, Teams, or email. Daily or weekly. Pulls together: open security PRs, blocked deps, EoL warnings, scan failures, and what got merged. So you don't need to remember to log into the dashboard. The digest comes to you.

There's a setup guide on the site if you want it.

## A CVE catalogue

Every advisory Repowarden has touched lives at `/cve/<id>`. So if you're Googling `CVE-2024-21538` at 11pm, you land on a page that explains what it is in plain English, shows the fix, and tells you whether your repo is affected. Kicks off in beta this week with three entries (cross-spawn ReDoS, axios SSRF, Ollama Probllama RCE). New ones get added automatically.

## Audit-friendly evidence trails

Every PR Repowarden opens now includes the advisory text, severity, CVSS, version range, the diff, the test pass log, and the rationale. Your compliance team can take that PR description and drop it straight into their evidence pack.

I stopped writing PR titles like "Bump axios" and started writing them like the auditor's already reading them.

## Other smaller wins

- Plain-English failure explanations on the dashboard, with a "report to support" button
- Per-workspace dep detection in monorepos (was a real pain)
- Runtime EoL tracking three months out, so you don't get caught flat-footed by a Node 18 EoL
- A self-diagnosis loop that catches recurring failure patterns and opens its own GitHub issues
- `lint --fix` baked into the deps update verification step
- Public `/report/:owner/:repo` page with a README badge for repo health
- Supply-chain checks: typosquats, sudden maintainer changes, suspicious install scripts

## What I learned

A few things.

**Bootstrappers should pick a fight with their incumbent.** Dependabot is free and built into GitHub. I'm not going to win on "we have feature X and they don't." I had to pick a different axis. Compliance is the axis. The first three blog posts that actually moved traffic were written about that axis.

**Dogfooding is a marketing channel.** When I admitted on social that my own repo had 113 open vulns and Repowarden hadn't caught them, more people clicked through than for any feature post I'd written. Honesty about your own product's gaps reads better than polish.

**The unsexy features sell.** License flagging and audit evidence trails sound boring. They're closing more conversations than the AI patching itself.

## What's next

A few things in flight:

- A `/cve` catalogue that auto-publishes new entries as they get patched, so the SEO side compounds
- Better team controls for "how aggressive should maintenance be on this repo"
- Broader language support beyond Node, Python, Rust
- A self-hosted option for orgs that can't run external agents against their code

If your team is sitting on a backlog of "we should patch that one day" and you'd like a robot to handle it, [give it a go](https://repowarden.dev/audit). No signup required for the audit. £0 for the first repo, £29/repo on the team plan.

If you've used it and have feedback, send it. I read everything.
