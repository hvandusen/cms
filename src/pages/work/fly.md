---
templateKey: work
title: Fly
type: Candusen page
featured: false
draft: false
date: 2020-09-18T13:53:49.450Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600437309/Screen_Shot_2020-09-18_at_9.53.27_AM_japppo.png
paper_code:
  code: >-
    var lines = new Group();

    var dims = [20,20];

    var size = 60;

    for (var i = 0; i < dims[0]; i++) {
      lines.children.push(new Group());
      for (var j = 0; j < dims[1]; j++) {
        var newPath = new Path();
        newPath.add(i*size,j*size)
        lines.children[i].children.push(new Path());
      }
      lines.strokeColor = "black";
      lines.strokeWidth = 1;
    }


    function updateMainLine(e){
      var nextPt = Point.random()*size;
      var coords = new Point(e.point.x/view.bounds.width,e.point.y/view.bounds.height)*size
      var v = e.delta.normalize();
      lines.children.map(function(c,i){
        c.children.map(function(h,j){
          //h.add(h.segments[h.segments.length-1].point+v)
          h.add(new Point(i*size,j*size)+coords)
        })
      })
    }


    var guide = new Path();

    guide.strokeWidth = 2

    function onMouseMove(e){
      updateMainLine(e);
      guide.add(e.point)
    }


    function onMouseDown(e){
      updateMainLine(e);
      guide.add(e.point)
    }
---
