---
title: "Gatsby or Bust!"
date: "2019-08-29T11:37:00.284Z"
description: ""
---

Recently, I moved my website from a static HTML file on GitHub pages (yes _actually_ static) and my blog from Medium. I decided to combine them both and move over to a Gatsby website.

## Why?
I have been wanting to move my blog from Medium for a long time. Since the platform was built, they have struggled to find a viable business model and have resorted to increasingly anti-user friendly ways of attempting to get people to pay for content. I have thoughts on what they *should* do but that's a topic for another time.
Anyway, I wanted for people to actually read my blog and didn't like the mobile experience in particular.

<div class="image">
	<img src="https://miro.medium.com/max/2560/1*6Mu_U4dUXP5uzebamoUYaw.png" />
	<em>Source: <a href="https://medium.com/@nikitonsky/medium-is-a-poor-choice-for-blogging-bb0048d19133"></a>https://medium.com/@nikitonsky/medium-is-a-poor-choice-for-blogging-bb0048d19133</em>
</div>

Additionally, I wanted to regain control of my content. I didn't like the idea that a platform could be gaining revenue from content that wasn't theirs. It wasn't as if I was using the platform for free, I had paid $70 or so to get it pointed to my own subdomain (a feature that they later dropped).

## The Move
I chose Gatsby for two reasons, it seemed pretty quick and was easy to deploy and add new blog posts to. I could also keep everything inside git and tools that I was already using for development work.

### Deployments
I chose to host the site on Netlify and configured auto deployments from new commits on the master branch. I also configured my DNS provider with a CNAME from the root of my domain the the Netlify application.

Along with this, I configured TravisCI to run a spell check on all my blog posts as well as deployment previews for new PR's. This allows me to see new posts before they get merged in the live site.

### Development
I started, like most people, with the [Gatsby starter blog](https://github.com/gatsbyjs/gatsby-starter-blog). I didn't like some of the coding styles, but didn't really care all that much.
On top of the boilerplate, I made some additional changes

* Added a light/dark mode toggle in the Navbar - heavily inspired by the Overreacted.io blog as well as a myriad of others with the same feature. This was easy enough to do
* Changed the color scheme
* Added my [keybase](https://keybase.io/joshghent) gpg key for verification of my identity
* Changed the style of headings for the blog posts, I found the default headings to be larger than writing on a charity cheque
* Added a /now page as inspired by David Sivers and documented the apps and tools I use currently. This needs some improving


### Moving my old posts
Setting up the site was relatively easy. The difficult and laborious part was going to be the moving of my old posts.
Since Gatsby runs on Markdown, I found a neat NPM app called [medium-2-md](https://www.npmjs.com/package/medium-2-md).
I went into all 30 or so of my old blogs and then copied the URL's and then ran the command
`medium-2-md convertUrl https://blog.joshghent.com/sample-post -f -o index.md`

I could have potentially wrote a script to automate it. But...

![xkcd](https://imgs.xkcd.com/comics/automation.png)

... It wasn't really worth it

After moving them all to markdown, I then ran the site locally to compare the markdown posts to the Medium posts to make sure they matched and all the content worked.

There was a couple of recurring problems I found

* Words often had the `*` in the wrong place
* Paragraphs didn't have enough `\n` so rendered all as one paragraph
* Embed content such as Gists and Tweets didn't work - I had to find Gatsby plugins for this and port over the references to use their format
* Image captions did not work - I had to move these over to use `<em>` tags
* Images had to move moved over manually - yup saving each one and importing it correctly. There is now a `-i` feature you can pass to `medium-2-md` but this wasn't a feature when I did the original port (a long time before the actual thing launched!)


## Review
Overall, I'm really happy with the result. There are some things I need to change but for now, it'll do. It was super quick and easy to get up and running with Gatsby.
