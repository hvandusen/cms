---
templateKey: work
title: Bathroom
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1621455221/Screen_Shot_2021-05-19_at_4.13.28_PM_uy19mz.png
featured: false
draft: false
description: I was waiting for a bus near Penn Station to go to DC and killed
  some time at a diner.. I was struck by bathroom tile and took this photo.
postContent:
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1640712327/IMG_1255_ezb5up.jpg
  - type: text
    text: I had never tried to put any of my drawings in perspective, and I guess
      seeing the strong pattern on the floor from this particular angle got me
      thinking...  I ended up making this on my laptop on the bus, which had
      outlets in front of every seat **🙏**
date: 2021-05-19T20:10:20.491Z
date-finish: 2021-05-19T20:10:20.510Z
paper_code:
  code: |-
    window.g = new grid(10,10,5,"none");
    function ev(num){
      return ev%2 === 0;
    }

    function rgb(){
      return ["red","green","blue"][num(3)]
    }

    var tileFunctionza = function(i,j){
      var out = {};
      if(i===-21+-200*j){
        out.fillColor = "black";
      }
      else if(Math.abs(i-j)<2){
        out.fillColor = "yellow";
      }
      else if(Math.abs(i-j)>2 && Math.abs(i-j)<5){
        out.fillColor = "red";
      }
      else if(Math.abs(i-j)===2){
        out.fillColor = "green";
      }
      if(ev(i) && !ev(j)){
        out.fillColor = "green";
      }
      return out;
    }

    var tileFunctionz = function(i,j){
      var out = {};
      var offset = 15;
      if(i%(offset) === 0 && j%(offset) ===0)
        out.fillColor = "green"
      else if(i%(offset-1) === 0 && j%(offset-1) ===0)
        out.fillColor = "red"
      else if(i%(offset+1) === 0 && j%(offset+1) ===0)
        out.fillColor = "blue"
      return out;
    }

    var tileFunction = function(opts){
      return function(i,j){
        var out = {};
        var offset = opts.offset;
        var skipper =opts.space;
        var colors =opts.colors;
        var fullRect = offset + (skipper)
        if(i%(fullRect)<offset && j%(fullRect)<offset ){
          out.fillColor = colors[0];
          if(i%fullRect===j%fullRect)
            out.fillColor = colors[1];
          if(i%fullRect+j%fullRect === offset-1 )
            out.fillColor = colors[2];
        }
        else{
          if(i%(fullRect) === j%fullRect)
            out.fillColor = colors[3]
          if((i%fullRect + j%fullRect) === (fullRect+offset)-1)
            out.fillColor = colors[4]
        }

        return out;
      }
    };

    create()

    function create(){
      project.activeLayer.clear();
      g.clear();
      g = new grid(10,10,10,"rgba(0,0,0,0)");
      g.modify(tileFunction({
        offset: 5+num(20),
        space: 5+num(20),
        colors: [rgb(),rgb(),rgb(),rgb(),rgb(),rgb()]
      }));
      g.groups.position += view.bounds.size/2
      window.wallRight = g.groups.clone();
      window.wallLeft = g.groups.clone();
      window.wallLeft.rotate(-66, view.bounds.center)
      window.wallLeft.skew(24,-5.8,view.bounds.center)
      window.wallLeft.scale(.91,1.44,view.bounds.center)

      window.wallRight.rotate(119, view.bounds.center)
      window.wallRight.skew(-62,47,view.bounds.center)
      window.wallRight.scale(.695,.965,view.bounds.center)
      // window.wallLeft.skew(0,4.3,view.bounds.center)
      g.groups.skew(-56,0,view.bounds.center)
      g.groups.skew(0,24,view.bounds.center)
    }

    function onMouseDown(){
      create();
    }
images:
  - https://res.cloudinary.com/candusen/image/upload/v1621455089/Screen_Shot_2021-05-19_at_4.11.17_PM_aivx3e.png
desort: false
---
