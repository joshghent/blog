---
title: "Writing Useful Error Messages"
date: "2020-09-04"
description: "Error messages are a critical part of your systems user experience. Here's how to craft error messages your users would be happy to see."
---

Server-side developers often overlook the fact that they are not immune to considering user experience in the design of their systems. Part of this is consideration around error messages. As I spoke about in my article about crafting quality health checks, people don't get angry when something doesn't work, but rather when something doesn't work for some inexplicable reason. In server sided systems, we explain those reasons through the form of error messages returned via an API, or some other mechanism to get a piece of text explaining the issue back to the originator of the request. But how can we write useful error messages? Here are my 5 tips.

## Make them actionable

Actionable advice will always be helpful for your users. But don't just tell them, provide a means for them to take that action that you are suggesting. As an example, let's say your application requires the email address to be verified via a unique link sent to said email address. In the case where the user logs in without verifying the email address, you could return an error message like this. "Please verify your email address joe.bloggs@example.net to continue". This might seem perfectly sensible and even actionable advice. But to go a step further to make it 'great', we could also include a button to "Resend the verification email" because chances are, the verification email you sent originally is long gone into the rabbit hole of that persons inbox. By providing a button to, in part, perform the action you require, it will be more likely for the user to follow through with the action.

In other cases, it might not be possible to partially perform an action that your system requires. In these cases, be as clear as possible about what the system would need to work - even if it requires multiple steps. For example, you might have an API that requires parameters "A", "B" and "C". But the caller only passes in parameter "A". What should the error message be?
In most cases, it would probably be:
`Please specify parameter "B"`

The user would then dutifully add parameter "B" and rerun the request. Only to be given *another* error:
`Please specify parameter "C"`

At this point, keyboards will be broken, fists will be clenched and Irish coffees will be set to brew - not the response you want from a user of your service.

Let's rewind and see if we can make the original error more actionable - the user has not passed in two required parameters for our API
```json
{
  "errors": {
    "B": {"type": "number", "required": true},
    "C": {"type": "string", "required": true}
  },
  "documentation": "https://kryptoking.com/v2/bitcoin#parameters"
  "message": "Please specify parameter "B" of type Number and parameter "C" of type String. Please see the documentation at https://kryptoking.com/v2/bitcoin#parameters for more details"
}
```

Ok so this is a little more than a message, but still is included in the overall error response. What we have here is a concise breakdown of exactly what the caller of the API needs to do to perform a valid request, as well as being provided a link to further documentation if required. Additionally, the `errors` object contains a payload that is easily parsable by a computer to perhaps automatically correct errors on the fly without the developers intervention.

In both examples, it was clear what the user needed to do next and that's what you should aim to achieve.

## Remove internal/tech lingo

This is one particularly for services consumed by non-technical audiences, who may be unfamiliar with terms we as developers use everyday. We need to use language that, as Lego would put it, can be used by ages 4+. For example, if a users authentication token is invalid, rather than displaying an error "Error: JWT has expired". We should sign the user out automatically and display a friendly messages such as, "We signed you out because we weren't sure you were still there! Please log in again using your account details below". Same error, different angle.

I am always on a crusade with whatever I work on, to remove terms from systems that would require a dictionary to understand. You should aim to do this in any messages that get displayed to users as well. Otherwise, further to point number 1, it would not be as actionable as it could have been.

## Get rid of them!

The best error messages are the ones that don't exist at all. Although you don't want to be burdening your system with translating a million different data input types to the ones you want, I'm almost sure that whatever system you work on, there is a way you can automatically correct an error without the user knowing. Maybe it's a default value you can assign, maybe it's a common data type that users mix-up, whatever the case, take a look at calls to your system that return errors and find patterns in them to seek out ways you can improve the system or the documentation.

## Don't blame the user

One of the worst things you can do in error messages, is pin the blame on the user. Avoid using terms such as "Your" or "You". In an example we used earlier we spoke of a system that auto logged you out if you were idle for too long. This could be blamed on the user - e.g., "You were idle for too long so you were logged out. Please log in again to continue". It contains actionable steps, it's not robotic and there was no tech lingo. But it makes the user feel like an idiot because of a constraint that the system built. Don't blame your users, blame yourself if anyone. I've seen no end of error messages, especially unknown ones that say words to the effect of: "Something went wrong in our system. Our engineers are working hard to fix it. Please site reference number: 12345 to our support channels if the issue persists".

Be empathetic to your users and use it as an opportunity to improve your service, maybe your documentation needs clarifying or maybe this is an easy mistake to make (misspelling of a parameter perhaps). Attack these problems, not your users.

## Be direct but not robotic

"Invalid Password Provided", "This field has an error" and "Bad Request: Unexpected end of input" are all error messages I've had in the past, maybe you can remember some equally ridiculous yourselves. What's wrong with these messages? Well asides, from the fact that they are in-actionable, they also use a tone that might be preferred by a Terminator T1000 but probably not by the "humans". Robotic language is rife in all kinds of messaging, but especially errors - the idea being that by being robotic, it's clear and direct for the person to understand. But in reality, it comes off as distant, cold and frankly useless. Inject some humanity and a bit of fun into your error messages. Psychologist have studied and found that a great way to instantly lift your mood is to simply smile. Smiling is contagious - if we add fun and humanness (if that's a word) into our tone of writing, then even though a user has an issue and maybe slightly annoyed, it will be impossible to maintain that position by being so friendly. Kill them with kindness so to speak (but maybe avoid killing your users because that would make you a terminator).

## Conclusion

Hopefully you've learnt some new tricks to help you craft great error messages. As an additional hint, try to include this as part of your code review process where you scan any external (or heck, even internal) facing messages and analyse them for quality. If possible, get someone unfamiliar with the system to review the messages so that they can be understood by all.
