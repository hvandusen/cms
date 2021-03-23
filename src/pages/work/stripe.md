---
templateKey: work
title: Stripe
type: Candusen page
draft: true
date: 2020-07-29T15:55:56.589Z
paper_code:
  code: >
    /*

    function onMouseDown(e){

    }




    function onMouseUp(e){

    }


    function onKeyPress(e){

    }


    function onFrame(e){

    }

    */


    var shapes = new Group();

    var drawing = true;

    var shapeSize = 30;

    var shapeSpacing = 20;

    var speed = 5;

    var rotateFidelity = 1;

    var path = new Path();

    function onMouseDown(e){
      if(drawing){
        var attachAt = 100;//path.getPointAt((shapes.children.length*(path.length/shapeSize)) % path.length)
        var newShape = new Path.RegularPolygon(path.getPointAt(attachAt), 3+num(3),shapeSize);
        newShape.data.offset = attachAt;
        newShape.data.angle = path.getNormalAt(attachAt).normalize().rotate(-90).angle
        newShape.fillColor = ["red","green","blue"][num(3)]
        shapes.children.push(newShape)
      }
      drawing = true;
    }


    path.strokeColor = "black"


    function onMouseMove(e){
      if(drawing)
        path.add(e.point)
    }


    function onFrame(e){
      shapes.children.filter(function(child){
        //var current = child.getIntersections(path)[0].point;
        //var offset = Math.max(path.getOffsetOf(current));
        child.data.offset += speed;
         child.data.offset = child.data.offset % path.length;

        child.position = path.getPointAt(child.data.offset);
        child.data.newAngle = path.getNormalAt(child.data.offset).normalize().rotate(-90).angle;
        child.rotate(child.data.newAngle -child.data.angle);
        //if((child.data.newAngle -child.data.angle)>rotateFidelity)
          //child.rotate(rotateFidelity);
        //else{
          //child.rotate(-rotateFidelity);
        //}
        child.data.angle = child.data.newAngle;
      })
      //if(shapes.children.length)
    }
---
