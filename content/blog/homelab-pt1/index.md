---
title: "Homelab - the Making Of - Part 1"
date: "2019-12-06T16:04:54.284Z"
description: ""
---

Lately, I've been in the mood to tinker and happened to have a DigitalOcean VPS box lying around (previously just used for hosting a Minecraft server), so I decided to dive into the world of self-hosted services.

In the past, I took the view of self-hosting that I believe many others do:
a) It'll be too difficult to set up
b) Cloud alternatives are cheaper and easier

Having read a number of articles (and spent far too much time browsing /r/homelab), I decided that I wanted to experiment with some of these services to learn more about docker, linux and maybe even for fun.

## But what problem am I trying to solve?
Now, in this section I could discuss how Google is bad, the internet is controlled by a handful of monopoly's with little oversight run by people who, despite their relative innocence didn't scale with their own success and companies are profiting off our data - but I'm not going to. There are plenty of people who have wrote about this at length and have done a lot more research.

The problem I was trying to solve was two fold
1. My Google Drive monthly pricing was slowly creeping up and the data in there was impossible to sort and categorize due to their woefully slow web client and even more attrotious desktop client.
2. I wanted a VPN service

## Ok, enough talk...

Let's dive into some code.

My only requirement for this setup was I wanted to do it entirely in Docker and I wanted to host multiple services.
Which leads us onto our first task...

### Nginx Proxy with SSL
At a high level, an Nginx reverse proxy will allow me to point subdomains to each individual underlying service.
When accessing a website, the request goes on Port 80 and ultimately domains are just IP addresses. So we need a proxy to route the traffic to the containers based on the subdomain.

First I added the Nginx-proxy (as a container #obvi)
```bash
docker run --detach \
    --name nginx-proxy \
    --publish 80:80 \
    --publish 443:443 \
    --volume /etc/nginx/certs \
    --volume /etc/nginx/vhost.d \
    --volume /usr/share/nginx/html \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    jwilder/nginx-proxy
```

This spun up Nginx on port 80 (HTTP) and 443 (HTTPS).

Next I ran
```bash
docker run --detach \
    --name nginx-proxy-letsencrypt \
    --volumes-from nginx-proxy \
    --volume /var/run/docker.sock:/var/run/docker.sock:ro \
    --env "DEFAULT_EMAIL=josh@ghent.cloud" \
    jrcs/letsencrypt-nginx-proxy-companion
```

This container handles generating SSL certificates via LetsEncrypt, it also updates the Nginx config so that HTTP traffic will be re-routed to the HTTPS version.

For this to work, you need to have a domain - for me, this was "ghent.cloud" since "ghent.com" is taken by a Belgian furniture company (damn them!)
I pointed the nameservers to Cloudflare and added an A record for both the root domain and "www" subdomain pointed to my DigitalOcean machine's IP address.
I didn't proxy these requests to get their SSL as I was handling that myself.

It's worth noting that, on the free plan of Cloudflare, you cannot have wildcard records (e.g., *.ghent.cloud would mean xyz.ghent.cloud and abc.ghent.cloud route to the same place). So, to setup new services you have to setup A records with the subdomain you want pointed to your servers IP address. This caught me out after having spent hours battling with LetsEncrypt.

### Adding NextCloud, N8N and Statping
