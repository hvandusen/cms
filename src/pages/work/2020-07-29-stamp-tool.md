---
templateKey: work
title: Stamp tool
type: Candusen page
date: 2020-07-29T15:53:42.827Z
paper_code:
  code: >
    /*

    function onMouseDown(e){

    }


    function onMouseMove(e){

    }


    function onMouseUp(e){

    }


    function onKeyPress(e){

    }


    function onFrame(e){

    }

    */


    //var heightMax =


    var widthMax = window.innerWidth/6;


    var rect = new Path.Rectangle(widthMax/2,50,widthMax,widthMax);

    rect.fillColor = "blue";

    var copy = rect.clone();

    copy.position += [0,widthMax*2]

    Path.prototype.intersect = Path.prototype.intersect;


    var circle = new Path.Circle(-3*widthMax,widthMax,widthMax/2);

    circle.fillColor = "red";


    var result = new Path();


    function onMouseMove(e){
      circle.position = e.point;
    }


    function onMouseDown(e){
      console.log("rect",circle.intersects(rect).type," copy ",circle.intersects(copy).type);
      if(circle.intersects(rect) && circle.intersects(copy)){
        //circle = new Path.Circle(e.point,100);
        //circle.fillColor = "red";
        return
      }
      console.log("made it")
      var tempPos = copy.position;
      result.remove();
      result = (circle.intersects(rect) ? rect : copy).subtract(circle)
      result.strokeColor = "black";
      result.fillColor = null;
      result.position = [widthMax*5,400];
      circle.remove();
      circle = result.clone();
      circle.fillColor = "red"
      circle.position = e.point;
      copy.remove();
      copy = result.clone();
      copy.position = tempPos;
      copy.fillColor = "blue"
    }
---
