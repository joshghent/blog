---
layout: layouts/post.njk
title: "ClickOps and IaC - which are Pets and Cattle?"
date: "2024-12-06"
description: "We get it you use Terraform. Your infra can be fragile though. Just saying..."
---

Ancient history tells us that a peoples known as the "sysadmins" or "web masters" used to manually configure servers via the archiac command line. These people literally SSH'ed into machines and ran commands on them. Utter animals.

And these peoples then needed to baby the servers. Nursing them as a young child to make sure they never broke, never went down or got tired.

Then the cloud renaissance came, ushering  in a revelutionary way of configuring servers - Infrastructure-as-Code. Gone are the days of running CLI commands - no no. Instead you're writing Terraform or CDK, and configuring servers via version controlled, repeatable methods. Rather than pets that we had to baby, we had cattle - a cow is just a cow.

To many people this appeared like a good thing. We lost a lot of the complexity that was many legacy systems configuring by relics long gone.

The problem is, that Infrastructure-as-code is not synonymose with having cattle.


- IaC does not mean cattle
- Manual setup of a server does not mean pets
- How to be truly resilient
