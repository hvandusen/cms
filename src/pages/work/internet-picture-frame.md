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
postContent:
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1621361542/Screen_Shot_2021-05-18_at_1.54.42_PM_dzuylz.png
  - type: text
    text: This project has been years in the making for me. I wondered what it'd be
      like to make my own digital picture frame. Instead of showing a slideshow
      of images provided on some kinda USB stick,  I wanted to show random
      images from the internet. And I wanted it to show images according to some
      kind of a stream-of-consciousness. My golden example was for it to show a
      picture of a dog, and then show a picture of a hot dog right after it, and
      then maybe another sandwich, and so on.
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1621361543/Screen_Shot_2021-05-18_at_1.47.30_PM_hzjssf.png
    caption: A picture of a "light".
  - type: text
    text: So I needed a program that could, as if a stream of consciousness, create
      a list of terms where each is related to the one before. I used the
      Princeton lexical database [Wordnet](https://wordnet.princeton.edu/) to
      help do this.
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1621361542/Screen_Shot_2021-05-18_at_1.50.22_PM_dbh6if.png
    caption: Another "light" pic!
  - type: text
    text: >-
      Wordnet is a database for real (or human) languages, in my case English.
      It has a list of meanings of each word just like a dictionary, but the
      kicker is it also situates each word into an all-encompassing heirarchy of
      things and concepts. Searching aardvark on wordnet will give you this:


      =>   anteater
        =>   placental mammal
          =>   mammal
            =>   vertebrate
               =>  chordate
                  =>  animal
                    =>  organism
                        => living
                          => whole
                            =>  object
                                      physical entity
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1621459518/Screen_Shot_2021-05-19_at_5.23.36_PM_kgbbwi.png
    caption: A Synonyms/Hypernym hierarchy WordNet search for the term "microwave."
  - type: text
    text: My picture frame program traverses the Wordnet's "tree of meaning" to
      accomplish the stream of consciousness feel. For instance, the code will
      kick off the SOC with a random term from a list, like dog. Wordnet will
      give us each meaning of dog, as well as the hierarchy of its meaning. Dog
      is an animal which is a mammal which is an organism. The next word will
      either pertain to dog's other meanings, or will go one level up the tree,
      to mammal, and search for other mammals. If it wants it can also search
      for other organisms. This process goes on forever!
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1621361542/Screen_Shot_2021-05-18_at_1.48.49_PM_gycr9o.png
    caption: More "light" action!
---
