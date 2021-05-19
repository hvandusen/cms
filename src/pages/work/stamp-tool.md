---
templateKey: work
title: Stamp tool
type: Candusen page
date: 2020-07-29T15:53:42.827Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431835/Screen_Shot_2020-09-17_at_6.56.49_PM_rd08h4.png
paper_code:
  code: >
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
      if(circle.intersects(rect) && circle.intersects(copy)){
        //circle = new Path.Circle(e.point,100);
        //circle.fillColor = "red";
        return
      }
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
