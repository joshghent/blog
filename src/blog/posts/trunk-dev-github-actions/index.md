---
layout: layouts/post.njk
title: Build a deployment pipeline in GitHub Actions
description: Speed up your deployments and reduce code admin.
date: 2023-01-10
---

In every organisation I have joined, they all have a slightly different way of deploying products. Some have one staging environment, others have four. Some use hundreds of git branches, others use one.

## Why is a deployment workflow important?

A deployment pipeline affects the important metric that all stakeholders care about - how fast you can ship code from idea to production. Stakeholders want to deliver product as quickly and cheaply as possible. So we need to consider a solution that meets these requirements.

For developers we also have the following concerns:

1. **Surfacing new changes to stakeholders.** Once things are released, how do the relevant people get notified?
2. **Reducing human error.** FTP'ing files manually works but is prone to error.
3. **Error remediation.** This could include error detection from new releases, automated rollbacks and how easy it is to issue a "hotfix".

I wanted to do a write up of a workflow that has worked for me across a number of organisations and meets all of the requirements discussed.

## What does it involve?

Chiefly it involves the following components:

1. Trunk based development on a `main` branch that holds production-ready (but not shipped per se) code.
2. A comprehensive test suites that run for all pull requests.
3. A single staging and a single production environment.
4. GitHub actions to control deployments.
5. Conventional commits to maintain consistency for pull requests.

## How to set it up

### Pull request actions

A key component of this deployment pipeline is using conventional commits. In summary, it's a way of maintaining consistency and providing meaning to git commits. As we are doing squash commits, it means we just need to validate the pull request title. We can do so via this GitHub Action.

```yaml
# ./.github/workflows/conventional-commits.yaml
name: "Check Conventional Commits"

on:
  pull_request_target:
    types:
      - opened
      - edited
      - synchronize

jobs:
  main:
    name: Validate PR title
    runs-on: ubuntu-latest
    steps:
      - uses: amannn/action-semantic-pull-request@v5
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Deployment Action

Next we need to configure the Github Action that will run when a developer merges their work into `main`. Primarily, we rely on the Google Release-Please action.

Let's break this action down

```yaml
# ./.github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches:
      - main
    paths:
      - 'src/**'
      - '.github/workflows/api.yml'
      - 'package-lock.json'
      - 'config/**'

jobs:
	test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - uses: bahmutov/npm-install@v1
      - run: npm run lint:ci
      - run: npm run test

  changelog:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    name: Changelog
    runs-on: ubuntu-latest
    outputs:
      releases_created: ${{ steps.tag-release.outputs.releases_created }}
    steps:
      - uses: GoogleCloudPlatform/release-please-action@v3
        id: tag-release
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          release-type: node
          changelog-types: '[{"type":"feat","section":"Features","hidden":false},{"type":"fix","section":"Bug Fixes","hidden":false},{"type":"chore","section":"Other Changes","hidden":false},{"type":"refactor","section":"Other Changes","hidden":false}]'
```

First we run the test suite.

After this changelog action runs, this will automatically create a new pull request which:

1. Bumps the package version number
2. Create a changelog. This is based on the git commit messages that are validated by conventional commits.
