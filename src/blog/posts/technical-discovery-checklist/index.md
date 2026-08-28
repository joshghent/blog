---
layout: layouts/post.njk
title: "Technical Project Discovery Checklist"
date: "2026-06-23"
description: "Migrations don't fail on the technology. They fail because nobody mapped how people actually work. Here's the checklist I use before committing to a plan."
tags: ["software", "legacy code", "architecture", "software engineering"]
---

The brief was one sentence: shut down an ancient server. It ran a PIM, the product data was old, the operating system was older, and there was a Cyber Essentials deadline behind it. A few weeks of work, surely.

Then it turned out the PIM was wired into a CRM. The CRM was actually two applications sharing one name. There had been an attempt to move off that CRM nine months earlier, but only the sales team had gone across to Salesforce — and they hated it, because the reporting still ran off the old system, so they were keying every sale in twice. And the reporting stack turned out to be QlikView writing a file to an S3 bucket, which was pulled into Redshift, which fed Tableau. Nobody mentioned any of this. Not because they were hiding it. Because nobody had ever had to say it out loud.

The one-sentence brief became a product.

I've done this kind of work enough times now to say something with reasonable confidence: migrations follow the same shape every time, and the thing that derails them is almost never the technology. It's that nobody mapped how people actually work. You can see every system in the Azure or AWS console. What you can't see there is that two teams are dual-keying data because a report nobody owns depends on a database nobody remembers.

And the cost of getting it wrong isn't a slipped deadline. Turn off the wrong server and you can put a business into a position it can't recover from.

So, in the spirit of [The Checklist Manifesto](https://en.wikipedia.org/wiki/The_Checklist_Manifesto), here's what I work through before I'll commit to a migration plan. There's a copy-pasteable version at the bottom.

My assumption is that you're coming in cold. You don't know any of these systems and you need to understand them well enough to be trusted with a plan.

## 1. Map the systems — starting with the people who are leaving

Start at a high level. A [C4 model](https://c4model.com/) is ideal, but the diagram matters less than the question you're asking of each box: what is this responsible for? Is it sales data, customer records, or both?

The part people get wrong is where they start. Don't start in the cloud console. Start with whoever is about to walk out of the door. On that project it was the previous architect, who was stepping away, and then the infrastructure engineer who'd come across in the acquisition. Their knowledge had a shelf life measured in weeks.

My opening question is deliberately lazy: *"how does this whole thing work?"* Then I shut up. The value isn't in the answer — it's that people will wander into things they'd never have thought to tell you if you'd asked something specific.

Then, and only then, go and look at the console to see what they forgot.

## 2. Map how people actually work

Go a layer deeper and understand who uses each system and what for. Interviews, mostly. If you're lucky the business already has process documentation — in this case they did, which saved weeks — and your job becomes mapping those documented processes onto the architecture you drew in step one.

This is where the dual-keying surfaced. No diagram would have shown it. No amount of reading the code would have shown it. A salesperson said *"and then I put it in the old one as well"* and the shape of the whole project changed.

Legacy software isn't just old code. It's old code plus a decade of human workarounds that have quietly become load-bearing.

## 3. Go into the technical detail

Now you go hands-on. Dig into the environment each system is hosted in and trace its connections. Does it fire events? Does it have webhooks? Does something else connect straight to its database?

That last question deserves a specific mechanic rather than a guess. Connect to the database and query the currently active connections. It takes thirty seconds and it will regularly tell you something nobody in the building knows. That's how the reporting stack turned up: it was reaching directly into the PIM database to pull product data so it could attribute sales.

Pointing an AI coding tool at the codebase is genuinely useful here — it's good at finding every place a system reaches outside its own boundary, and at working out which data models it depends on. But be clear about what it's doing: it's reading the code. It cannot tell you that a salesperson types everything in twice. Steps two and four are still yours.

Also, don't trust names. What everyone referred to as one CRM was two separate applications under a shared brand. One name does not mean one system, and one system does not mean one database.

## 4. Find the people nobody mentioned

I'm including this step because I got it by luck, and I don't want to rely on luck again.

Someone mentioned in passing that the data team might know something, because they received a report from one of these systems. That conversation was where the entire QlikView → S3 → Redshift → Tableau chain came out. Had I not been pointed at that person, I'd have written a migration plan that quietly broke the reporting the business ran on.

So make it deliberate. Go back round everyone you've spoken to and ask one question: *who else gets something out of this system?* Then ask the people they name. Consumers of data are almost never in the architecture diagram, they're usually downstream of a direct database connection, and they are the ones who scream after go-live.

This is also the point to validate the assumptions you've built up. If an operations person creates a record in the CRM, which tables does that touch? If you can get access to the SaaS platforms the system integrates with, use it to check they're doing what you've been told they do.

## 5. Decide what you're *not* migrating

Write down explicitly what's out of scope, and get it agreed.

On that project the CRM was out of scope. The goal was the PIM server, and the CRM was a bigger, messier, more political problem — there was a strong feeling in the business that they simply couldn't move off it, and that feeling wasn't going to be resolved by an architecture diagram.

The thing that got that agreed wasn't a persuasive argument. It was the deadline. The compliance date on the PIM server was real and immovable, and a real deadline is the most effective scoping tool there is. Use the constraint you already have.

You will be tempted to fix everything you've found. Don't. A discovery that ends in an unbounded programme of work ends in no work at all.

## 6. Get the numbers — but know which numbers matter

Pull together what the current system costs. Compute, storage, licences, whatever it touches. That part's easy.

The harder and more honest number is what it costs in people's time. My rough proxy is to look at the support tickets that system has generated and the points assigned to them. It's imperfect, but it's evidence rather than vibes, and it's usually the number that tells the real story. On that project the infrastructure cost was trivial. The maintenance burden and the fact it no longer fitted how the business worked were the actual case.

Be prepared for the comparison to come out against you. I've run this calculation and had it say plainly that migrating wasn't worth it — and the right recommendation was to tackle the low-hanging fruit instead. That's a legitimate outcome of discovery. If your process can only ever conclude "yes, migrate", it isn't discovery, it's a sales document.

Which leads to the thing I'd most want you to take away from this step: cost saving is often not the argument. Risk, compliance, an unsupported operating system, or a business that has outgrown the software are all stronger. Work out what you're actually being measured on before you build a spreadsheet nobody asked for.

However you land, the output is one page for a C-suite reader: context, risks and mitigations, timeline, and the ask. One page. If it needs to be longer, you haven't finished thinking.

## 7. Get it running somewhere you can break it

Finally, get the systems running locally or in a development environment. Legacy software is very often a VM that was spun up years ago and never touched since, and you cannot plan around something you can't safely poke.

This is the same argument I made in [Facing the Legacy Code Monster](/scary-legacy/) — without a sandbox you have no psychological safety, and without that you'll make timid decisions. It's also what makes a [strangler fig](https://martinfowler.com/bliki/StranglerFigApplication.html) migration possible rather than theoretical.

## The checklist

Print it, paste it into a ticket, whatever works.

**Systems**

- [ ] Every system mapped at a high level, with what it's responsible for
- [ ] Talked to anyone leaving, retiring, or newly acquired — before they go
- [ ] Named owner for each system (and honestly recorded where there isn't one)
- [ ] Confirmed each "system" is one system, not two sharing a name

**People**

- [ ] Interviewed actual users of each system, not just their managers
- [ ] Existing business process docs mapped onto the architecture
- [ ] Identified any duplicate data entry or manual workarounds
- [ ] Noted where politics, not technology, is the blocker

**Technical**

- [ ] Traced outbound integrations: events, webhooks, file drops, scheduled jobs
- [ ] Queried active database connections to find undocumented consumers
- [ ] Checked scheduled jobs and cron — the ones nobody has looked at in years
- [ ] Recorded OS versions, support status and compliance deadlines
- [ ] Checked backups exist *and* have been restored at least once

**Downstream**

- [ ] Asked every person you've met: who else gets something out of this?
- [ ] Followed the reporting chain all the way to the final dashboard or spreadsheet
- [ ] Verified each external SaaS is doing what you've been told it does
- [ ] Traced at least one user workflow end to end, from click to table

**Scope and numbers**

- [ ] Explicit written list of what you are *not* migrating
- [ ] Scope agreed, ideally anchored to a real deadline
- [ ] Current running cost: compute, storage, licences
- [ ] Maintenance cost estimated from support tickets or time spent
- [ ] Established what the business is actually optimising for — cost, risk or fit
- [ ] One-page summary: context, risks and mitigations, timeline, the ask

**Before you plan**

- [ ] Every system running locally or in a dev environment
- [ ] Somewhere you can break things without phoning anyone

---

This isn't exhaustive and I'll keep editing it. But nearly everything on it is there because I once didn't do it, and found out later.

The pattern I'd flag above all the others: the technical discovery is the easy half. Systems, connections and databases will all tell you the truth if you ask them properly. People won't, because they don't know what you don't know. That's the half that has to be worked deliberately, and it's the half that decides whether the migration lands.

Somebody will inherit whatever you build next, and they'll do this exercise on your work. That's [fine and normal](/creating-legacy/) — just leave them better notes than you were given.
