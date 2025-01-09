---
layout: layouts/post.njk
title: "ClickOps and IaC - which are Pets and Cattle?"
date: "2024-12-06"
description: "We get it you use Terraform. Your infra can be fragile though. Just saying..."
---

Ancient history tells us that a peoples known as the "sysadmins" or "web masters" used to manually configure servers via the archaic command line. These people literally SSH'ed into machines and ran commands on them. Utter animals.

And these peoples then needed to baby the servers. Nursing them as a young child to make sure they never broke, never went down or got tired.

Then the cloud renaissance came, ushering  in a revolutionary way of configuring servers - Infrastructure-as-Code. Gone are the days of running CLI commands - no no. Instead you're writing Terraform or CDK, and configuring servers via version controlled, repeatable methods. Rather than pets that we had to baby, we had cattle - a cow is just a cow. We can get rid of as many as we like and still rebuild the herd.

To many people this appeared like a good thing. We lost a lot of the complexity that was many legacy systems configuring by relics long gone.

The problem is, that Infrastructure-as-code is not synonymous with having cattle.

## IaC != Cattle
The promise of infrastructure-as-code is that we should have infinitely repeatable infrastructure. And buy-and-large it brought us that. It brought us 95% of the way there. The problem is that last 5%.
That 5% is all the things not repeatable like
- Integrations with other systems
- Custom scripts
- SSL certificates - there are ACM certs but these don't always fit in complex environments.
- Literally any EC2 instance - yes there is cloud-init, but it's not a silver bullet

Many may chalk this down as "bad engineering" but this is the reality of the world. If your business honestly could recreate their entire infrastructure from scratch using only code, then great for you - but this is not the norm.

This is not even including the fact that no matter what IaC you use, it still involves some kind of initial manual work to provision the cloud accounts. At BPP, we have a "manual-account-setup" terraform module that is run to provision new accounts, but this has to be done manually using local AWS credentials - not in a pipeline.

But let's talk about that 95% that is automated. Now sure, you have a singing and dancing pipeline that runs your Terraform. But then how do you upgrade your Terraform, add governance across multiple teams and ensure that the system is secure? I'll admit that this process is more observable than sshing into servers, but it's still babying of a kind.

And whilst your walled garden of Terraform is performing great. You then get a requirement to connect to a DB outside of your IaC and before you know it you end up manually provisioning security groups based on the IP address of your EC2 instance. Quickly, it becomes only marginally better than the old days.

## Manual Setup of a Server does not mean Pets
Let's remember the original goal of IaC - not simply automation, but rather repeatability and immutability. A manually provisioned server could still be "cattle" as long as the *exact* process to stand it up again is documented.
This process is much more difficult than with code, but it's not impossible.

Before the "IaC" tools that we have now, most of the time there was at least some sort of "setup.sh" script used to configure the server. It meant that provisioning a new one was as simple as adding it to the internal network and running the script through a KVM.

So did it matter if your server burned to the ground? No, it was just a server. And as long as you didn't literally only have one server, you can just roll to the backup and provision a new one.

## How to be truly resilient
The question is, how do we make our infrastructure truly resilient? Truly repeatable?

### 1. Shoot your cattle - regularly
Though this might be unpopular with the rest of your team, I'd highly recommend performing a `terraform destroy` on your non-production environments. Then run a terraform apply to recreate it. If something breaks, you can quickly address your code to make sure that it completely recreates the environment.

### 2. Adopt the ephemeral mindset
As a team, it's key that you drive the ephemeral mindset into all that you do. This mindset should encompass development, architecture and operations.
This means moving beyond the idea of "environments" and instead think in terms of sandboxes that can be destroyed and recreated. In connection with the first point, a good hallmark of this is that you should be able to create an entire sandbox environment for all new pull requests or locally on a developers machine.

There are other tactics to drive resiliency in infrastructure but these are the two that I believe give outsized impacts. Building resilient infrastructure is not a trivial task but by adopting these two tactics you'll set yourself up with a system that requires much less manual intervention, makes upgrades painless and ensures that the infrastructure is always in a deployable state.
