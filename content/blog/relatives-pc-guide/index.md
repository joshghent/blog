---
title: "Relatives PC Guide"
date: "2021-05-19"
description: We've all been there. It's your annual family get-together and your grandad/aunt/cousin slams their ancient notebook down and tells you it's slow or broken. Here's how to do it quickly and get back to your dinner.
tags: ["windows 10", "computer maintenance"]
---

We've all been there. It's your annual family get-together and your grandad/aunt/cousin slams their ancient notebook down and tells you it's slow or broken. Whilst you quietly curse ever mentioning what you did for a living, you realise the challenge. Get it working before your dinner feast goes cold.

This guide is focused solely around Windows 10 - browsing the internet, having Zoom calls with family, checking email and occasionally playing solitaire. Standard fare for the non-technical computer user. It is designed to make the computer as easy to use as possible.

I've recently had to do this exact process for several relatives and have written this guide to save myself time in the future.

# 1. Upgrade to Windows 10 and/or update

If the computer is still on Windows 7 (or Vista - shudder), then it's time for an upgrade. This might seem like a drastic step but Windows 10 is fundamentally different to Windows 7 and improves the performance. If possible, this should be the first step. Resume the other steps when this is done.

**If you're already on Windows 10**, do the following to check for updates.
Click the Start Menu -> Settings (the cog) -> Update & Security -> Windows Update.
Next download all available updates and restart if required, then move onto the next step...

# 2. Disable windows search indexing

Search indexing is particular slow on old computers with spinning disk harddrives. To be on the safe side, disable it.
Hit `WINDOWS KEY + R` -> Type `services.msc` and hit enter.

In the services list, find the service named `Windows Search`.
Double click on it and then click the `Stop` button to stop the service. Next change the startup type to `Disabled`.

Alternatively, open a command prompt as Admin and type the following commands

```
> sc stop "WSearch"
> sc config "WSearch" start= disabled
```

# 3. Disable notifications

Notifications can be confusing and annoying. They often obscure functionality that the person is trying to use. They mostly get filled with spam.

Go to Start -> Settings -> System -> Notifications & Actions
Then disable all the toggles on that window.

# 4. Configure Zoom

## 4a: Always show meeting controls

Go to Zoom preferences (you may need to sign up or enter into a meeting).
Under General there is a checkbox for 'Always show meeting controls'

## 4b: Auto join with computer audio

In Zoom preferences, go to the Audio tab. Near the bottom, there is a checkbox for 'Automatically join computer audio when joining a meeting'.

# 5. Install remote control software

Talktalk and other ISP's sometimes block Teamviewer so maybe pick Chrome

# 6. Enable smart screen

# 7. Disable startup apps

# 8. Install Ublock origin

# 9. Remove all icons on the desktop

# 10. Disable action center

# 12. Review the programs list and prune

# 13. Do a quick virus scan

Using Microsoft Safety scanner or Kaspersky Virus Removal

# 14. Run MalwareBytes

# 15. Run Bleachbit

# 16. Set UAC to full

# 17. Hide all tray icons

To clean things up and prevent accidentally clicking on things. Drag all tray icons (asides from the volume) in the bottom right into the hidden menu.
