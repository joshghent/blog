---
layout: layouts/post.njk
title: "Claude migrated me off Authy"
description: "Authy removed its export feature, so Claude Code built a MITM proxy, pulled the encrypted database off my phone and moved 30 codes into 1Password."
tags: ["ai", "security", "1password"]
date: 2026-08-05
---

When MFA first arrived, Authy became my tool of choice for codes. Over time the quality of the app fell off a cliff, particularly after Twilio bought it. Managing it became a burden and the UI carried a strong sense that nobody involved cared.

It also bugged me that my 2FA codes lived somewhere I couldn't get at from the desktop.

I had over 50 codes in there. Moving them by hand was never going to happen, so I kicked the can down the road for years.

Then it occurred to me. Could I get Claude Code to do the migration for me? 1Password has a CLI, and Authy should let me export the underlying secret that generates the codes.

Turns out Authy removed the export feature at some point. How convenient. Talk about locking users in.

So I posed the problem to Claude and asked whether, with my iPhone connected to my Mac, it could go and find the file on the phone. It had a better idea.

- Set up a MITM proxy for iOS
- Run the server on my Mac

All Authy traffic now went through something I controlled.

It then worked out the interesting part. When you log in to Authy for the first time, the app pulls your encrypted database down from the server. The proxy sat there, caught that payload, and kept it.

Claude wrote a script to decrypt the database. I ran it, gave it my Authy password, and hey presto. Codes.

The next stage was the dull one. Sifting the garbage from the things I still use, then pairing each remaining account with the right record in 1Password. Claude built me a little HTML page for the triage. Every code got three options: pair it to an existing 1Password record (it had already scraped the list into a dropdown), bin it, or create a new record. I clicked through the lot, then it went and actioned every decision.

Two hours, start to finish, and over 30 codes were sitting in 1Password. Doing that by hand would have eaten a weekend, assuming I ever got round to it.

What struck me is that this wasn't really a coding problem. The interesting move was proxying the phone to catch the database in flight, and that came from Claude rather than me. I went in expecting a script and got a plan.

I didn't screenshot any of it, which I'm still annoyed about.
