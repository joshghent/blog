---
title: Setup a Repo in Github
date: 2023-05-03
---

I end up creating quite a few repos in Github for customer projects. And I always end up having to remember how to best set them up. In line with the whole "blog-umentation" thing, I thought it would be best to write it down for myself.

This setup lends itself to a "modular monolith" setup but can be used for any kind of setups.



## Features

This setup brings you the following

✅ Conventional commits check (making sure commits adhere to guidelines)

✅ Ensure checklists in PR's (as defined in a template) are complete

✅ `main` branch is protected

✅ Dependabot alerts are setup for security

✅ Dependabot is setup for github actions and npm packages

✅ Jest coverage reports get added to PR's

✅ PR's are scanned for secrets



## Steps

1. **Go to Settings and change the following**

   1. Protect the main branch - require 1 or 2 approvers, prevent force push
   2. Change merge types to Squash and Merge only
   3. Enable dependabot
   4. Enable automatically delete head branch

2. **Add the following Github actions**

   1. Secrets Scan (https://github.com/marketplace/actions/trufflehog-oss)
   2. Google release please (https://github.com/google-github-actions/release-please-action)
   3. Require PR checklist complete (https://github.com/mheap/require-checklist-action)
   4. Conventional Commits (https://github.com/amannn/action-semantic-pull-request)
   5. Coverage report (https://github.com/ArtiomTr/jest-coverage-report-action)

3. **Add the dependabot config (`.github/dependabot.yml`**)

   1. ```yaml
      version: 2
      
      updates:
        - package-ecosystem: 'github-actions'
          directory: '/'
          schedule:
            interval: 'daily'
      
        - package-ecosystem: 'npm'
          directory: '/'
          schedule:
            interval: 'weekly'
          rebase-strategy: "auto"
          open-pull-requests-limit: 2
          ignore:
            - dependency-name: "*"
              update-types: ["version-update:semver-major"]
      ```

   

Hopefully this helps you setup your Github repos faster!