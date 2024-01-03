---
layout: layouts/post.njk
title: "11ty or Bust"
date: "2024-01-03"
description: "The story of how I migrated my site from Gatsby to 11ty"
---

[It’s been four years since I last did any major work to my site](https://joshghent.com/gatsby-or-bust/). But over those years, things have got a little chaotic.

Personal websites are usually fairly low down on peoples priority lists. Test coverage, clean code and the like all get thrown out the window in favour of tinkering and writing new posts. At least that’s what happened to me.

[When I first ported to Gatsby it was fantastic](https://joshghent.com/redesign/). Having a React-ish framework felt like I was just doing an ordinary days work. But over time, like many react projects, it lumbered to a grinding halt.
The site itself was still quick. But the development process was painful. Dependency upgrades had meant that I could no longer run the site on my own laptop. It was a mess of “peer dependency unmet” and “X type is not recognised”. This site is barely 5 years old (in its Gatsby form), but the fast moving Nodejs changes had meant that it hadn’t broken significantly.

It was time for a change.

First, I looked at my requirements:

- **Minimal dependencies** - I don’t want a repeat of the current Gatsby spaghetti.
- **Minimal code** (so I don’t need to mess with it in the future to upgrade)
- **Dynamic Opengraph images** - for every blog post that look nicer for social media
- **Web mentions** - make it easy to integrate the indie web features I currently have.
- **Fast build times** - Gatsby is extremely slow if you have lots of markdown files.
- **Easy to add new features** - I don’t ideally want to be maintaining a React component library.
- **Extremely small payload size** - my gatsby site used 1g of C02 per request! I wanted to reduce that.
- _(Nice to have) Create my resume dynamically based on a “work” page_

Next I took a look at the options, ultimately there were two it boiled down to:

1. [Hugo](https://gohugo.io/). A relative new comer to the static site scene but a strong contender already. It’s written in Go, which is nice. Ultimately, although there were no major issues with Hugo from my requirements, I realised my Golang knowledge was not strong enough. I want my site to be exceptionally simple to maintain. This is not a learning side project, I have those.
2. [Eleventy](https://www.11ty.dev/). Again, a newcomer on the static site scene. Written in JS but uses Nunjucks or Liquid for templating rather than something heavy like React.

Ultimately, I settled on eleventy.

> The nice thing about it is that it ships no javascript by default to the client.

It was a fairly simple migration path:

1. Clone down 11ty template project. I used this one https://github.com/tomreinert/minimal-11ty-tailwind-starter/tree/master
2. Move posts from `/content/blog` in gatsby to `/src/blog/posts` in 11ty
3. Updated all the front matter to include the `layout` tag.
4. Encountered an error because of a code block. Solved this by wrapping them in {% raw %} and {% endraw %}.
5. Found a github issue that said it was fixed in a later version. Realised that this template uses 11ty v1 not v2. So I upgraded that. Thankfully the upgrade was fairly simple but still not got the site working.
6. Removed webpack because it’s the spawn of the devil and anything else I didn’t need.
7. Configured Tailwind according to this guide - https://ben.page/eleventy-tailwind
8. Added RSS via the 11ty rss plugin
9. Converted the homepage, blog post page and now page to 11ty. This process was simple enough, just copy pasting content. In the process, I restyled the look of the blog posts page to be simpler, and (for the time being) removed photos and notes from the homepage.
10. Add a new projects page!
11. Updated cloudflare pages to build the 11ty site.
12. After doing an accessibility scan, I updated a number of colors and alt tags to ensure that the site was accessible.

And that was it!

Overall, I’m really happy with the migration. The site now uses a mere 0.01g of C02 per request and ships no JS (although Cloudflare injects some that I’m trying to remove). It’s much easier to maintain and I am enjoying the templating engine.
I have learned my lesson to keep things as simple as possible and prefer stability over feature development.
To keep on top of inevitable upgrades, I’m going to configure some basic snapshot testing that means I have some basic reassurance that the site builds, and displays content.
