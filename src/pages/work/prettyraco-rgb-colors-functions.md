---
templateKey: work
title: "prettyRaCo: RGB colors, Functions"
type: essay
featured: false
draft: true
date: 2020-08-29T16:43:46.462Z
description: A story about a function I wrote that sparked a realization about
  colors on screens. I ended up using in most of my programs involving any
  color.
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600788162/Screen_Shot_2020-09-22_at_11.21.43_AM_kibfgj.png
---
In 2011 took a leap of faith into computers and programming. I had always enjoyed making things in my life, and I figured that people who learn to program get to make things all day- programs! - whatever those were.

After my first year I still felt that I had no idea what a program actually was. We were learning the syntax of the Java language in my first class. We studied the right way and the wrong way to write code, and why the right way is better than the wrong. But my confusion towards what programs were on a deeper level was a mental block. What happens to my Good Java Program? What reads it in? How does it make its way to 1s and 0s? Who's in charge of that process? It all felt so out of my control.

Two years into my journey into my computer science degree, I still struggled to find my own way forward as programmer. My initial impulse that I would enjoy programming because I could make my own stuff felt flatly wrong. I couldn't keep up with my classes. The most fun I had in any of my assignments was building a simple webpage with images and links. I turned to the web as a possible direction to explore. The web and Javascript were still not respected all that much in the institution I went to. Javascript was still considered a "toy language" that was attached to the web- for jokers only. Real programmers made things for the deep guts of a computer in C or C++, not the security-laden safety net of the browser.

I discovered that Javascript actually was taking on a vibrant new life thanks to Node.js, which aimed to untether javascript from the browser and promote it to a "utility language" much like python or ruby- able to run on any computer to accomplish any task. This was 2012, the very beginning of the rapid rise of javascript.

That's when I decided to focus on Javascript and hope that as my own understanding of it matured, so would the ecosystem around it, providing me with more avenues and angles to try things out.

I started off by looking for ways to draw with code and quickly found Paper.js, the swiss army knife of svg drawing. I became enamored by the concepts it introduced me to like adding points and vectors together to create a kind of visual math for creating pictures. I got to a point where I would think of an idea to try out and have to run to my room to try it out before I forgot it.

![](https://res.cloudinary.com/candusen/image/upload/v1616516564/Screen_Shot_2021-03-23_at_12.22.15_PM_gfoxrl.png "prettyRaCo ball")

Of all the ways we interface with computers, writing code is the most intimate way to discover their unsavory aspects.



> I'm a boss and thats how i be.

```
function prettyRaCo()
        {
            var colorWheel =  Math.floor(Math.random()*6);

            var color = "rgb(";
            var randomNumber =  Math.floor(Math.random()*256);
            if(colorWheel ==0)
            color= color+ "0,255,"+randomNumber+")";
             if(colorWheel ==1)
            color= color+ "0,"+randomNumber+",255)";
             if(colorWheel ==2)
            color= color+ "255, 0,"+randomNumber+")";
             if(colorWheel ==3)
            color= color+ "255,"+randomNumber+",0)";
             if(colorWheel ==4)
            color= color+ randomNumber+",255,0)";
             if(colorWheel ==5)
            color= color+ randomNumber+",0,255)";
            return color;
        }
```
