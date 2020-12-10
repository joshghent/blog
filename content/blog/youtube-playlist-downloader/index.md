---
title: "Downloading your Favorite YouTube Playlist Automatically"
date: "2019-02-26T22:12:03.284Z"
description: "Simple Cron for downloading your favorite Youtube playlist"
tags: ["youtube-dl", "bash", "scripts"]
---

In light of Youtube-DL being taken down from GitHub, I decided to give it a go with a use case I happened to have.

Lately, I've been listening to lots of concerts/festival sets that are not available for traditional purchase. Although I have listened to them on youtube, I didn't want to have the webpage open and the auto-play/queuing features are not as fledged out as a proper music player.

I decided to write a quick script that I could run in a cron to pull down the latest version of the playlist I maintain. To keep an eye on it, I included a Slack webhook notification that let's me know when the playlist has been downloaded.

My first version worked but I quickly realised that the script did not handle updates, only a complete re-download. To resolve this, youtube-dl has a `--download-archive` flag that keeps track of downloaded videos.

Check out the code below and hopefully you find it useful.

```sh
#!/bin/bash

playlist_url="https://www.youtube.com/playlist?list=ZZZ"

cd ~/Projects/music

youtube-dl --embed-thumbnail --download-archive downloaded.txt --no-post-overwrites --extract-audio --audio-quality 0 --format bestaudio --audio-format mp3 --yes-playlist --output "%(title)s-%(id)s.%(ext)s" $playlist_url

curl -X POST --data-urlencode "payload={\"username\": \"youtubeb0t\", \"text\": \"Completed download of all Music playlist.\", \"icon_emoji\": \":tv:\"}" https://hooks.slack.com/services/ZZZ/YYY
```
