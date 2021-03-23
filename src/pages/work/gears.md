---
templateKey: work
title: Gears
type: Candusen page
date: 2020-07-06T04:47:02.993Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431835/Screen_Shot_2020-09-17_at_6.54.42_PM_jzq0by.png
paper_code:
  code: |
    var path;// = new Path();
    var gears = [];


    function onMouseDown(event){
    	path = new Path();
    	path.strokeColor = prettyRaCo();
    	path.strokeWidth = 6;

    }

    function onMouseDrag(event){
    	path.add(event.point);
    //points.push(event.point);
    }

    function onMouseUp(event){
    	//path.add(points);
    	//path.closed = true;
    	if(path.segments.length>0)
    	gear(path.segments);
    	path.smooth();
    }

    function gear(gearPath){

    	var circle = new Path.Circle(new Point(0,0), new Size(20,20));
    	circle.fillColor = prettyRaCo();
    	gears.push({
    		loc: circle,
    		points: gearPath,
    		len: gearPath.length
    	});
    	//console.dir(gears.);

    }

    function onFrame(event){
    if(event.count<5000)
    	for(var i = 0;i<gears.length;i++){		
    		gears[i].loc.position = gears[i].points[ event.count%gears[i].len].point;
    	}
    }

    //default message to put in the thing

    	//var circle = new Path.Circle(point,new Size(60,60));
interactivity:
  - click-and-move
---
