---
templateKey: work
title: Cheese
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640529782/Screen_Shot_2021-12-26_at_9.42.39_AM_rmxmvt.png
featured: false
draft: false
date: 2021-12-26T14:41:50.347Z
date-finish: 2021-12-26T14:41:50.354Z
paper_code:
  code: >
    var radius;

    var angle;

    var height;

    var sliceSize;


    function cheese(pos,size){
      var cheeseGroup = new Group();
      var topGuide = new Path.Circle(300,300,100);
      topGuide.scale(1,.3);


      var slice = [0,.5 + (.5*Math.random())].map(function(p){ return p*topGuide.length; });
      var top = new Path();
      top.fillColor = prettyRaCo();
      top.add(new Point(topGuide.getPointAt(slice[0])));
      var position = slice[0];
      while(position<slice[1]){
        top.add(new Point(topGuide.getPointAt(position)));
        position++;
      }
      top.add(new Point(topGuide.position));
      top.closed = true

      var bottom = top.clone();
      bottom.fillColor = prettyRaCo();
      bottom.position.y += 50;
      bottom.sendToBack();

      var rightSide = new Path();
      rightSide.fillColor = prettyRaCo();
      position = .5*topGuide.length;
      while(position<slice[1]){
        rightSide.add(new Point(topGuide.getPointAt(position)));
        position++;
      }
      var bottomPoints = rightSide.segments.map(function(s){ var n = [s.point.x,s.point.y+50]; return n}).reverse();
      rightSide.addSegments(bottomPoints)
      rightSide.closed = true;

      var innerRight = new Path({fillColor: prettyRaCo()});
      innerRight.addSegment(top.segments[top.segments.length-1]);
      innerRight.addSegment(top.segments[top.segments.length-2]);
      innerRight.addSegment(bottom.segments[bottom.segments.length-2]);
      innerRight.addSegment(bottom.segments[bottom.segments.length-1]);
      innerRight.closed = true;

      var innerLeft = new Path({fillColor: prettyRaCo()});
      innerLeft.addSegment(top.segments[0]);
      innerLeft.addSegment(top.segments[top.segments.length-1]);
      innerLeft.addSegment(bottom.segments[bottom.segments.length-1]);
      innerLeft.addSegment(bottom.segments[0]);
      innerLeft.closed = true;
      innerLeft.sendToBack();
      bottom.sendToBack();
      rightSide.bringToFront()
      top.bringToFront();
      cheeseGroup.children = [bottom,innerRight,innerLeft,rightSide,top]
      cheeseGroup.position = pos;
      var bounds = new Path.Rectangle(0,0,size[0],size[1]);
      bounds.position = cheeseGroup.position;
      cheeseGroup.fitBounds(bounds.bounds)
      cheeseGroup.scale(.9)
      return cheeseGroup;
    }

    var amt = 5;

    function cheeseGrid(){
      project.activeLayer.clear();
      var w = Math.floor(window.innerWidth / amt);
      var h = Math.floor(window.innerHeight / amt);
      for (var i = 0; i < amt; i++) {
        for (var j = 0; j < amt; j++) {
          cheese([(w/2+w*i),(h/2+h*j)], [w,h]);
        }
      }
    }


    function onMouseDown(){
      cheeseGrid();
    }


    cheeseGrid()
---
