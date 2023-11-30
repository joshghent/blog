---
title: Pull Request Environments in GitHub Actions (with SST, AWS and Cloudflare pages)
date: 2023-07-24
description: How to create a pull request environment in GitHub Actions using SST, AWS and Cloudflare pages
---

Pull request environments are a useful tool to have in your CI/CD pipeline. They allow you to preview your changes in a production-like environment before merging them into the main branch. You can send these environments to stakeholders, QA teams and even customers to request early feedback.

Recently, I was tasked with adding this into a project.
The project used:

- SST
- AWS (for deploying the backend)
- Cloudflare pages (for deploying the frontend)
- NextJS frontend
- NodeJS backend

I couldn't find a complete guide on how to do this, so I thought I'd write one.

## The setup

Principally we have 4 things to do

1. Deploy the backend
2. Deploy the frontend (pointing to that backend)
3. Post a comment to the pull request with the URL's.
4. Destroy the environment when the pull request is closed or merged.

Let's break this down.

### Starting out

First we need to setup the workflow. We'll trigger for new `pull_requests` and give permissions to the workflow to allow it to post comments, access secrets etc.

Additionally, we'll add a `PR_PREFIX` variable. This is so that we can deploy multiple pull request environments at the same time.

> Thoughout the jobs, you will likely see code to filter out `dependabot` triggers. This is because these jobs will not work when triggered by dependabot. You can remove these if you don't use dependabot.

```yaml
name: Pull Request Ephemeral Environment

on:
  pull_request:

permissions:
  contents: write
  pull-requests: write
  id-token: write
  deployments: write

env:
  PR_PREFIX: pr-${{ github.event.pull_request.number }}
```

### Deploy the backend

As we're using SST, this is pretty easy.

One caveat I did discover is that if you have multiple stacks that you want to deploy individually, you'll need to set the output from the `.sst/outputs.json` file and then deploy the next stack. This is because when deploying with SST, it will wipe the existing `.sst/outputs.json` file.

Here is the job for deploying the backend:

```yaml
backend:
  name: Deploy Backend for PR
  if: github.actor!= 'dependabot[bot]'
  runs-on: ubuntu-latest
  outputs:
    api-endpoint: ${{ steps.sst-api-outputs.outputs.apiUrl }}
  steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Configure Non Prod AWS Credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
        aws-region: ${{ secrets.AWS_REGION }}
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Cache node modules
      uses: actions/cache@v3
      with:
        path: node_modules
        key: node_modules-${{hashFiles('package-lock.json')}}
        restore-keys: node_modules- # Take any latest cache if failed to find it for current yarn.lock
    - run: npm install
    - run: npm run build
    - name: Deploy Global
      run: npx sst deploy global --stage $PR_PREFIX
    - name: Deploy API
      run: npx sst deploy api --stage $PR_PREFIX
    - name: Extract Api URL and set output
      id: sst-api-outputs
      run: |
        cat .sst/outputs.json
        API_URL=$(jq -r '.[].ApiEndpoint | select(. != null)' .sst/outputs.json)
        echo "apiUrl=$API_URL" >> $GITHUB_OUTPUT
```

### Deploy the frontend

Next we need to deploy the frontend. As we're using Cloudflare pages, this is also pretty easy!

How this works is using the `cloudflare/pages-action`. This will deploy it to a unique URL as a preview deployment for that pages project.

```yaml
frontend:
  name: Deploy Frontend for PR
  if: github.actor!= 'dependabot[bot]'
  runs-on: ubuntu-latest
  outputs:
    url: ${{ steps.cloudflare-publish.outputs.url }}
  needs:
    - backend
  steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Cache node modules
      uses: actions/cache@v3
      with:
        path: node_modules
        key: node_modules-${{hashFiles('package-lock.json')}}
        restore-keys: node_modules- # Take any latest cache if failed to find it for current yarn.lock
    - name: Cache NextJS Build
      uses: actions/cache@v3
      with:
        path: |
          ~/.npm
          ${{ github.workspace }}/packages/web/.next/cache
        # Generate a new cache whenever packages or source files change.
        key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('packages/web/**/*.[jt]s', 'packages/web/**/*.[jt]sx') }}
        # If source files changed but packages didn't, rebuild from a prior cache.
        restore-keys: |
          ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-
    - run: npm install
    - name: Build
      run: npm run build -w packages/web
      env:
        NEXT_PUBLIC_API_URL: ${{ needs.backend.outputs.api-endpoint }}
    - name: Publish
      uses: cloudflare/pages-action@1
      id: cloudflare-publish
      with:
        apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        projectName: ${{ secrets.CLOUDFLARE_PAGES_PROJECT_NAME }}
        directory: packages/web/dist
        gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### Post a comment

Next we need to post a comment to the pull request with the URL's from the output.
I copied the format of the message from the one that the native cloudflare integration uses because it looks quite good.

If there is no comment, it will create one. If there is one, it will update it. Simple!

```yaml
comment:
  name: Comment on PR
  if: github.actor!= 'dependabot[bot]'
  runs-on: ubuntu-latest
  needs:
    - backend
    - frontend
  steps:
    - name: Find Comment
      uses: peter-evans/find-comment@v2
      if: success() && github.event.number
      id: fc
      with:
        issue-number: ${{ github.event.number }}
        body-includes: "🚀 Successfully deployed preview environment"

    - name: Create Comment
      uses: peter-evans/create-or-update-comment@v3
      if: success() && github.event.number
      with:
        issue-number: ${{ github.event.number }}
        comment-id: ${{ steps.fc.outputs.comment-id }}
        edit-mode: replace
        body: |
          ## 🚀 Successfully deployed preview environment

          <table><tr><td><strong>Latest commit:</strong> </td><td>
          <code>${{ github.sha }}</code>
          </td></tr>
          <tr><td><strong>Status:</strong></td><td>&nbsp;✅&nbsp; Deploy successful!</td></tr>
          <tr><td><strong>Preview URL:</strong></td><td>
          <a href='${{ needs.frontend.outputs.url }}'>${{ needs.frontend.outputs.url }}</a>
          </td></tr>
          <tr><td><strong>API URL:</strong></td><td>
          <a href='${{ needs.backend.outputs.api-endpoint }}'>${{ needs.backend.outputs.api-endpoint }}</a>
          </td></tr>
          </table>
```

### Cleanup

Finally, we need to clean up the resources that we created. This is done by using the `sst remove` command. Cloudflare pages resources are automatically cleaned up for us.

This process requires a completely new GitHub action workflow that triggers when pull requests are closed (this means merged or manually closed).

```yaml
name: Destroy PR Environment

# only trigger on pull request closed events
on:
  pull_request:
    types: [closed]

env:
  PR_PREFIX: pr-${{ github.event.pull_request.number }}

permissions:
  id-token: write
  contents: read

jobs:
  remove:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Configure Non Prod AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          aws-region: ${{ secrets.AWS_REGION }}}
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Cache node modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: node_modules-${{hashFiles('package-lock.json')}}
          restore-keys: node_modules- # Take any latest cache if failed to find it for current yarn.lock
      - run: npm install
      - run: npx sst remove --stage $PR_PREFIX
```

In addition to this we need to make sure that our default destroy policy is set to remove all resources. By default SST will never remove DynamoDB tables, S3 buckets and other data sensitive resources. In this case though, we want to completely remove everything.

In your `sst.config.ts` file, add the following:

```ts
if (app.stage !== "production") {
  app.setDefaultRemovalPolicy("destroy");
}
```

This will remove all resources when the stage is not `production`.

## Conclusion

And that's all! You now have a custom preview environment for your pull requests.
