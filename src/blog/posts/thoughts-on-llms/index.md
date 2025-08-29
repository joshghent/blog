---
layout: layouts/post.njk
title: "Thoughts on LLMs and AI"
date: "2025-08-29"
description: "The death of thinking, games of telephone and magical parrots."
---
> Thou shalt not make a machine in the likeness of a human mind. - *Dune*

LLMs have been with us for a while now, and the rate that they evolve continues to accelerate. As a developer, I was the prime market for these tools. Not just for programming, but for searching the web, technical questions and the occasional cooking recipe.

These tools are incredible. [Claude](https://claude.ai/) Code creates a website in minutes. The ever-patient [ChatGPT](https://chat.openai.com/) answers questions. [Gemini](https://gemini.google.com/) can summarise research papers in language even I can understand.

After using them for a while though, I’ve formed some thoughts on how I use these tools, and how they shape thinking in general.

---

## Inputs over outputs

Like many people, I started by typing a vague question into ChatGPT and waiting for an answer. Then I’d poke at the result until it seemed right.

The problem is obvious: if you don’t define the problem clearly, you can’t judge whether the output is correct.

What I do now is load the model with context up front - a full problem statement or a [5 Whys](https://en.wikipedia.org/wiki/5_Whys) breakdown. That forces me to clarify what I’m asking, and gives the model something useful to work with.

For programming, that means I don’t ask Claude to “build a backend.” Instead I’ll ask it to suggest edge test cases based on my code coverage, or to compare two different approaches I’m considering. For research, I’ll gather papers using [Elicit](https://elicit.com/) and then ask Gemini to summarise and distil them.

Improve the input, and you improve the output. Garbage in, garbage out.

---

## Overreliance

> Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them. - *Dune*

When I first used Claude Code it was magical. I typed a few words and zip - off it went.

But over time, I noticed my own abilities atrophying. Without exercising the basics, I started forgetting them. I eventually removed AI from my editor and went back to coding manually, only asking models to review my approach.

---

## Telephone

AI also extends the [game of telephone](https://en.wikipedia.org/wiki/Chinese_whispers) that programming already is. Customers tell analysts, who tell product managers, who tell designers, who tell developers. By the time it reaches you, intent is already muffled.

Now add an AI into that chain: a brand-new “teammate” with no context beyond your codebase. No wonder the outputs can be so poor.

---

## Bus factor

“Vibe coding” makes the AI tool the [bus factor](https://en.wikipedia.org/wiki/Bus_factor).

I often found myself spending more time reviewing AI-generated code than if I’d just written it myself. As a hands-on learner, the process was both laborious and unhelpful.

For me, autocomplete is enough - small nudges without handing over the wheel.

---

## Yes men

Even with attempts to fix it, AI models remain sycophantic. Look through Claude Code’s GitHub issues and you’ll see people laughing at its endless “You’re absolutely right!” replies.

The problem isn’t comedy, it’s that models:
A) lack critical thinking, and
B) echo whatever you feed them.

That echo chamber has led some to form unhealthy attachments to models. The uproar over [GPT-4o](https://openai.com/index/hello-gpt-4o/) being replaced by GPT-5 was so loud that OpenAI restored it for Pro users.

But models aren’t good friends or coworkers. They won’t disagree, push back, or tell us when we’re wrong. Without that, we don’t learn.

---

## Garbage

At work, I tried [GitHub Copilot](https://github.com/features/copilot) for reviewing pull requests. I hoped it might catch obvious mistakes.

Instead, it nitpicked irrelevant details, suggested edits that broke the build, and ignored the big picture. Copilot has a reputation for this, but Claude and ChatGPT have given me similar results.

People say “90% correct, 10% wrong.” My experience is closer to 70/30 - and you spend more time fixing that 10–30% than if you’d just done it yourself. Diminishing returns set in quickly.

---

## Should you learn to code?

With reports of job cuts and articles declaring “coding is dead,” panic is natural. But the truth is nobody knows what happens in ten years.

We’re living through an AI bubble. Even leading players admit as much. The whole house of cards could collapse - especially if issues like [model collapse](https://arxiv.org/abs/2305.17493) materialise.

So should you learn to code? I don’t know. Neither does anyone else. That uncertainty itself is the point.

---

## Going forward

LLMs are magical. But they need to be appreciated for what they are: magical parrots<sup id="fnref1">[1](#fn1)</sup>.

Avoid enslaving yourself to them. Let them sharpen your inputs, but keep the outputs - and the thinking - yours.

---

<div class="footnotes">

<div id="fn1">
<p><small>[1]</small> As an aside I asked ChatGPT what it thought of the term "magical parrot" for itself. It replied (clipped):
"If I were self-reflecting, I might say: being called a 'magical parrot' captures the spectacle of what I do, but not the structure. A parrot repeats without context; I generate within probabilistic context windows. The magic isn’t that I parrot - it’s that I can combine, remix, and weigh information in ways that often feel like original thought, even though the mechanism is utterly different from yours." <a href="#fnref1" title="return to article">↩</a></p>
</div>

</div>
