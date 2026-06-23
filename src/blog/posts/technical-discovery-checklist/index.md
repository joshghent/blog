---
layout: layouts/post.njk
title: "Technical Project Discovery Checklist"
date: "2026-06-23"
description: "A personal checklist for conducting technical discovery on legacy systems before planning a migration."
---

Recently I've had to delve into a lot of legacy products to understand how we can migrate them to a newer, more modern stack. This is something I've done a number of times throughout my career under the broad banner of digital transformation. Systems are always getting older and harder to maintain. The technologies underpinning them fall out of favour or simply become unsupportable.

Inspired by "The Checklist Manifesto" — a book I read years ago — I wanted to standardise my approach to this kind of work. A consistent checklist not only gives you a repeatable process but also reduces the chance of missing something important. So here's what I use when conducting technical project discovery.

My assumption here is that you're coming in cold — you aren't familiar with any of the systems in use, but you need to understand them well enough to plan a migration.

## 1. Identify all the systems

Start at a high level and map everything out. Use a [C4 model](https://c4model.com/) if you can. For each system, capture what it does and what it's responsible for — is it handling sales data? Customer records? Both? Don't go deep yet, just get the lay of the land.

## 2. Map user workflows

Go a layer deeper and understand who uses each system and how. Turn those processes into workflow diagrams. This is essential context when you come to re-platform functionality — you need to know what people are actually doing, not just what the system theoretically supports.

## 3. Do the technical deep-dive

Now you go hands-on. Dig into the cloud environment or server where each legacy system is hosted. If you've identified, say, an old CRM with a database behind it, go into the environment and trace all its connections. Does it push events to an event bridge? Does it have webhooks? Does another system connect directly to its database?

This usually means pulling down the codebase and investigating. Claude is genuinely useful here — it's good at identifying where a system reaches beyond its own boundaries and understanding the data models it relies on. Also check the database directly: is it accessed exclusively through this one application, or are other systems connecting to it as well? You'd be surprised how often a legacy database is quietly serving multiple consumers that nobody documented.

## 4. Validate your assumptions

With a reasonable map of the systems and their connections, do a final pass to confirm your assumptions hold up. Try to trace how user workflows map to the technical implementation — if an operations person creates a record in the CRM, which tables does that touch? If you can get access to the SaaS or cloud environments the legacy system integrates with, use that to verify those external services are doing what you've been told (or assumed) they do.

## 5. Gather the numbers

To give your project empirical grounding, pull together some costs. Start with the current running cost of the legacy system — compute, storage, SaaS licences, whatever it touches. When you later propose a migration, you can compare this against the projected cost of the new system. A concrete cost-saving figure is one of the most persuasive things you can put in front of business stakeholders.

## 6. Get everything running locally

Before you can plan or execute a migration, it's wise to get all the systems running in a local or development environment. Legacy software is often just a VM that was spun up years ago and never revisited. Having a local setup means you can test changes safely and potentially pursue a [strangler fig](https://martinfowler.com/bliki/StranglerFigApplication.html) migration pattern.

---

By this point you should have a solid picture of the as-is: costs, user processes, and a C4 diagram (levels 1 through 3 or 4) showing how everything connects.

This checklist isn't exhaustive and I'll probably update it over time, but these are the key things I'd want to nail down before committing to any migration plan.
