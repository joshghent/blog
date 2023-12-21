---
layout: layouts/post.njk
title: "Monitoring Git Leaks in Travis"
date: "2019-11-08T12:11:00.284Z"
description: "How to use gitleaks in TravisCI to monitor secrets"
---

Recently, we've wanted to add Gitleaks scanning into our repos to keep on top of any potential security issues.
I checked out a number of tools such as [detect-secrets](https://github.com/Yelp/detect-secrets) and [trufflehog](https://github.com/dxa4481/truffleHog) but eventually I decided to use [Gitleaks](https://github.com/zricethezav/gitleaks) as the format was fairly CI friendly.

There is already a CI version of [Gitleaks](https://github.com/zricethezav/gitleaks-ci) but it uses a stripped down version of [Gitleaks](https://github.com/zricethezav/gitleaks) with basic regex.
I wanted to use the fully fledged version that was updated a bit more regularly. Additionally, with the CI version you had to configure a few environment variables which I didn't want to do with every single repository.

Since there was not much documentation on how to use it in CI, I decided to post this blog.

Simply add this script in `/.ci/leaks.sh`
This will only audit the current script in the local repo

```bash
#!/bin/bash

if [ ! -z $TRAVIS_PULL_REQUEST ]; then
    REPO_SLUG="/${TRAVIS_REPO_SLUG}"

    # Audit the current commit for secrets
    docker run --rm --name=gitleaks -v $PWD:$REPO_SLUG zricethezav/gitleaks -v --repo-path=$REPO_SLUG --commit=$TRAVIS_COMMIT
fi
```

Next, add this into your `.travis.yml`. Alternatively just add an additional "script" if you don't want to do different stages

```yaml
- stage: Leaks
    language: generic
    script:
    - "./.ci/leaks.sh"
```

Additionally, add `docker` as a new service in the `.travis.yml`

That's it! Tweet me [@joshghent](https://twitter.com/joshghent) if you have any problems.
