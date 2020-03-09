---
title: "How to use Private GitHub Packages on TravisCI"
date: "2020-03-09T09:22:03.284Z"
description: "How to use private github packages in your TravisCI jobs"
---

> The Problem: It's fairly well documented how to use private NPM packages in a project that uses TravisCI, but what about the GitHub Package Registry?

This was the issue I was facing. I was googling all over the net and finally landed on a solution to solve this problem.

In practise, TravisCI just boots a VM or container that then runs the scripts you have defined. We can leverage the `before_install` script to setup Travis as a new GitHub Package user. Here is how to do it...

1. If you're using a team, you will want to create a new user account and add it to your team. This is so we can safely generate a GitHub Token without fear of the person leaving the business in the future etc. Add this new bot user account to your GitHub Team
2. Generate a new personal access token on the new bot user [here](https://github.com/settings/tokens/new). It will need access to `write:packages` and `read:packages`
3. Add the newly generated token to TravisCI's environment variables as `GITHUB_ACCESS_TOKEN` - you will need to do this for each project that requires usage of the private package
4. Add the following to your `before_install` section of your `.travis.yml`
```yml
before_install:
  - echo "//npm.pkg.github.com/:_authToken=${GITHUB_ACCESS_TOKEN}" > .npmrc
  - npm config --global set <YOUR ORG>:registry https://npm.pkg.github.com
  - cp .npmrc ~/
```
5. Swap the `<YOUR ORG>` with your GitHub Organization name without the `@` - in our case the line would read `npm config --global set k0ru:registry https://npm.pkg.github.com` - **this org name should also be contained within the package name that you publish**, so in the `package.json` file for your **package** the name should be `@<YOUR ORG>/package-name`.
6. Push up your new `.travis.yml` file and kick off a build!

Hey presto that should all fit together and download correctly. Short article but it's the article I wish existed when I was searching for an answer!
