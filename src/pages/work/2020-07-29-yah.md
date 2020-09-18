---
templateKey: work
title: Yah
type: Candusen page
date: 2020-07-29T15:54:10.672Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600436246/Screen_Shot_2020-09-18_at_9.37.05_AM_bbam3e.png
paper_code:
  code: |
    var widthMax = window.innerWidth/6;
    var rect,copy,circle,result;
    rect = new Path.Rectangle(widthMax/2,50,widthMax,widthMax);
    rect.fillColor = "blue";
    copy = rect.clone();
    copy.position += [0,widthMax*2]
    circle = new Path.Circle(-3*widthMax,widthMax,widthMax/2);
    circle.fillColor = "red";
    result = new Path();

    function onMouseMove(e){
      circle.position = e.point;
    }

    function onMouseDown(e){
      if(circle.intersects(rect) && circle.intersects(copy)){
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
