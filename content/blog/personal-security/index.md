---
title: "Personal Security"
date: "2019-08-20T10:08:03.000Z"
description: ""
---

Recently, I've been listening to DarkNet Diaries, which has piqued my interest in personal security. It's also made me look into ethical hacking courses and qualifications so I can further improve my development skills - but that's for a seperate blog post.

Personal security and privacy is a subject, which if asked, any sane person would say they care deeply about. Yet seldom to people, including myself, give any real thought to it. I realised I had accrued a tidal wave of accounts, services and passwords, all that had featured in data breaches on [HaveIBeenPwned](https://haveibeenpwned.com). I remembered all the old phpBB forums that probably stored passwords in plaintext which contained the same passwords that I used for other newer services. Additionally, I'd had someone use my email address to sign up to Instagram and Ubisoft - the emails were not verified and I swiftly deleted those fake accounts but it seemed like pointless work that could easily be avoided.

Additionally, in the "Big Five" controlled world that we live in, I have become increasingly more aware of privacy that I am giving up for the sake of convience. Gmail, Drive, Amazon Prime, Instagram (now Facebook), Whatsapp (also Facebook) and the like. I recently got a Google Home Mini to use with the Hue lights but it irkes me everyday in light of news that employees and random contractors listened to everything it hears.

I wanted to share my experience because there are a lot of "extreme" personal security blogs or tutorials that act as if you are a nation state whistleblower. I don't need that level of privacy - I should, but I don't and that's a conscience desicion I have made - you will need to define where your line is too. The article that follows is more of a "how to stay private but still be able to use the internet sanely" guide.

## Securing my iPhone
### Cloudflare VPN
I downloaded the `1.1.1.1` app and activated it. I don't use Warp and have it set to only activate on Wifi networks that aren't my own. I found it to be too slow when activated on cellular. Encrypting my DNS traffic reduces the risk of MITM attacks. You can read more about it on Cloudflare's website [here](https://www.cloudflare.com/learning/dns/dns-security/)

### Deleting old apps
I realised I had a lot of apps that had accured over time, these had large swathes of permissions that in the light of news about Instagram always listening on the microphone (even when the app was closed), no longer made me feel comfortable. I decided to delete any that I no longer used which also doubled as a bit of a Maria Kondo'ing my phone.

### Reviewing permissions of current apps
After deleting old apps, I pruned through the "current" apps that I had installed and actually used and cracked down on the permissions - there was a lot that you do not realise have way more permissions that neccesary.

### Find My iPhone
Although I had this activated before, I discovered a new feature that is not enabled by default - Send Last Location. This means that just before the phone battery dies it will send it's location. May not sound like a security thing but will help me track down the physical location of the device if it is lost or stolen.

## Securing my Laptop's
* PiHole DNS at home that points to CloudFlare
* Hardcoded 1.1.1.1 as backup DNS locally for when I am not at home

## Other
* Disable Offline Login to LastPass
* 2FA all the things! - But not SMS
* Yubikeys
* Keybase
* Domain wide HaveIbeenPwned alerts
* Changed a LOT of passwords
* Deleted a LOT of accounts
* Chrome Plugins - PrivacyBadger, HTTPS Everywhere


## Future plans
This is all the stuff I don't have time for and has diminishing returns in my view
* Change from using Gmail to ProtonMail
* SelfHost NextCloud Instance
* VPN Provider for laptop/phone - still trying to find one that is logless!
* Move from WhatsApp to iMessage
