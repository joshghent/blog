---
layout: layouts/post.njk
title: How you should probably setup your AWS Organisation
date: 2023-07-05
draft: true
---

At a certain stage in a companies life, they realise that everyone logging into their production AWS account is probably not a great idea. In addition to that, hoards of developers are deploying their temporary test environments to the account and polluting the space.

Thankfully, AWS has Organisations. A way for multiple accounts to live under a single umbrella (for billing and management purposes).

The tricky part is setting up the new accounts and migrating developers over to the new accounts.

Here's how I have setup AWS Organisations in a number of businesses in the past.

### Assumptions

You have 1 single AWS root account and permissions to view and manage the AWS Organisation.

### The Setup

By the end we will have

1. Management account - where developers and others log in
2. Non-Production Account - where developers can deploy what they want, and the staging/dev/non-production environment is deployed.
3. Production Account - where the production stuff is deployed. Currently this will be your root account.
4. Roles and policies to allow developers to access these accounts.

### Steps

1.
