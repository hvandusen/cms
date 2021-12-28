---
templateKey: work
title: Stairs
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431840/Screen_Shot_2020-09-17_at_6.53.13_PM_fu7afk.png
postContent:
  - type: text
    text: I saw this youtube video explaining how to draw a 3d illusion of stairs
      where the process is broken down into very simple parts.
  - type: youtube
    text: https://www.youtube.com/watch?v=LcWLe_f-wQk
    caption: ""
  - type: text
    text: I figured if the video could be followed by a child I could probably make
      a program draw the illusion as well.
date: 2020-07-29T15:50:30.004Z
date-finish: 2021-12-28T22:06:27.715Z
paper_code:
  code: >-
    generateStairs();

        function clearAll(){
          project.activeLayer.children.map(function(c){
            if(c.children){
              c.children.map(function(ch){
                ch.remove();
              })
            }
            c.remove();
          })
          project.activeLayer.clear();
        }

        var a = [1,2,3,4,5,6];

        function pluckRandom(array){
          var choice = num(array.length);
          return array.splice(choice,1)
        }


        function generateStairs(){
          clearAll()
          var SHADOW_HEIGHT = .85;
          var COLOR_CHOICES = ["red","green","blue","yellow"];
          var shadowFineness = 300;
          var box = new Path.Rectangle(view.bounds);//0,0,600+num(400),450+num(400));
          box.strokeColor = "black"
          box.fillColor = pluckRandom(COLOR_CHOICES);
          var amt = 5+num(30);
          var ratio = .2+Math.random()*.3;
          var steep = box.bounds.height / (amt*1.5)
          var lines = new Group();
          var size = box.bounds.width/amt;
          var diagonal = new Path();

          diagonal.strokeColor = "black";
          var dHeight = 0;
          var stepColor = pluckRandom(COLOR_CHOICES);
          for (var i = 0; i < amt; i++) {
            var vertical = new Group();
            var left = new Path();
            var right = new Path();
            right.strokeColor = left.strokeColor = "black";
            left.add(new Point(box.bounds.x+i*(size),dHeight));
            left.add(new Point(box.bounds.x+i*(size),box.bounds.y+box.bounds.height));
            diagonal.add(left.segments[0].point.x,dHeight);
            dHeight+= steep;
            left.add(new Point(box.bounds.x+(size*ratio)+i*(size),box.bounds.y+box.bounds.height));
            left.add(new Point(box.bounds.x+(size*ratio)+i*(size),dHeight));
            left.fillColor = stepColor;
            diagonal.add(left.segments[2].point.x,dHeight)
            lines.children.push(left);
            //lines.children.push(right);
          }
          diagonal.add(box.bounds.topRight.x,dHeight)
          diagonal.add(box.bounds.topRight)
          diagonal.closed = true;
          diagonal.fillColor = pluckRandom(COLOR_CHOICES);


          var shadow = new Path();
          shadow.add(box.bounds.topLeft);
          shadow.add(box.bounds.topRight);
          shadow.add(box.bounds.topRight+[0,box.bounds.height*SHADOW_HEIGHT]);


          shadow.closed = true;
          var offset = box.bounds.topRight+[0,box.bounds.height*SHADOW_HEIGHT];
          offset = shadow.getOffsetOf(offset);
          var remainingLine = shadow.length - offset;
          var liners = new Group();
          for(var i=0;i<shadowFineness;i++){
            var line = new Path();
            line.strokeColor = "black";
            var next = shadow.getPointAt(offset);
            line.add(next);
            line.add(next.x,0);
            offset+= (remainingLine/shadowFineness)
            liners.children.push(line)
          }

          var all = new Group({children:[box,shadow,liners,lines,diagonal]});
          all.bounds.center = view.bounds.center;
          all.rotate(20);
          all.fitBounds(view.bounds)
        }


        function onMouseDown(){
          generateStairs();
        }
---
