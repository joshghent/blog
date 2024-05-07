---
layout: layouts/post.njk
title: Markdown for Slides
date: 2024-03-12
description: If you hate powerpoint like I do, this is for you.
---

Working in tech, if you wanted to "share your knowledge" chances are you used Powerpoint to create a presentation.
It's been around forever so can run on anything and, on the surface, is simple to use.

But, Powerpoint sucks. It really does. The interface is incredibly cluttered, the snap to grid system is completely unhelpful in real world scenarios, and there are just too many options.
All I need is to have some images and text on a page and be able to scroll between them. I can forgo my beloved "star-wipe" transitions for simplicities sake.

Images, and text. That sounds a lot like something I could do in Markdown.
Turns out someone already had the same idea, and created a tool called [Marp](https://marp.app/).

It's incredible simple to use and makes the process of creating a presentation like writing a blog post. It's actually pleasurable to use. A simple CLI, good defaults and the flexibility of markdown.

I've only created a few presentations with it and my usage is quite basic. But I have settled on the below as being a good configuration for all my presentations.

```markdown
---
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
style: |
  table {
    width: 100%;
    margin: 0 auto;
    margin-top: 1em;
    font-size: 0.75em;
  }
  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1em;
  }
  p {
    font-size: 0.75em;
  }
---
```

The styles were added as a result of tables overflowing the slides. Smaller fonts fixed this.

Starting a new presentation is super easy:

```bash
# create the slides
$ touch slides.md

# Start the slides server in Watch mode
$ npx @marp-team/marp-cli@latest -w slides.md
```

You can then open the HTML file that is created in your browser. It will live reload whenever you make changes.

Then when I want to export them to Powerpoint (or PDF) for others to use:

```bash
# for pdf
$ npx @marp-team/marp-cli@latest slides.md -o slides.pdf

# or for pptx
$ npx @marp-team/marp-cli@latest slides.md -o slides.pptx
```

And hey presto that's all there is to it.
Marp is a great tool and I highly recommend using it if you like working directly in markdown.
