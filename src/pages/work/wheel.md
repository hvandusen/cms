---
templateKey: work
title: Wheel
type: Candusen page
draft: true
date: 2020-07-29T15:51:54.845Z
date-finish: 2021-05-19T19:34:35.984Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1621452968/Screen_Shot_2021-05-19_at_3.35.55_PM_d8lwhl.png
paper_code:
  code: |
    var height = 200;
    var width = 200;
    var screenH = window.outerHeight;
    var screenW = window.outerWidth;

    var paddingX = (screenW- width*6)/2;
    var paddingY = (screenH- height*2)/2;
    var path = new Path([0,0]);
    path.add([10,10]);
    path.strokeWidth = .3;
    var last = new Point();

    var shape = new Path.Rectangle([paddingX,100],[200,300]);
    var shape2 = new Path.Rectangle([paddingX+width,100],[200,300]);
    var shape3 = new Path.Rectangle([paddingX+width*2,100],[200,300]);
    var shape4 = new Path.Rectangle([paddingX+width*3,100],[200,300]);
    var shape5 = new Path.Rectangle([paddingX+width*4,100],[200,300]);
    var shape6 = new Path.Rectangle([paddingX+width*5,100],[200,300]);
    var shape7 = new Path.Rectangle([paddingX,400],[200,300]);
    var shape8 = new Path.Rectangle([paddingX+width,400],[200,300]);
    var shape9 = new Path.Rectangle([paddingX+width*2,400],[200,300]);
    var shape10 = new Path.Rectangle([paddingX+width*3,400],[200,300]);
    var shape11 = new Path.Rectangle([paddingX+width*4,400],[200,300]);
    var shape12 = new Path.Rectangle([paddingX+width*5,400],[200,300]);

    var step = 0;
    var offset=0;
    var sixths = 256;

    function onMouseMove(event){
    	offset = Math.abs(event.point.x-screenW/2)/20;
    	step=event.point.y*1.5;
    	fillColors(step);
    };

    function fillColors(step){
      shape.fillColor = colorWheel(step);
    	shape2.fillColor= colorWheel(step+offset);//offset);
    	shape3.fillColor= colorWheel(step+offset*2);
    	shape4.fillColor= colorWheel(step+offset*3);
    	shape5.fillColor= colorWheel(step+offset*4);
    	shape6.fillColor= colorWheel(step+offset*5);
    	shape12.fillColor = colorWheel(step+offset*6);
    	shape11.fillColor= colorWheel(step+offset*7);//offset);
    	shape10.fillColor= colorWheel(step+offset*8);
    	shape9.fillColor= colorWheel(step+offset*9);
    	shape8.fillColor= colorWheel(step+offset*10);
    	shape7.fillColor= colorWheel(step+offset*11);
    }
---
