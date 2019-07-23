---
title: "Understanding PHP hatred"
date: "2018-03-05T22:12:03.284Z"
description: ""
---

Pictured: The PHP developer in their natural state of silent contempt

It’s an age-old joke to hate on [PHP](https://secure.php.net/). But why do people dislike it so much? After all, [PHP powers 80% of the web](https://w3techs.com/technologies/details/pl-php/all/all) (a large majority of that is credited to [Wordpress](https://wordpress.com/), but still). In this article I break down the main gripes of PHP development and share advice on language and system design.

### Inconsistent method naming

The biggest problem people see when they first look at PHP is the inconsistency of the standard language methods. When [PHP was first released in 1994](https://secure.php.net/manual/en/history.php.php) it did not have [namespacing](https://en.wikipedia.org/wiki/Namespace) which meant all methods had to exist globally at the **root** level. When [namespaces were finally introduced in PHP 5](https://secure.php.net/manual/en/language.namespaces.basics.php), the damage had already been done. Methods that ordinarily have been [namespaced](https://en.wikipedia.org/wiki/Namespace) under it’s particular category (such as **String\** or **Array\**), were just plonked and prefixed with the category instead.

This led to names such as [array_map](https://secure.php.net/manual/en/function.array-map.php) and [str_repeat](https://secure.php.net/manual/en/function.str-repeat.php). Now that’s all well and good, but the problem is that the prefix + underscore method was not always used. Soon, there was a whole host of methods named things like [strtolower](https://secure.php.net/manual/en/function.strtolower.php) and [ucfirst](https://secure.php.net/manual/en/function.ucfirst.php) that broke those rules.

Additionally, these method names had inconsistent usage of [snake_case](https://en.wikipedia.org/wiki/Snake_case) — as is the case across most of the string methods. You have functions such as [strtotime](https://secure.php.net/manual/en/function.strtotime.php) and [str_split](https://secure.php.net/manual/en/function.str-split.php) — why is it not str_to_time? Who knows.

Furthermore, another minor inconsistency that had escaped my notice until studying the [list of PHP methods](https://secure.php.net/manual/en/indexes.functions.php), is the usage of **‘to’ **and **‘2’**. In some cases **‘2’** was substituted into method names, presumably to look like a teenager texting on a [Nokia 3310](https://en.wikipedia.org/wiki/Nokia_3310) in the early 2000’s.

As a result, we now have methods such as ‘[bin**2**hex](https://secure.php.net/manual/en/function.bin2hex.php)’ and ‘[deg**2**rad](https://secure.php.net/manual/en/function.deg2rad.php)’ as well as [str**to**time](https://secure.php.net/manual/en/function.strtotime.php) and [str**to**lower](https://secure.php.net/manual/en/function.strtolower.php).

With all that said, what’s the take away for you and me? In software design, and most things, consistency is key. By having a consistent interface for programs to use both programmatically (with consistent and logical API endpoints and parameters) as well as visually (with easy-to-use but also functional UI’s), we enable more logical and clear usage for people using our UI’S and developers integrating with our API’s.

Not to be too hard on the PHP developers, but it is clear that seldom thought went into planning the language or thinking about its future scope. Don’t make the same mistake. Drill down into all the little features and quirks of your system as well as ones you may add in the future. It is impossible to gear up for every eventual outcome but it is worth having that forward thinking view, so you are less likely to get tunnel visioned into “the” product. Software always changes.

### Inconsistent argument orders

Another inconsistency is that of argument ordering. Arrays, dictionaries, hashes, whatever you call them, they are an integral part of any language that developers using that language will use on a daily basis and form a core part of storing and manipulating data on any system.

You’d think that, being such an important part of the language, that they at least would be consistent. Unfortunately, you’d be wrong.

If you’ve ever done PHP development you may have run into this issue. You’ve got an array of numbers that you want to double and then return into a new array. No problem! You say.
> “I’ll use [array_map](https://secure.php.net/manual/en/function.array-map.php)!”.

So you write the code and then run it and then…

![](https://cdn-images-1.medium.com/max/2000/0*iKeBG9ial1LFcExP.)

What? You say. After much debugging, thinking there may be an issue with your method, you finally resort to the PHP docs.

There you discover…

![Documentation for array_map ([https://secure.php.net/manual/en/function.array-map.php](https://secure.php.net/manual/en/function.array-map.php))](https://cdn-images-1.medium.com/max/2432/1*WdQmqjGHTWJD8Avo29rMjw.png)*Documentation for array_map ([https://secure.php.net/manual/en/function.array-map.php](https://secure.php.net/manual/en/function.array-map.php))*

**It’s callback first. Not callback last, like you had just done with array_filter.**

I don’t know how many times I’ve done this but each time you can’t help but slightly curse the name [Rasmus Lerdorf](https://en.wikipedia.org/wiki/Rasmus_Lerdorf).

Besides the importance of consistency as we have already spoken about, what else can we learn. Well for my money, it’s helpful error messages. Rather than spitting out something vague and meaningly like in this case, write something helpful and actionable. I read a great article about this very topic — you can find it [here](https://uxplanet.org/how-to-write-a-perfect-error-message-da1ca65a8f36). I’d highly recommend reading it. Ideally you want to make your UI (including visual and programmatic UI) as intuitive as possible but account for cases where someone makes a mistake (we all do) and handle it gracefully by guiding the user to the correct course.

### Frustrating usage

Asides from being poorly named, the usage of these method is also frustrating.

[Explode](https://secure.php.net/manual/en/function.explode.php) is a method that takes a string and a delimiter and breaks up that string on the delimiter into an array. Simple right? You’ve probably seen this in Javascript with [String.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) and other languages. The quirk here is that passing empty string (“”) or null as a delimiter will cause the method to return false. Rather than simply treat it like every other language (empty string returns every character as an element of the array or null to return the string in its entirety), PHP decides to treat it as an error condition. But because it does not throw an error you are forced to check it manually.

Another aggravating method usage case is when manipulating arrays. [Sort()](https://secure.php.net/manual/en/function.sort.php) and all the other array sort methods (there are a lot, all more confusingly named than the last) in PHP operate the on the array in place and do not return a new manipulated array. They simply return true or false. This prevents you from method chaining and makes the code you write with array manipulation that bit more verbose than it would otherwise be. Further, [array_reverse](https://secure.php.net/manual/en/function.array-reverse.php) (in the same category of array manipulation) does return a new array but this again means more inconsistency (even though in this case, the inconsistency is good).

Without doubt however, the trifecta of annoyance comes from finding a string within a string. This could not be more simple. Every language has a method like this, and they all work the same. A needle (the string you want to find) and a haystack (the string you want to find it in) are accepted, the method then returns the haystack index at which this needle was found and returns -1 if it wasn’t found. This is the case for Javascript, C and most other languages. PHP however, being the language hipster that it is, decided that this wasn’t good enough and decided to break the status quo by returning false if the needle wasn’t found. That doesn’t sound so bad (although inconsistent with every other language in existence) but if you loosely compare false in PHP, it becomes a 0. Now this is an issue with the following code

![](https://cdn-images-1.medium.com/max/2976/1*AtvD1m_29mSkdMJw_2IQhw.png)

Unfortunately, because the developer was expecting a response of anything but -1 from the [strpos](https://secure.php.net/manual/en/function.strpos.php) method, this code will return true even though the needle is evidently not in the haystack. I find this one of the the most glaring oversights in PHP because it’s so easy to get wrong when programming something that depends on this as well as being again, inconsistent with other languages.

### Bad error messages

Error messages are a major problem with PHP. I distinctly remember my first gripe with PHP — debugging. Being unfamiliar with PHP at the time, I did not think to use a [3rd party tool to debug my code](https://xdebug.org/); that should be built in — right? Surprisingly (and unfortunately) not. I spent a while googling around to find out I [had to turn on errors with some specific variables and debug levels](https://stackoverflow.com/questions/1053424/how-do-i-get-php-errors-to-display). If you look at the search results for “[How to turn on php errors](https://www.google.co.uk/search?q=How+to+turn+on+php+errors&oq=How+to+turn+on+php+errors&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8)” or “[PHP blank screen, no error](https://www.google.co.uk/search?q=PHP+blank+screen%2C+no+error&oq=PHP+blank+screen%2C+no+error&aqs=chrome..69i57j69i64&sourceid=chrome&ie=UTF-8)”, the issue quickly becomes apparent.

Now, you may have got error messages ***actually ***working but sooner or later you come across this gem.
> **PHP: [**Parse error: syntax error, unexpected T_PAAMAYIM_NEKUDOTAYIM](http://phpsadness.com/sad/1)
> **You**: A what?!
> **PHP**: A Paamayim Nekudatayim of course…

For the uninitiated, [paamayim nekudatayim](https://en.wiktionary.org/wiki/%D7%A4%D7%A2%D7%9E%D7%99%D7%99%D7%9D_%D7%A0%D7%A7%D7%95%D7%93%D7%AA%D7%99%D7%99%D7%9D#Hebrew) is a romanized version of the Hebrew word for “twice colon” which is referring to the [scope resolution operator](https://en.wikipedia.org/wiki/Scope_resolution_operator#PHP) (::). The kind you would use to call a static method such as this

![](https://cdn-images-1.medium.com/max/2976/1*p1H01HBwqUr8OhBQf-556w.png)

This was originally introduced by Israeli-built [Zend Engine](http://www.zend.com/en/community/php) back in PHP 3. Now that’s fine for people who speak Hebrew, but English is widely accepted as the lingua-franca of programming and the internet at large. Again, it all relates back to ease of use. After finding out the meaning, in a way, I kind of like it as a fun quirk of PHP with an interesting backstory but it is very confusing to new PHP developers (or developers full stop).

This error message still lives on today in PHP 7.

The main issue with PHP error messages are the detail and specificity. At some point, because you’re not a robot (or maybe you are — if so please fill out this captcha before continuing) you’ll miss type something, perhaps missing a bracket or quotation mark. Maybe your code looks something like this.

![](https://cdn-images-1.medium.com/max/2976/1*AODwsrc4MDA1ZfPh4les3w.png)

![Result of the code above](https://cdn-images-1.medium.com/max/2000/1*zQTkfZ1biXDZ8r_rflvaaw.png)*Result of the code above*

If you’re a battle hardened PHP developer then you may have spotted that the closing quotation mark on line 5 is missing. Yet PHP considers it helpful to return the message from line 8.

Fast debugging is a hugely crucial issue for programming languages. Not only the frustration for the developer, but by having ambiguous error messages, it means the developer spends more time debugging which costs the company and/or client. With the above example, it may seem that this is a mountain being made out of a mole hill, but imagine this in a large application and quickly the issue becomes increasingly worse and aggravating.

### Method duplication

Last but not least is the issue of method duplication — as in the case with [die](https://secure.php.net/manual/en/function.die.php) and [exit](https://secure.php.net/manual/en/function.exit.php) as well as [implode](https://secure.php.net/manual/en/function.implode.php) and [join](https://secure.php.net/manual/en/function.join.php). Now, this may not seem like the biggest sin. After all, die came from Perl and will therefore be easier for programmers with that background to use, and exit came from C, again, allowing them to have an easier transition.

The problem with this for new programmers or programmers without a C/Perl background, it doesn’t become easier, just more confusing. You end up questioning which to use? Is one better than another? Should enforcement of one over another be in a style guide? All valid questions that leave the developer going down a rabbit hole of syntax quirks rather than actually working on the task at hand.

Helpfully the PHP manual clears up the differences

![](https://cdn-images-1.medium.com/max/2000/1*EBTgMqTKHbUjL5mIEQQyDg.png)

Yeah… perhaps not. As a takeaway from this point, it is important to not pollute your documentation of a codebase with legacy stories of reasoning behind one decision or another (as has been done here). On the other hand, question whether there should be those stories in the first place.

Although there are many more quirks from interesting to downright insane, I have found PHP very useful, as have thousands of developers worldwide. If you are a PHP developer with a startup idea, don’t wait to learn a new language or framework to build it. Just do it in PHP. Software can always be iterated on, and to worry about “What programming language should I do it in”, is even more insane and redundant that some of PHP’s quirks. All languages will be capable of doing anything (asides from system specific native apps of course but you get the point) — some are just different to others, which is why we have so many. But the speed gains you get from writing an app in a different language rather than doing it with what you know will be negated 10 times the amount due to the time it takes you to learn that new language.

The age old adage is “Only a poor workman blames his tools”. Now write the damn thing in PHP.
