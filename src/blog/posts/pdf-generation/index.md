---
layout: layouts/post.njk
title: "Re-architecting our PDF Generation"
date: "2020-07-31T14:06:03.284Z"
description: "How a seemingly simple problem was more challenging than expected"
---

When I joined the Koru team, one of the biggest issues with our pipeline was the PDF generation system.
We have PDF's in the first place as a nice report that customers get about each of their candidates that takes an assessment on our system.
These PDF's are saved to S3 and then we send the customer a signed link to download the PDF.

The major problem with it however, was that the PDF system ran on two big expensive `m4.large` box (~$74 a month each!) and then there was another one for our QA environment.
You wouldn't mind paying a premium for the machine if the service worked but it constantly failed to generate PDF's for unknown reasons. It was one of those services that was just a black hole to us.
I don't like having any black holes in systems that I'm charged with running and maintaining. It pays to be extremely knowledgable about the system (within reason of course).

So we've got the classic, too expensive, doesn't work and a "known unknown". What would you do?

How the PDF system worked historically was to open the web page in an instance of Chrome and then "print" it to a PDF. This was extremely memory intensive and the box could only handle a couple of PDF's at a time.
However, there was no mechanism to rate limit itself. Therefore, if we fired five requests at it, then the box crashed and it had to be manually rebooted.
Although we tried a number of ways to fix it, what we really wanted was something that was event driven so it could fail and manage it's own processing rate with ease. Since the application was hosted on EC2, we couldn't configure it to trigger from SQS without additional overhead, so we decided to rewrite.

The first MVP was a Node Lambda that called a service called Api2Pdf - a simple API-as-a-service platform that, given a URL and some parameters, creates you a PDF.
We then saved this PDF Buffer to our own S3 bucket and then deleted the one that they had just generated.
Unfortunately, we had a number of bugs with this system. Because the web page that we took a PDF of often took up to 700ms to load, the PDF was being generated before any of the content had loaded. It was seemingly only an edge case though.
The obvious fix for this was to add some kind of CSS selector that the API would wait for _before_ generating the PDF - but this was not possible at the time with Api2Pdf's API.

So the next step, was to add some protective validation that would check if the PDF had any content before then being accepted. If it was blank then an error was thrown for it to be retried.

This worked for a couple of weeks, and then we got some more errors... This time, it had generated the content but the underlying data hadn't yet loaded it. This meant it passed the "blank" check but ultimately hadn't loaded correctly.
So I got working on another fix, my first attempt was to take a sample and compare the Buffers and see if they were the same. However, there were edge cases that this could not handle.
I then found PDFJS from Mozilla which had a handy feature to be able to get the text of a PDF. I decided to compare the generated PDF's text with a sample I had taken.

Again, this appeared to work for a few weeks - perhaps too well. Although still ultimately had the downside that if it failed we would have to regenerate the PDF and were charged in the process for doing so.

However, after an API release, it appeared as though the page rendering the PDF had slowed down enough that the amount of PDF's getting generated incorrectly had increased.

At this point, I decided I was done with hacky fixes and working with a million libraries not updated in ages - seriously with the amount of NPM packages out there I would have thought there was something decent for PDF's.
It was time for the big guns - it was time for Puppeteer.

As you may or may not know, Puppeteer is a beautifully designed API for working with Chromium. It has specific functions for screenshots, modifying the page, etc. But most importantly for us, it could generate PDF's.

Porting over to the API was relatively ease and didn't require a whole lot of modification. What did, was getting it deployable to serverless and AWS Lambda.

Because Puppeteer contains the entire Chromium browser in its install, it vastly goes beyond the size limit for Lambdas (50MB Zipped, 250MB Unzipped)
The solution was to use a Lambda layer to contain the Puppeteer stuff and then just the application code in the lambda itself. I used a lambda layer taken from [here](https://github.com/shelfio/chrome-aws-lambda-layer).

I had to modify my serverless config like so:

```yaml
layers:
  HeadlessChrome:
    name: HeadlessChrome
    compatibleRuntimes:
      - nodejs12.x
    description: Required for headless chrome
    package:
      artifact: layers/chrome_aws_lambda.zip

functions:
  generate-pdf:
    provisionedConcurrency: 1
    description: Generates PDF from HTTP calls or SQS messages.
    handler: dist/handler.handler
    layers:
      - { Ref: HeadlessChromeLambdaLayer }
    events: ...
```

Next, I had issues with the PDF working fine, but not displaying any background colors. At first I tried doing the `emulatePageMedia` function and passing null so that it would not use print based CSS code, but to no avail. Finally, I managed to find a helpful fix on StackOverflow [here](https://stackoverflow.com/questions/60736354/puppeteer-not-rendering-color-background-color-when-i-try-to-save-pdf-on-disk).

```css
html {
  -webkit-print-color-adjust: exact;
}
```

I slumped back in my chair after this and breathed a sigh of relief. That was it... or so I thought.

Turns out, in my haste I had set the option of `waitUntil: networkidle2` in the `.goto()` function for Puppeteer.
Basically this function is called so that the headless browser will navigate to the page provided. It returns a Promise of the page when the page has loaded. So, it can be awaited until the navigation has finished. But what is considered "loaded" anyway? Well thankfully, Puppeteer takes an array of special strings that tell it what it should consider "loaded". NetworkIdle2, according to the documentation, works as follows: `consider navigation to be finished when there are no more than 2 network connections for at least 500 ms`.
Now I'm not sure why I did this because in hindsight that was bound to go wrong. If the network request that loads the data takes more than 500ms then that means it will consider the page loaded before the content is present. Therefore, we changed it so it waited for `networkidle0` which is the same as networkidle2 but waits until there are 0 network connections for 500ms.
Additionally, for added safety we added a 5 second "sleep" before it takes the PDF. This probably isn't needed any more, but we wanted to be extra cautious because of all the customer problems that this system had caused.

This was the final piece in the puzzle. For real this time! It was finally stable. It was quite a journey and forced me to conquer some interesting problems with tonnes of various answers that had worked for some individuals. Additionally, we expanded our internal tooling with this project which will help us going forward to resolve customer issues. So overall, despite the chaos, it was a win win.
On reflection, I wish we had gone straight to Puppeteer but hindsight is 20/20. In all honesty, I was afraid of it. I saw it as an absolutely mammoth task, having nightmares about trying to implement it years ago at a web dev job, but it was shockingly simple to implement. It's taught me to take a better look at the options and not hold onto opinions from time gone. Technology moves to fast to do so.

I'll conclude this article with a quote that I believe applies here:
`It ain’t what you don’t know that gets you into trouble. It’s what you know for sure that just ain’t so.`
