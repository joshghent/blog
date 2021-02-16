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
$ npm i -g node-markdown-spellcheck && mdspell -a -n "content/blog/**/*.md"
```

This would go through each of my posts and then validate the spelling is correct. When it comes across an incorrect spelling, it notifies me and asks me if I want to correct it, or add it to a local dictionary.

But, because I often blog from my iPad, where I don't have a terminal, I wanted this feedback to be visible on the CI for the new blog posts.
My workflow for creating new posts is create a new git branch, create the file and write the post, push to github and create a new pull request. You can find this exact blog post's pull request [here](https://github.com/joshghent/blog/pull/165).

## Time to Automate

I'm a big user of GitHub Actions so I went with that to setup this process.

Initially, I went down the road of installing all the node dependencies, then installing mdspell and then running the spellcheck. However, I found that it took over a minute to download all the node modules! It turns out, I could have used `npx` to use mdspell without having to install the project.

Here is the complete GitHubCI - which, across over 50 blog posts, takes around 10 seconds to run!

```yml
# ./.github/workflows/spellcheck.yml
name: Spellcheck

on: [pull_request]

jobs:
  spellcheck:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm i markdown-spellcheck -g
    - run: mdspell -a -n -r "content/blog/**/*.md"
      name: Spellcheck
```

I hope this proves useful to you for your own blog. If you don't have one already, I'd highly recommend creating one!
