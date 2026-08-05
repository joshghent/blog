---
layout: layouts/post.njk
title: "How I build products with AI"
description: "A repeatable setup for building products agentically: one stack, one AGENT.md, and deterministic checks the agent can't argue with."
tags: ["ai", "product", "cloudflare"]
date: 2026-08-05
---

LLMs have totally transformed the way I work and create new products. What used to take me months to get to an MVP now takes days, which means I can run experiments and actually look at the results instead of arguing about them in a doc.

Building a few of these did surface some problems.

1. **Huge inconsistencies with tech.** Sometimes Claude reached for static HTML pages, other times NextJS. Debugging and deployment got harder every time the stack changed underneath me.
2. **Telemetry wasn't consistently enforced.** No consistent analytics meant no numbers, and no numbers meant the experiment told me nothing.
3. **Design.** Obvious AI slop was a constant fixture.

So I built a repeatable system for agentic product creation. Three parts to it.

### Hono and Vite for the stack

The simple API plus frontend model works great and deploys almost anywhere. In my case everything goes to Cloudflare Workers.

That choice does a lot of work. Claude can talk to Cloudflare's MCP server, so it can inspect and manage the infrastructure it just deployed to. The same goes for Google Search Console, GA4 and PostHog, which means the agent can read the numbers from an experiment rather than me exporting a CSV and pasting it into a prompt.

Wrangler gives me a local environment that behaves like production. When the agent runs something locally and it passes, that result means something.

### An AGENT.md file

I saw a tweet recently that went roughly: "I spent the past three hours writing an AGENT.md file, and I'm sad to report it was 100% worth it."

My experience matches exactly. Writing a proper AGENT.md is how you stop the two failure modes that make AI products look like AI products: the design and the voice. Spell out the type scale, the spacing, the palette, the words you never use. Once it's written down, every session starts from the same place instead of from whatever the model's median training data looks like.

### Deterministic checks

Guardrails in prose only go so far. Give an LLM enough rope and it will fall back on its own judgement about whether something works.

Deterministic checks fix that. It's your run of the mill unit, integration and e2e tests, nothing exotic. The point is that the agent gets proof rather than a vibe. A failing test is a fact it has to deal with.

---

Building products is a breeze now, and the whole workflow has accelerated. My key takeaway is that making good products agentically is the same as making good products with a team. Strong local environment, plenty of tests, and enough access and context to do the job.
