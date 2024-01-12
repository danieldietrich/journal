---
layout: post
title: "Drawing a Clear Line"
tags: Community Life Goals OpenSource Vavr
redirect_from: /drawing-a-clear-line/
---

Recently, I felt the urge to create more space for creativity. The last time that happened a decade ago and automagically that space was filled and something new emerged&mdash;_Javaslang_[^1], better known as _Vavr_ today. And boy, that was a ride, I could tell tales!

At that time, I improved my functional programming skills by learning Scala at night. When I heard that the Java language architects were about to release lambda expressions, I was excited, would it be a way to escape the abstract template method pattern hell? If you know noisy Java[^2], the primary language at my daylight job at that time, you may also know that itching and scratching desire to abstract inherent complexity away by creating an internal DSL, implemented based on some kind of object-oriented builder pattern, more generally known as fluent API.

It started as a simple question, am I able to express Scala-like language constructs in Java, now that we have lambda expressions in Java? After porting some of Scala's basic core utils, type-by-type, the library quickly reached a demoable state. On the day of the Java 8 release, I had a minimal working version ready, one day later, Javaslang 1.0 was [announced][javaslang-announcement] and has been made publicly available on [Maven Central][maven-central]. That was in March 2014. Javaslang got the right momentum, one year later, Javaslang seemed to be well known and talked about all over, very [nice][nice]!

(_That was a long time ago._)

Back in the here and now, I feel comfortable saying that Vavr serves its purpose well, it is feature-complete. There is a saying that you can never get away from things you have written. I am sure the originator did not mean lines of code and for sure it wasn't meant literally but sometimes I feel like I have to part with Vavr. The question emerges, what is the motivation behind a solo performance in a collaborative setting, sometimes called the royal "we", consistently maintaining big portions of open-source code? And why is it so difficult to give up an open-source project without it being so hard?

(_Let that sink in, I will grab a coffee meanwhile..._)

There is more than one answer to these questions. A maintainer is a human and we humans are hormone-driven beings in everything we do. Our brain constantly gives us small rewards&mdash;every like, every approved pull request, every small achievement. I won't say that I was a junkie&mdash;dopamine-addict would be a better phrase, the constant urge to strike keys for dopamine hit. As long as I kept going, I was on cloud nine. This is the reason why developers can pull all-nighters where any normal mortal would otherwise sleep.

Luckily there is the so-called substitution principle. The dopamine rush can easily be continued by replacing your habits with healthier ones. Enjoying the sun, cooking delicious food, riding a racing bike, reading a good book&mdash;and most importantly, spending high-quality time with your loved ones, never forget that! There is an old French proverb: "The key to life is happiness in your household"[^3].

So what hinders us from changing our daily routine? Man is a creature of habit. If only there weren't these whispering voices that go louder and louder over time "I am like maintaining code for months and months" and "I don't know how much I do care about this project". I think that it's not the project that we care about, but the people we care about. The same goes for programming languages: Why do people stick with a dinosaur? Because of the community.

Overall I would say, I enjoyed working on Vavr because it was fun to learn something new, I felt the increasing familiarity in functional programming and sharing the fun with others by collaborating on Vavr increased the feeling of togetherness. Over time, the return on my investment was achieving expert status and being recognized in that specific field.

(_Dopamine was the fun part, now let's reason about psychological aspects!_)

My goal is to maximize net positive impact on the world and minimize regret. I have to keep moving but I feel stuck. Why?

Barry Staw, an organizational behavior professor, has an answer to that question, he calls it "escalation of commitment to a losing course of action". His research shows that "once people make an initial investment of time, energy, or resources, when it goes sour, they're at risk for increasing their investment". Not only Gamblers and Startups run into that trap, but also me, investing more and more into Vavr.

Adam Grant describes it as follows in his book _Give and Take_: "Economists explain this behavior using a concept known as the _sunk cost fallacy_: when estimating the value of a future investment, we have trouble ignoring what we've already invested in the past." However, research shows that three more powerful factors outweigh sunk costs by far.

Number one is _anticipated regret_: "Will I be sorry that I didn't give this another chance?". Yeah, I've invested a significant amount of my lifetime into Vavr and neglected my family from time to time. That would have been all for nothing.

The second is _project completion_: "If I keep investing, I can finish the project.". I like this one. Regarding Vavr, sometimes I think, with the right prioritization and discipline I will be able to fix all open issues without too much effort.

The third and single most powerful is _ego threat_: "If I don't keep investing, I'll look and feel like a fool. In response to ego threat, people invest more, hoping to turn the project into a success so they can prove to others&mdash;and themselves&mdash;that they were right all along.". In the context of Vavr, this is the community aspect. I don't want to put up a poor show. Spring Boot depends on Vavr and according to Maven Central, thousands of libraries depend on Spring Boot. Will I nuke the Java ecosystem when deprecating Vavr? For sure not but there is a negative aftertaste.

(_My brother was a successful trader, his secret was: to realize losses._)

I slowly but steadily moved away from Vavr years ago. But still, I did not find the right way to get it completely out of my head because I was not consistent enough to draw a clear line, yet, for example by stepping back as the owner of the repository.

[^1]: The name Javaslang was abandoned to avoid confusion with Java.
[^2]: Oracle, Java, MySQL, and NetSuite are registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.
[^3]: Don't google that.

[javaslang-announcement]: https://x.com/danieldietrich/status/446435609700491264
[maven-central]: https://mvnrepository.com/artifact/com.javaslang/javaslang/1.0.0
[nice]: https://youtu.be/uECuqa2zVbs
