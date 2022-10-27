---
title: How to fix 'Public key authentication failed' for Azure DevOps
date: 2022-10-06
tag: ["fix"]
---



If you're using DevOps and tried to clone down a repository with a Mac you might have stumbled across this error.

```
Cloning into 'example-repo'...
remote: Public key authentication failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```



You double check your SSH Key is correctly added but it's all correct. What gives?

This error usually appears when you are using multiple ssh keys.

The solution, thankfully, is simple.



## Solution: Add 'IdentitiesOnly yes' to your SSH config

Here's how to do it

1. Open up a terminal window and type `nano ~/.ssh/config
2. Add the following to your SSH config

```
Host ssh.dev.azure.com
    UseKeychain yes
    IdentitiesOnly yes
    AddKeysToAgent yes
    IdentityFile ~/.ssh/id_rsa
    PubkeyAcceptedKeyTypes=ssh-rsa
```

3. And hey presto you're done!



You can now git clone projects with SSH using Azure.

Microsoft vaguely hide this fact in some documentation [here](https://learn.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops&tabs=current-page#q-i-have-multiple-ssh-keys--how-do-i-use-different-ssh-keys-for-different-ssh-servers-or-repos).