---
templateKey: work
title: Ellsworth painting generator
type: Candusen page
date: 2020-07-29T15:25:04.765Z
paper_code:
  code: |
    var path;
    var rects = [];

    	var p = new Point(0,0);
    	var s = new Size(view.size.width/3,view.size.height/2);
    	rects = getBounds(p,s);

    window.onresize = function(){
    	p = new Point(0,0);
    	s = new Size(view.size.width/3,view.size.height/2);
    	rects = getBounds(p,s);
    };

    function getBounds(p,s){
    		rectangles = [];
    		for(var i=0;i<6;i++){
    		p = [s.width*(i%3), (i<3?0:s.height)];
    		rectangles.push(new Shape.Rectangle(p,s));
    		}
    		var swap = rectangles[3];
    		rectangles[3] = rectangles[5];
    		rectangles[5] = swap;
    		return rectangles;
    	}

    function onMouseMove(event) {
    	drawShape();
    }
    function onMouseDown(ev) {
    	drawShape();
    };

    function drawShape(){
    	project.activeLayer.removeChildren();
    	path = new Path();
    	rects.map(function(e,i){
    		makePoint(e,path);
    	});
    	number = num(3);
    	path.fillColor = ['red','blue','green'][num(3)];
    	path.smooth();
    	path.scale(.5);
    	randomRemove = num(3);
    	for(var i=0;i<randomRemove;i++){
    		path.removeSegment(num(6-i));
    	}
    	path.closed = true;
    }//end draw shape

    function makePoint(box,path){
    	loc = box.bounds;
    	//add random width within box from it's offset
    	path.add(new Point(num(loc._width)+loc._x,num(loc._height)+loc._y));
    }
---
