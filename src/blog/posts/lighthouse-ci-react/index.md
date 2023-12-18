---
layout: layouts/post.njk
title: "Setting up LightHouse CI for React in GitHub Actions"
date: "2021-02-16"
description: "The definitive guide on how to setup LightHouse CI for your React app inside GitHub Actions or any other CI provider"
tags:
  [
    "continuous integration",
    "github actions",
    "react",
    "lighthouseCI",
    "create-react-app",
    "continuous deployment",
    "productivity",
    "automation",
    "lighthouse",
    "performance",
  ]
---

At [York Press](https://york-e.com), we noticed that our pages were gaining weight. In some cases, pages were loading over 1MB of resources before showing for the customer. This was unacceptable considering the modal broadband speed is around 1MB/s. So, we decided we needed stricter checks. This would ensure that pages are lighter than an ants leg made of clouds. And, faster load times would mean customers could get to studying faster - which I trust they yearn for.

## Lighthouse to the Rescue!

[Lighthouse](https://github.com/GoogleChrome/lighthouse-ci) is a tool developed by Google. It analyses a page and gives it a score, out of 100, on SEO, Performance, Accessibility, PWA and Best Practises. Although these are arbitrary numbers, they give a rough guide to how your website is doing. These scores are also used to rank your page in Google search rankings. So they are vital to maintain for business reasons, not technical prowess.

The challenge is how to get this tool setup as there are lots of outdated articles and guides. Furthermore, none of these seem to cover a regular use case - setting up Lighthouse for your React app.

Here's a definitive guide on how to setup LighthouseCI for your React app - and have it tracked in Github Actions.

## Setup Lighthouse CI

First, you will want to install LighthouseCI and http-server locally for testing purposes.

```bash
$ npm i -g @lhci/cli http-server
```

The former is the LighthouseCI tool. The latter is a small module to run the React app after it has been built.

Next you can create a file called `lighthouserc.json`. This should have the following contents

```json
{
  "ci": {
    "collect": {
      "url": ["http://127.0.0.1:4000"],
      "startServerCommand": "http-server ./build/client -p 4000 -g",
      "startServerReadyPattern": "Available on",
      "numberOfRuns": 1
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended"
    }
  }
}
```

The section under "collect" is where the server that runs the React app is defined. The interesting properties are the `startServerCommand` and `startServerReadyPattern`. The first tells Lighthouse how to start your application. And the second, tells Lighthouse what text to look for to see that the server is running and the test can begin. In this case, it starts the server via `http-server` and then it listens for the text `Available On`. Run the command shown above for yourself and see what text it displays in your terminal.
You may need to change `/build/client` to the directory where your application gets built

Now you can give your LighthouseCI a whirl! Build your application (if you used create-react-app then run `npm run build`), then run:

```bash
$ npm run build
$ lhci autorun
```

You should then see an output like this:

```bash
✅  .lighthouseci/ directory writable
✅  Configuration file found
✅  Chrome installation found
Healthcheck passed!

Started a web server with "http-server ./build/client -p 4000 -g"...
Running Lighthouse 1 time(s) on http://127.0.0.1:4000
Run #1...done.
Done running Lighthouse!

Checking assertions against 1 URL(s), 1 total run(s)

33 result(s) for http://127.0.0.1:4000/ :
```

## Setting up GitHub Actions CI

Now, let's automate that. The best way to enforce these sorts of checks is to make them part of your pull request workflow. This means preventing merge on requests that fail to meet these standards.

All we need to do with GitHub Actions is imitate the commands we did in the setup process. Paste the following into a new file called `/.github/workflows/lighthouse.yml`

```yml
# ./.github/workflows/lighthouse.yml
name: LighthouseCI

 on:
   pull_request:

 jobs:
   lighthouse:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v2

       - name: Setup node
         uses: actions/setup-node@v1
         with:
           node-version: "14.x"

       - name: Install
         run: npm ci && npm i -g http-server @lhci/cli

       - name: Build
         run: npm run build

       - name: LighthouseCI
         run: lhci autorun
```

Next, push up your changes and create a new pull request. You should see your Action running at the bottom of the pull request.

<div class="image">
	<img src="../../assets/images/lighthouseci-pr.png" alt="Pull Request Feedback for LighthouseCI Github Action"/>
</div>

And that's that! I hope that has saved you a lot of time if you were struggling to get your React app to play nice with GitHub Actions.
