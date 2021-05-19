---
templateKey: work
title: Plant
type: Candusen page
draft: true
date: 2020-07-29T15:47:43.472Z
date-finish: 2021-05-19T20:04:42.284Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1621453343/Screen_Shot_2021-05-19_at_3.42.11_PM_vr60uc.png
paper_code:
  code: >-
    var spot;

    var output;

    var v;


    var newp;

    var leaff ;

    function flower(leafs, pt,thickness){
    	var flowerG = new Group();
    	trunk = new Path.Rectangle(pt.x-10,pt.y-10,20,view.bounds.height-pt.y);
    	//trunk.fillColor = 'brown';

    	adder = new Point(0,-150);
    	adder.angle = -90
    	colorScheme = Math.floor(Math.random()*1536);
    	for(var i =0;i<leafs;i++){
    		adder.angle =-90;
    		newp = new Path();
    		newp.add(pt)//+[0,4*i]);
    		adder.angle += 50*Math.random()-25;
    		//newp.add(pt+[0,4*i]);
    		newp.add(newp.segments[0].point+adder);
    		//adder.angle =-40-(Math.random()*180)
    		adder.angle += 30*Math.random()-15;
    		newp.add(newp.segments[1].point+adder*(.5+Math.random()*.5));
    		newp.smooth();
    		leaff = lineToLeaf(newp,thickness);
    		leaff.fillColor = colorWheel(colorScheme+Math.random()*300);//prettyRaCo();
    		flowerG.children.push(leaff);
    	}
    	rotateAmt = Math.random()*180;
    	flowerG.children.map(function(e,i){
    		//i.rotate(rotateAmt);
    	})
    	var stem = new Path();
    	stem.add(pt-[0,1]);
    	stem.strokeColor = 'green';
    	stem.strokeWidth = 2;
    	for(var i=0;i<3;i++){
    		v = new Point(Math.random()*15-7.5,100);
    		stem.add(stem.segments[i].point+v);
    		//stem.insert(stem.segments[i].point+v-[2+Math.random()*4,0]);
    	}
    	flowerG.children.push(stem);
    	flowerG.rotate(Math.random()*50-25);
    	flowerG.base = pt;
    //	flowerG.scale(.4)
    	return flowerG;
    }

    var ctttr = view.center + [0,100]

    //flower(50,ctttr);


    //leaf(new Point(200,200),new Point(1,0	),100);

    var direc = new Point(2,2);


    var nextThing = new Path();

    var shapps;

    var flowers = [];


    function onMouseDown(e){
    	flowers.push(flower(4+Math.random()*4, e.point,15+Math.random()*90));
    	return;
    	draw1 = !draw1;
    	if(nextThing.segments.length === 0){
    		nextThing = new Path(e.point);
    	}
    	else if(nextThing.segments.length === 1){
    		nextThing.add(e.point);
    	}
    	else {
    		nextThing.add(e.point);
    		nextThing.smooth();
    		shapps = lineToLeaf(nextThing,30);
    		shapps.fillColor = prettyRaCo();
    		nextThing = new Path()
    	}
    }

    function onFrame(e){
    	if(flowers.length===0)
    	return;
    	flowers.map(function(f,i){
    		f.children.map(function(h,k){
    			if(k<f.children.length-1)
    			h.rotate(Math.sin(e.count/k)/10,f.base)//10*Math.sin((e.count*i*k)),f.base);
    		});
    	});
    }


    function onMouseMove(e){
    	return;
    	if(flowers.length===0)
    	return;
    	//var ranFlow = flowers[Math.floor(Math.random()*flowers.length)];
    	//var tempCenter = ranFlow.bounds.center;
    	//var nextPick = Math.floor(Math.random()*flowers.length);
    	//ranFlow.bounds.center = flowers[nextPick].bounds.center;
    	//flowers[nextPick].bounds.center = tempCenter;
    	flowers.map(function(f,i){
    		num = (i%2===0? 1 : -1);
    		//f.rotate(num*.5*Math.sin(.1*e.count/100),f.children[f.children.length-1].getPointAt(e.count%f.children[f.children.length-1].length))
    		//f.position += Point.random()-[.5,.5];
    		//f.children[Math.floor(Math.random()*f.children.length)].rotate(Math.sin((e.count)/10),f.base);
    		f.children.map(function(h,k){
    			if(k<f.children.length-1)
    			h.rotate(-.25+Math.random()*.5,f.base)//10*Math.sin((e.count*i*k)),f.base);

    		})
    	})
    }



    function lineToLeaf(path,thickness){
    	output = new Path({segments: [path.segments[0].point]});
    	thisThickness = path.length*(.35)+.1*Math.random();
    	for(var i =0;i<Math.floor(path.length+1);i+=2){
    		spot = path.getPointAt(i);
    		if(nextSpot = path.getPointAt(i+2)){
    			v = (nextSpot-spot);
    			v.length = Math.abs(Math.sin(3*i/path.length)*thickness);
    			v.angle += 90;
    			output.add(new Point(spot+v));
    			v.angle += 180;
    			output.insert(0,new Point(spot+v));
    		}
    		else {
    			v.angle +=90;
    			v.length *= path.length/thickness*.31;
    			//v.length *= path.length*.01800;
    			output.insert(0,new Point(spot+v));
    			output.simplify();
    			output.closed = 'true';
    		}
    	}
    	return output;
    }
---
