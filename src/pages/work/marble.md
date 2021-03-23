---
templateKey: work
title: Marble
type: Candusen page
draft: true
date: 2020-07-29T15:43:45.491Z
paper_code:
  code: >

    var container = new Path.Rectangle(view.bounds)//

    //container.strokeColor = 'black'//prettyRaCo()

    dropSize = 10;

    dSize = 10;

    reacted = 300;

    totalArea = reacted*reacted

    totalInk = 1;

    x = 100

    y = 100

    jiggle = 2

    piv = [Math.random()*800,Math.random()*800]

    sides = 20

    bounds = {}



    var paintOnSheet = 0;

    var paintAmt=20;

    var path = new Path();

    path.strokeColor = 'black';

    var thcknss = 1;

    var speed = 1;

    var shapes =  new Group();

    var boxes =  new Group();



    var vect = new Path();

    var v1 = new Point(100,100)

    var v = new Point(0,0) - new Point(dropSize,dropSize)


    var segmentss = [];


    function onMouseDown(event){
    	taken = false;
    	for(var i = 0;i<shapes.children.length;i++){
    		if(shapes.children[i].hitTest(event.point)){
    			taken = true;
    		}

    	//console.dir(shapes);
    	}
    	if(taken == false)
    		drop(event.point)

    }

    v.strokeColor = 'black'


    function randomCircle(point){
    	p = new Point(point.x,point.y)
    	var path = new Path();
    	for(var i=0;i<sides;i++){
    		path.add(p+v+[Math.random()/10,Math.random()/10])
    		v.angle += 360/sides+Math.random();
    		vect.strokeColor = prettyRaCo();
    		//v = new Path(vect)
    	}
    	path.closed=true;
    	path.fillColor = prettyRaCo();
    	path.strokeWidth = 5
    	path.strokeColor = 'white'
    	//path.smooth();
    	return path;
    }


    function drop(point){
    	//paintOnSheet ++;
    	shapes.addChild(randomCircle(point));
    	//console.dir(shapes);
    }



    function wiggle(point){
    	point.point += [Math.random()*jiggle-(jiggle/2),Math.random()*jiggle-(jiggle/2)]
    }


    function react(shape){
    	size = (shape.bounds.size.width+shape.bounds.size.height)/2
    	b = 1+(reacted*((paintAmt-paintOnSheet)/paintAmt)-size)/(reacted)
    	//shape.scale(1+.03*(reacted*1-shape.bounds.size.width)/(reacted));
    	//shape.scale(1+.02*(reacted*1-size)/(reacted));
    	shape.scale(1+.01*(totalArea-shape.area)/totalArea)-(.2)*(paintAmt-paintOnSheet)/paintAmt
    	shape.opacity = .7+ ((reacted-size)/reacted)*.3
    	if(shape.getIntersections(container).length>0){
    		p = container.getNearestPoint(shape.bounds.center)
    		shape.bounds.center -= (p-shape.bounds.center)*.01
    		c = new Path.Circle(p,10)

    	}
    	var min = 1000
    	//for each other shape, subtract the vector from their centers from each segment
    	for(var i = 0;i<shapes.children.length;i++){
    		sh = shapes.children[i]
    		if(shape!=sh)
    		{

    			//st.angle+=(Math.random()*180)
    			//if(st.intersects(sh))
    			if(shape.getIntersections(sh).length>0)
    				sh.segments.forEach(function(y,x){
    				vect = shape.bounds.center-y.point
    				amt = (vect.length*vect.length)+5*(vect.length)
    				thickness = sh.area/totalArea
    				thickness2 = shape.area/totalArea
    				if (vect.length<min){
    					min = vect.length
    				}
    				y.point -= vect*(1/vect.length)
    				sh.bounds.center -= (shape.bounds.center-sh.bounds.center)*.0001
    				//p = sh.getNearestPoint(shape.bounds.center)
    				//y.point -= (p-y.point)/10000
    				//shape.bounds.center -= (p-shape.bounds.center)*.1


    			});


    		}
    	}
    }


    function thickness(path){
    	return inkAmt/path.area
    }


    function onFrame(event){
    	if(project.activeLayer.children)
    	//each shape
    	shapes.children.forEach(function(drop,i){
    		drop.smooth();
    		react(drop)
    	});
    }
---
