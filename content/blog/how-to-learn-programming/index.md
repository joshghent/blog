---
title: "How to Learn a Programming Language in Record Time"
date: "2017-06-28T22:12:03.284Z"
---

*Note: This article is aimed primarily at beginners who perhaps know a single language but are looking to start learning another.*

When picking up a new programming language your first port of call might be the [doc](https://developer.mozilla.org/bm/docs/Web/JavaScript)[ument](http://php.net/docs.php)[ation](http://guides.rubyonrails.org/), maybe it’s reading through some code on a project you admire or perhaps you learn most effectively [by building](https://github.com/karan/Projects). Whatever the case, we can apply the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle) to **learn 80% of the language from 20% of it’s features**. If you’re coming from a background where you know [design patterns](https://en.wikipedia.org/wiki/Creational_pattern) and common programming features ([control flow](https://en.wikipedia.org/wiki/Control_flow), loops *et cetera*) then this is more than possible.

When I initially thought of this idea I didn’t think that it would be possible to boil down a language to such a degree. But then again, when was the last time you used [clz32](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32) or [bzflush](http://php.net/manual/en/function.bzflush.php)? Programming languages have grown over time to implement features that, in day to day development, you mostly won’t need. Learning a new programming language can therefore seems a daunting prospect — but it need not be.

I applied this exact pattern of learning when trying to learn Java and it worked relatively well. There was things I didn’t know from this, such as exact patterns of inheritance but at a very basic level, I could hold my own — and that’s the purpose. As you dive deeper into your new programming language of choice, you will get to know the nuances, why and how it solves specific problems and what’s best practise. This will, at the very least, give you a good grounding in a language in an efficient manner.

Here’s my list of things to prioritise so you can pick up a new language in record time:

1. **Variable creation** — if it’s a strongly or statically typed language, then this extends to how to declare variables of different types (integer, string, object, array). If the language has the feature then we can learn how to create a constant too.

1. **Loop ’n’ number of times **— In Javascript this would be achieved by — `for(var i = 0; i < n; i++) {}`

1. **Loop over a *key:value* store **— *Key:value* stores are called Objects in Javascript in other languages they are called Hashes (Ruby) or Dictionaries (Python). Nonetheless, they are all the same, and usually there is a particular method to iterating over them because they are referenced by “keys” and not index numbers (as with arrays).

1. **Referencing items in array** — In javascript you can reference `arr[1]` for the second item of an array. In addition to basic referencing, there may be special methods like `end()` to get the final element of an array.

1. **Functions** — How to create them, with or without arguments.

1. **Add to an array** — How can we add an element to an array?

1. **Remove from an array** — Likewise, how can we remove a particular item (of index ’n’) from an array?

1. **Class creation and constructors** — This is where I find languages differ wildly in particulars of the syntax. PHP, for example, has a special __construct function that you must use to construct the class.

1. **StdOut method** — In javascript this is `console.log` in PHP it’s `print`. This is probably my most used method when debugging.

1. **Comparison operators** — How do you check if a variable is false or true? How do you compare a larger number against a smaller number?

1. **Length of a string** — A must have for any language. I find myself using this all the time but a common use case is checking whether we should truncate a string before displaying it to a user.

1. **Length of an array **— Crucial when working with loops as 99% of the time, you will be iterating over an array for however long the array is.

1. **Public and Private methods** — All languages (especially those with classes) should have this, and is essential when you want to disallow access to functions outside the class.

1. **Try…catch blocks** — I only ever use these when integrating Stripe payments but they can be handy other times, perhaps when you are testing for a bug and want to capture it for your bug tracking software.

1. **Returning from functions** — Not all languages use `return`! ([See Rust](https://rustbyexample.com/fn.html)).

And that’s it! This will by no means teach you a language *per se* but it will provide a good base level to become familiar with the syntax.

This learning pattern relies on knowing concepts and design patterns; It goes to show how your learning can be transferred from one language to another!

Remember the core concepts and features of a language are what matters.

*Additional Reading/Resources*

[https://tim.blog/2009/01/20/learning-language/](https://tim.blog/2009/01/20/learning-language/) — The original article this is inspired by.

[https://learnxinyminutes.com/](https://learnxinyminutes.com/)
