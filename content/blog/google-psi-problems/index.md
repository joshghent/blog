---
title: "Solve 90% of Google Pagespeed Insights Issues in 30 Minutes"
date: "2018-03-31T22:12:03.284Z"
description: ""
---
<div class="image">
	<img src="../../assets/images/horserace.jpg"/>
	<em>Source: <a href="https://unsplash.com/photos/fxAo3DiMICI">https://unsplash.com/photos/fxAo3DiMICI</a></em>
</div>

Performance is a critical factor in site retention rates. Time is money, and there is a laundry list of examples that prove [people expect near-instant loading](http://loadstorm.com/2014/04/infographic-web-performance-impacts-conversion-rates/) and will navigate off a webpage if it [does not load in under 3 seconds](https://www.nytimes.com/2012/03/01/technology/impatient-web-users-flee-slow-loading-sites.html?pagewanted=all).

Although the [Google Page speed Insights](https://developers.google.com/speed/pagespeed/insights/) score is not a guaranteed stamp that a site will be fast, it does give some indication of this fact. Additionally, it is now one of the hundreds of factors that Google and other search engines use in their SEO ranking algorithms. Truly then, web performance is something to care about from a business standpoint.

Since developers and businesses alike aim for “best bang for your buck”, here I’m going to walk you through three simple steps you can action which will bump your score by at least 20 (if not more). This is not a smoking gun but, applying the [Pareto principle](https://betterexplained.com/articles/understanding-the-pareto-principle-the-8020-rule/), it is better to spend your time doing 20% of the tasks which will give you 80% of the benefit.

## Minify your assets

Large page sizes owe their disdain to bloated javascript and CSS assets. An easy way to reduce the sizes of these is to minify them. This can be done via a task runner like [Gulp](https://gulpjs.com/) or [Grunt](https://gruntjs.com/). If you are in a hurry then you can use an online tool such as [Minifier](https://www.minifier.org/) — however, this will mean you need to re-run this everytime you change the Javascript. I’d recommend setting up an automated task.

If you are feeling adventurous then you can go further with this optimization and use Webpack with [tree shaking](https://webpack.js.org/guides/tree-shaking/). This will prune any unused code from your Javascript and therefore reduce the size of the underlying modules that you are minifying.

Delve deeper into minification and you will quickly realize that the best way to reduce asset size is to **just have less stuff** in them. Therefore, try and reduce the number of [Lodash](https://lodash.com/) modules you are importing, or [Moment.js locales](https://momentjs.com/docs/), or perhaps you are importing the entirety of [Bootstrap](https://getbootstrap.com/) just to use the row and container system.

Images are one of the biggest culprits in the issue of large files. According to the [HTTP Archive, as of the 15th March 2018](http://httparchive.org/interesting.php?a=All&l=Mar%2015%202018), **over half **of an average sites payload is in images. Therefore it’s crucial to focus your efforts on reducing the number of images you use but also optimizing them. Before putting an image on your page make sure to compress them first. If you are in a hurry then try using this tool called [Optimizilla](http://optimizilla.com/). The solution is to automate this process using your task running (Gulp, Grunt or Webpack) along with a plugin such as [ImageMagick ](https://www.imagemagick.org/script/index.php)or the like. There is even a [Wordpress plugin](https://en-gb.wordpress.org/plugins/ewww-image-optimizer/) if you are publishing images via a blog.

## Cache Assets

Huge savings in speed will come from the client’s browser not having to download the assets in the first place. This will not only drastically improve page load times but also reduce the bandwidth needed for your server (which depending on your hosting provider may reduce the bill). Additionally, if the client is viewing the site on their mobile then they will be able to load your site, safe in the knowledge that they don’t need to be concerned about their data plan.

You can cache your assets in a few ways, the easiest is to set a cache control header on your requests. On an Apache server, you can do that as follows.

<div class="image">
	<img src="https://cdn-images-1.medium.com/max/2152/0*SsZKehPZW3P9knAC."/>
	<em>Code here: <a href="https://gist.github.com/joshghent/fcca761d006ae34a1a2aaa0406a9e0f1">https://gist.github.com/joshghent/fcca761d006ae34a1a2aaa0406a9e0f1</a></em>
</div>

Application caches can also come in very useful. A major issue facing many sites is long-running queries. An easy solution to this is to cache the query response in the application, providing that the query is worth of caching and will not have its response changed a lot. [Laravel has this built in](https://laravel.com/docs/5.6/cache) and [Express can be extended to do this also](https://www.sohamkamani.com/blog/2016/10/14/make-your-node-server-faster-with-redis-cache/). This will reduce the server response time and therefore lead to quicker page loads for the clients.

## Enable Compression

Lastly, after reducing and minifying your sites payload, you can enable compression which will ensure they are transferred in the smallest possible form. There are two popular algorithms, [Gzip](http://www.gzip.org/) and [Brotli](https://github.com/google/brotli). The latter is a more recent trend and actual has better compression rates than the long heralded Gzip. Nevertheless, I would still recommend using Gzip as Brotli takes more CPU power (and therefore time) to decompress on the client side.

You can find guides on how to do this around the web that will be up to date long after this blog post is published but here is a [good one for Apache](https://varvy.com/pagespeed/enable-compression.html) (which I assume will stay the same!).

I hasten to add, that if your site must support [Netscape 3 and below ](http://schroepl.net/projekte/mod_gzip/browser.htm)then compression will be redundant here as they only support HTTP/1.0 which does not send the Accept-Encoding header. Nonetheless, with [less than 1% of people worldwide](http://gs.statcounter.com/browser-market-share) using anything other than “the big 5” browsers — I think you’ll be in the clear.

Performance should be considered a feature and whilst it would be great to spend lots of time on performance, companies tend to prioritize other tasks ahead of it. Whilst that is not ideal, using the 3 tips above (which should take less than 30 minutes per point) you can quickly improve the performance of your site or application in addition to having more potential leverage for time to be allocated for furthering performance.

Do you have any other performance quick tips? Let me know at [hola@joshghent.com](mailto:hola@joshghent.com) or comment below! I’m also on [twitter @joshghent](https://twitter.com/joshghent?lang=en) where I tweet about web performance and more.
