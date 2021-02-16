---
title: "SpellcheckCI"
date: "2021-02-17"
description: "How to use mdspell and GitHub Actions to spellcheck your markdown blog"
tags: ["ci", "continuous integration", "mdspell", "spellcheck", "automation"]
---

Making sure you have correct spelling on your blog posts is vital to keep readers attention. Unfortunately, it's a laborious process and sometimes things fall through the cracks.
Being the nerd I am, I decided I needed a shell script to solve this problem.

Thankfully, someone has created an open source markdown based spellcheck module that is Node based - [mdspell](https://github.com/lukeapage/node-markdown-spellcheck).

Since I'm using Gatsby, my posts can be found under `content/blog/*/index.md` - where `*` is the name of the blog post. The command to run the spell check was then
```
$ npx mdspell -a -n "content/blog/**/*.md"
```

This would go through each of my posts and then validate the spelling is correct. When it comes across an incorrect spelling, it notifies me and asks me if I want to correct it, or add it to a local dictionary.

But, because I often blog from my iPad, where I don't have a terminal, I wanted this feedback to be visible on the CI for the new blog posts.
My workflow for creating new posts is create a new git branch, create the file and write the post, push to github and create a new pull request. You can find this very blog post's pull request here
