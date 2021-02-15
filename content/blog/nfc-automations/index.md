---
title: "NFC Automations I've Done Recently"
date: "2021-02-15"
description: "How using NFC has helped me automate common tasks"
tags: ["nfc", "automation", "productivity"]
---

Recently, I've been experimenting with automation. Historically, I have focused on "background" automation - using a cocktail of Zapier and IFTTT. This automation would receive notifications of changes from various services and then take some action. An example would be when I am requested as a reviewer on a GitHub pull request, create a task in Todoist. This stuff happens in the background without my knowledge.

Now I wanted to turn my attention to other digital routines - for example setting alarms, turning off lights and so on. These somehow feel different from putting stuff in my todo list, but don't ask me why.

Anyway, I realised that this was a great deal of manual work that I was doing multiple times a day. Initially, I thought about just creating a Siri Shortcut to manage this but this was still effort to open the shortcut apps, search through to find the one I wanted and then click it.

## NFC to the Rescue

After listening to an [episode of the Automators](https://www.relay.fm/automators/66), NFC tags caught my attention. I had heard of them as an added feature of the new iPhones but wasn't really sure what they were. I had known about NFC and used it before (e.g., contactless cards) - but this made me realise I could create something programmable. What was better, they were available even as stickers so they did not have any bulk and were fairly invisible.

I bought a roll of stickers from [Amazon here (non-affliate)](https://www.amazon.co.uk/gp/product/B00M5PC0FG) and got to work.

## What to Automate...

I started by identifying 3 routines I had that involved multiple steps that I had to orchestrate manually.

1. Night time - set alarms, activate Do Not Disturb, turn off lights etc.
2. Mileage Tracker - I have a private API that logs the input of my car mileage, MPG and fuel costs between trips to the pumps. This helps me forecast petrol costs (boring but interesting).
3. Start Work - turns off alarms, sets Do not disturb, starts a Toggl timer

## Shortcuts!

Now, it was time to automate them via Shortcuts. Here are some previews:


Next, I had to get them to activate when the NFC sticker was activated.

## Programming the NFC Sticker

So, we've got the shortcuts, and we've got the stickers. Now we need to tie the two together. Thankfully, "There's an App for that". I downloaded this app - [NFC Tools](https://apps.apple.com/us/app/nfc-tools/id1252962749).

Upon launching it, you can write to an NFC tag and select "Siri Shortcut" and then listing the name of the Shortcut to trigger. Easy peasy.

I then stuck the stickers on my bedside, in my car by the steering wheel and the base of my monitor. Make sure you keep track of which is which! I'd probably recommend sticking them first and then programming if you can.

## Conclusion

Overall, I'm happy with these little routines I've automated. It was a fun project to do and opened me up to other possibilities with NFC!
