---
title: "Preserving Links whilst Migrating Domains with S3"
date: "2020-07-31"
description: "How we successfully preserved links across our system whilst migrating domains"
---

Domain migrations can be fairly simple things, change the CNAME and bobs your uncle. Difficulties arise when you have two different website systems and existing paths that you want to preserve and the site is run statically with no web server. The latter was the situation we found ourselves in.

## The Problem

The product I work on, Koru was purchased by a company called Cappfinity. Koru had a website https://joinkoru.com and Cappfinity had https://cappfinity.com. To consolidate the offerings, the websites were effectively merged.

The setup for the Koru site was as follows:
* A static web app hosted on S3 on a subdomain of joinkoru.com
* Route53 for DNS
* A  wordpress site hosted externally for the "main" website
* Cloudfront for all SSL and edge distribution

We wanted to redirect `*.joinkoru.com` to `cappfinity.com/koru` whilst preserving the paths for the user. Ordinarily, we would have just used an Nginx or Apache rewrite rule. That would have given us much more granular control than the solution we arrived at, but we didn't want to host a whole new web server for the sake of some redirects.

## S3 To the Rescue!
We eventually discovered that you can have "Routing Rules" in S3 Buckets. I quickly got to work creating a new S3 bucket.
Then under `Properties > Static Web Hosting` I configured the following
Index Document: `index.html` - this doesn't need to exist, the form element just needs to have content.

The magic happens in `Redirection Rules` which takes a horrendous XML type configuration. We set it up as follows:
```xml
<RoutingRules>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals/>
    </Condition>
    <Redirect>
      <HostName>koru.cappfinity.com</HostName>
    </Redirect>
  </RoutingRule>
  <RoutingRule>
    <Condition>
      <HttpErrorCodeReturnedEquals>403</HttpErrorCodeReturnedEquals>
    </Condition>
    <Redirect>
      <HostName>koru.cappfinity.com</HostName>
      <ReplaceKeyPrefixWith>404</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
</RoutingRules>
```

## So what's happening here?
The first part is the routing condition. For us, we have made it so the KeyPrefixEquals blank which means anything. This handles all the main redirects for existing content. In other cases, you may have it so `https://olddomain.com/blog` goes to `https://newdomain.com/newblog`. In that case, you would set the KeyPrefixEqual as `<KeyPrefixEqual>/blog</KeyPrefixEqual>`.

The second routing rule states that if the document that we redirect to returns a 403 (meaning forbidden) then we will redirect to the same host but replace the Http Error code with 404 so it will go to their Not Found page correctly. This 403 error was happening in a subset of requests due to content not being present in the new system. We left it in for historical reasons.

## Subdomains to Suffix's
You'll notice in the rules above that the redirect is not to `cappfinity.com/koru` but rather to `koru.cappfinity.com`. I forget the reason exactly for this because we could have used the `<ReplaceKeyPrefixWith>` tag to redirect to `/koru`. Nonetheless, we didn't for whatever reason (I hunted my emails down for a answer but couldn't find one). Instead, on the Cappfinity website side, which was newly hosted in Netlify, `koru.cappfinity.com` was setup as a domain alias and a CNAME was configured for that subdomain to redirect to the Netlify Application.

And hey presto! We were done. Overall, it was a fairly simple migration but used a solution I didn't even know was possible with S3!
