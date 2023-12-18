---
layout: layouts/post.njk
title: "Managing Application Secrets for Terraform across Teams"
date: "2019-11-11T15:08:03.284Z"
description: ""
---

### TL;DR

- Terraform stack is deployed via Travis using a script (below)
- Secrets are shared by storing an encrypted tar file in Git
- The tar is decrypted by TravisCI and another other team member using secret keys stored elsewhere
- Variable files and generated dynamically based on the `.env`

Ok, that's a bit of a wordy title, but that's exactly the challenge I was tasked with solving recently - and it proved to be more of an issue that I expected.
The objective was to be able to use application secrets for ECS task definitions inside Terraform and have those be easily shared across the team.

## 🔐 Encrypting the Configuration

My first approach was simply to use environment variables and then put the environments file in secure storage (i.e., KeyBase) rather than committing it to source control. Simple right?
So that works, but in our case, we have TravisCI do the deployments for our stack and so that approach would have been lengthy whenever we wanted to add a new secret parameter.

To solve this, I created a script that encrypts and decrypts a config with OpenSSL encryption. These encryption keys could then be shared across the CI and the rest of the team. It would be ideal to use a GPG key for this but I do not believe this is possible in CI. Plus it's a pain to onboard a new team member as you need to re-encrypt the secrets with their public key - less than ideal.

We have a file called `.env` in the root of the Terraform repo with the environment variables as you'd usually find them. This is ignored from source control.
We then have one script to decrypt and unzip from `tar` using OpenSSL and another to encrypt the file in a `tar`. The tar is then committed to source control, it can then be decrypted by Travis and another other team member with access.

```bash
# encrypt-config.sh
#!/bin/bash

echo "Compressing config..."
tar czf config.tar.gz .env

echo "Encrypting config tarball..."
openssl enc -aes-256-cbc \
  -in ./config.tar.gz \
  -out ./config.tar.gz.enc \
  -K ${CI_ENC_KEY} \
  -iv ${CI_ENC_IV}

rm config.tar.gz

# decrypt-config.sh
#!/bin/bash

echo "Decrypting config..."
openssl enc -aes-256-cbc -d \
  -in config.tar.gz.enc \
  -out config.tar.gz \
  -K ${CI_ENC_KEY} \
  -iv ${CI_ENV_IV}

echo "Extracting config..."
tar xzf config.tar.gz
rm config.tar.gz
```

## ☝ Loading the variables

Terraform environment variables must be prefixed with `TF_VAR_`, since I didn't want the laborious process of adding this to each variable, I wrote a script to prefix them and then load the variables into the shell environment. The script can be found below:

```bash
# loadenv.sh
export $(egrep -v '^#' .env | while read line; do echo "TF_VAR_$line"; done | xargs)
```

This then meant that my variables could be referenced in terraform by adding them to the root `variables.tf` like this

```terraform
variable "REACT_APP_ENVIRONMENT_VAR" {
  type = string
}
```

...and then passed into the module like this

```terraform
// main.tf
module "Sample" {
  source                                = "./modules/general-cluster"
  REACT_APP_ENVIRONMENT_VAR                = var.REACT_APP_ENVIRONMENT_VAR
}
```

In our shell the variable would be loaded as `TF_VAR_REACT_APP_ENVIRONMENT_VAR`.

## 🤖 Automating

But I wanted to go a step further, because adding to the root `variables.tf` each time is a pain. Me thinks, time for a script... so I did some digging and added this to the end of the `loadenv.sh` from earlier

```bash
# Clear the old variables.tf file out
> variables.tf

# Loop through each line of our .env file
egrep -v '^#' .env | while read line;
do
  # Get the first part (before the =) of the line for the variable name
  var_name=$( cut -d '=' -f 1 <<< "$line" )

  # Write it to the variables.tf file
  cat >> variables.tf <<EOL
variable "${var_name}" {
  type = string
}
EOL
done
```

This now automagically generates a `variables.tf` file at the root of the Terraform folder. Travis can run this `loadenv.sh` script based on the encryption keys it has stored in it's own environment. I created yet another script called `deploy.sh` that Travis runs only on the master branch. As the name implies, it handles the deployments and notifications of such.

```bash
# deploy.sh
#!/bin/bash

set -e

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  errorstatus() {
    echo "Error when deploying Terraform config"
    # Slack Webhook Message
    curl -X POST --data-urlencode "payload={\"channel\": \"#deployments\", \"username\": \"Deploy Bot\", \"text\": \":poop: Build #$TRAVIS_BUILD_NUMBER Failed when deployed Terraform Stack. Error log $TRAVIS_BUILD_WEB_URL\", \"icon_emoji\": \":rocket:\"}" $SLACK_WEBHOOK_URL
  }

  # When exiting due to an error, run the error status
  trap errorstatus ERR

  . ./decrypt-config.sh

  # shellcheck disable=SC1091
  source ./loadenv.sh
  terraform init
  terraform validate
  terraform apply -auto-approve
  curl -X POST --data-urlencode "payload={\"channel\": \"#deployments\", \"username\": \"Deploy Bot\", \"text\": \":tada: Build $TRAVIS_BUILD_NUMBER successfully deployed Terraform Stack\", \"icon_emoji\": \":rocket:\"}" $SLACK_WEBHOOK_URL
  echo "Deployment Completed Successfully"
else
  echo "Branch is not master so skipping deployment"
fi
```

After all this has run, I end up with a nice deployment message in Slack!

<div class="image">
	<img src="./../../assets/images/deployment-success.png"/>
  <em></em>
</div>

And that's all! We are still iterating our approach with Terraform and working to get it running against our entire stack rather than just parts of it. I am enjoying learning it so far, even if it's a bit rough around the edges I'm excited to see where Terraform goes!
