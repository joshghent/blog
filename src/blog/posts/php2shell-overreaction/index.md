---
layout: layouts/post.njk
title: "Last week was terrible. It didn't have to be"
description: "PHP2Shell scored a CVSS 9.2 and sent governments and ops teams into a panic. A week later, nobody has shown it working end to end, and the AI story behind it doesn't hold up."
tags: ["security", "php", "ai", "opinion"]
date: 2026-10-28
---

Last week saw the arrival of two CVEs for PHP, [CVE-2026-109618 and CVE-2026-109619](https://www.wiz.io/blog/php2shell-exploitation-so-far), each rated a staggering CVSS 9.2. For comparison, [Heartbleed](https://heartbleed.com) was rated 5.0 under CVSS v2 and [7.5 under v3.1](https://nvd.nist.gov/vuln/detail/CVE-2014-0160).

Soon after the news landed, the cyber security team and others at work were setting up war room channels to patch immediately. It was a huge amount of work. We had to check each system to find its exact PHP version, then wait for patches to appear. Many vendors released at the time of the announcement. Others (*cough* Amazon *cough*) were slower, and we waited until around 10:30pm for theirs.

Like many people, I read the announcement, saw the score and thought of several expletives. The pre-announcement was as close to "we're all going to die" as I've seen in a while. Major nations took their sites offline altogether. The coordinated response from Wiz, OpenAI and others fanned the flames. Even the [prime minister of Japan sounded the alarm](https://x.com/takaichi_sanae/status/2112890642590564386).

A 9.2 should raise alarm bells. But having dug into the exploit, I can't help thinking it's a bit of a nothing burger.

## What the evidence shows

Yesterday Wiz published a [follow-up on the exploit](https://www.wiz.io/blog/php2shell-exploitation-so-far), dubbed PHP2Shell, and reached this conclusion:

> We have not yet observed successful end-to-end PHP2Shell exploitation in our own telemetry.
>
> Our observations show that triggering memory exhaustion alone is not enough to complete the exploit chain. Differences in PHP builds, memory limits and worker behavior can prevent subsequent stages from working.
>
> [We] have not identified a publicly available proof of concept (PoC) demonstrating complete, general end-to-end exploitation against an arbitrary target.

[VulnCheck](https://www.vulncheck.com/blog/php2shell-vulnerabilities) tells a similar story. Most of the hundreds of GitHub PoC repositories aren't real exploits. The one public PoC that bypassed ASLR only worked on PHP 8.4.26 on x86-64 with default heap settings. The exploitation attempt they saw in the wild failed.

It's wise to patch anything you can if it's deemed risky enough. But this issue is incredibly contrived to exploit, and a CVSS score says nothing about exposure. Heartbleed, though less critical on paper, was trivial to exploit.

I believe many teams saw the score and panicked. National news in several countries picked up the story because so many major systems simply took their sites down. These vulnerabilities, and the many others we'll see in future, need a more critical eye before we ask people to stay late and patch.

## The AI angle

Putting my tinfoil hat on for a second, I can't escape the thought that something else is at play: AI marketing. One of the angles that played well in the news was that AI found the vulnerability.

> Government websites go dark after AI-discovered flaw sparks security scramble
>
> [Reuters](https://www.reuters.com/world/asia-pacific/eu-agency-warns-websites-may-need-be-taken-offline-php-prepares-patches-2026-10-21/)

> PHP2Shell: AI uncovers critical RCE vulnerabilities affecting 70% of the Internet
>
> [Wiz](https://www.wiz.io/blog/php2shell-php-rce)

> 'Black October': cybersecurity experts sound the alarm over new era of AI-enabled hacking
>
> [The Guardian](https://www.theguardian.com/technology/2026/oct/23/cybersecurity-ai-hacking-php-vulnerability)

The truth is that humans discovered this. A memory limit exploit, and even an RCE, was first found in 2004 but went no further. In 2019, a bug with the same flavour of problem, [#78876](https://bugs.php.net/bug.php?id=78876), was reported and fixed in 2020 as a denial of service. In 2024, a related issue was rediscovered but nobody could demonstrate an exploit. Finally, in 2026, a security researcher revisited the 2004 work to look for similar exploits in modern PHP. With AI assistance, they found ways to trigger the memory exhaustion at particular points in PHP's execution, and ultimately demonstrated an RCE.

So it was AI assisted, sure. Found autonomously by AI, no.

Sadly, the frontier labs are keen to sell a solution to a problem they supposedly caused. Leaders at OpenAI, Anthropic and others have said they can't release their latest models because of the risk to cybersecurity. Anthropic [restricted Mythos Preview](https://fortune.com/2026/04/10/anthropic-mythos-ai-driven-cybersecurity-risks-already-here) and OpenAI [staggered the rollout of its latest model](https://threatbeat.com/openai-plans-staggered-rollout-of-new-model-over-cybersecurity-risk/). This may be partly true. I've used AI models myself to find exploits that others hadn't found before. But the rhetoric about AI autonomously finding huge exploits in critical systems, an internet Terminator, is marketing hype. PHP2Shell played into the labs' hands.

## Patch your stuff

Having said all that, patch your stuff! It's important, and it's only a matter of time before exploits show up in the wild. A week on, the only working public exploit VulnCheck found runs on one specific build and setup, and the attack they saw in the wild failed. Nobody has shown a general, end-to-end compromise of a production system. Maybe we'll start to see more proactive patching instead of the reactive vulnerability-patch cycle. Only time will tell.
