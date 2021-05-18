---
templateKey: work
title: Random Picture Frame
type: Website
featured: true
draft: false
date: 2020-08-13T13:56:59.881Z
date-finish: 2021-05-18T17:55:08.992Z
url: https://frame-streamer.herokuapp.com
description: ""
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1616359975/Screen_Shot_2021-03-21_at_4.52.43_PM_d93kgv.png
images:
  - https://res.cloudinary.com/candusen/image/upload/v1621361542/Screen_Shot_2021-05-18_at_1.54.42_PM_dzuylz.png
---
This project has been years in the making for me. I wondered what it'd be like to make my own digital picture frame. Instead of showing a slideshow of images provided on some kinda USB stick,  I wanted to show random images from the internet. And I wanted it to show images according to some kind of a stream-of-consciousness. My golden example was for it to show a picture of a dog, and then show a picture of a hot dog right after it, and then maybe another sandwich, ad infinitum.

There are many tools available to pull images from the internet from a written program. The Google Images tool requires you to provide a search query and it gives you back a bunch of images matching it. 

<div class='caption-container image-caption'>
    <img src=https://res.cloudinary.com/candusen/image/upload/v1621361543/Screen_Shot_2021-05-18_at_1.47.30_PM_hzjssf.png></img>
  <div class='caption'>The search term for this image is "light".</div></div>

So what I needed was a program that could create a "stream-of-consciousness" list of terms that I could use to find the images. To do this, I used the Princeton lexical database [Wordnet](https://wordnet.princeton.edu/).

<div class='caption-container image-caption'>
    <img src=https://res.cloudinary.com/candusen/image/upload/v1621361542/Screen_Shot_2021-05-18_at_1.50.22_PM_dbh6if.png></img>
  <div class='caption'>Another "light" pic!</div></div>

Wordnet is an amazing database of English terms that provides a hierarchy of meanings for each word. For the term dog, Wordnet will give you this and this and that. My code traverses the Wordnet's "tree of meaning" to accomplish the stream of consciousness feel. For instance, the code will kick off the SOC with a random term from a list, like dog. Wordnet will give us each meaning of dog, as well as the hierarchy of its meaning. Dog is an animal which is a mammal which is an organism which is an entity. The next word will either pertain to dog's other meanings, or will go one level up the tree, to mammal, and search terms related to that. This process goes on forever!

<div class='caption-container image-caption'>
    <img src=https://res.cloudinary.com/candusen/image/upload/v1621361542/Screen_Shot_2021-05-18_at_1.48.49_PM_gycr9o.png></img>
  <div class='caption'>More "light" action</div></div>