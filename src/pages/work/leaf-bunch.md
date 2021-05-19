---
templateKey: work
title: Leaf bunch
type: Candusen page
draft: true
date: 2020-07-29T15:44:06.315Z
date-finish: 2021-05-19T19:48:35.409Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1621453760/Screen_Shot_2021-05-19_at_3.49.10_PM_hjhg4w.png
paper_code:
  code: >
    var spot;

    var output;

    var v;

    var lf = tree(4+Math.random()*4, view.center+[0,200],15+Math.random()*90);

    console.dir(lf)

    var newp;

    var leaff ;


    var ctttr = view.center + [0,100]

    //leaf(50,ctttr);


    //leaf(new Point(200,200),new Point(1,0	),100);

    var direc = new Point(2,2);


    var nextThing = new Path();

    var shapps;

    var leafs = [];



    function onFrame(e){


    if(lf)

    {
    	base = lf.children[lf.children.length-1].segments[0].point;
    		lf.children.map(function(h,k){
    			if(k < lf.children.length){
    				//if((Math.sin(e.count*.4/k*.7)/19,h.segments[Math.floor(h.segments.length/2)].point).x);

    				h.rotate(Math.sin(e.count*.4/k*.7)/19,base)

    				//root = roots[k];
    			//	root.rotate(Math.sin(e.count*.4/k*.7)/19,base);
    			}
    			//h.rotate(Math.sin(e.count*.4/k*.7)/19,h.segments[Math.floor(h.segments.length/2)].point)//10*Math.sin((e.count*i*k)),f.base);
    		});
    }

    }


    function onMouseMove(e){
    	project.activeLayer.clear();
    	lf = tree(4+Math.random()*4, e.point,15+Math.random()*90);
    	return;
    	if(leafs.length===0)
    	return;
    	//var ranFlow = leafs[Math.floor(Math.random()*leafs.length)];
    	//var tempCenter = ranFlow.bounds.center;
    	//var nextPick = Math.floor(Math.random()*leafs.length);
    	//ranFlow.bounds.center = leafs[nextPick].bounds.center;
    	//leafs[nextPick].bounds.center = tempCenter;
    	leafs.map(function(f,i){
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


    function onMouseDown(e){
    	project.activeLayer.clear();
    	lf = tree(4+Math.random()*4, e.point,15+Math.random()*90);
    	//lf = tree(4+Math.random()*4, view.center,15+Math.random()*90);
    }

    function ribbing(path){


    }

    function lineToLeaf(path,thickness){
    	var veinSkip = 20;
    	var rootAngle = false;
    	outGroup = new Group();
    	veinGroup = new Group();
    	output = new Path({segments: [path.segments[0].point]});
    	thisThickness = path.length*(.35)+.1*Math.random();
    	root = path.clone();
    	root.smooth();
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
    	//leaf veins!!!!
    	for(var i =0;i<Math.floor(path.length+1);i+=2){
    		spot = path.getPointAt(i);
    		if(nextSpot = path.getPointAt(i+2)){
    			v = (nextSpot-spot);
    	if(i%veinSkip === 0 ){
    		p2 = new Point(spot+v*200);
    		vein = new Path([spot,p2]);
    		if(rootAngle)
    			vein.rotate(45,spot)
    		else {
    			vein.rotate(-45,spot)
    		}
    		veinEnd = output.getIntersections(vein)[0].point
    		rootAngle = !rootAngle;
    		finalVein = new Path([spot]);
    		toCurve = new Point(veinEnd-spot)/2;
    		//v.rotate(Math.random())
    		if(rootAngle)
    		toCurve.rotate(-32,spot);
    		else {
    		toCurve.rotate(32,spot);
    		}
    		finalVein.add(spot+toCurve+Point.random()*3);
    		finalVein.add(veinEnd);
    		finalVein.smooth();
    		finalVein.strokeColor = 'black';
    		finalVein.strokeWidth = .5;
    		veinGroup.children.push(finalVein);
    	}}
    }
    	output.fillColor = prettyRaCo();
    	darkness=200;
    	colorScheme = Math.floor(Math.random()*1536);
    	root.strokeColor='black';
    	root.bringToFront();
    	outGroup.children.push(output);
    	outGroup.children.push(root);
    	outGroup.children.push(veinGroup);
    	return outGroup;//utput;
    }


    function createLeafPath(pt){
    	var newp,adder;
    	adder = new Point(0,-150);
    	adder.angle = -90
    	newp = new Path();
    	newp.add(pt)
    	adder.angle += 50*Math.random()-25;
    	newp.add(newp.segments[0].point+adder);
    	//adder.angle =-40-(Math.random()*180)
    	adder.angle += 30*Math.random()-15;
    	newp.add(newp.segments[1].point+adder*(.5+Math.random()*.5));
    	newp.smooth();
    	return newp;
    }



    function tree(leafs, pt,thickness){
    	var leafG = new Group();
    	trunk = new Path.Rectangle(pt.x-10,pt.y-10,20,view.bounds.height-pt.y);
    	colorScheme = Math.floor(Math.random()*1536);
    	darkness = 110;
    	for(var i =0;i<leafs;i++){
    		newp = createLeafPath(pt);
    		leaff = lineToLeaf(newp,thickness);
    		//colorWheel(colorScheme+Math.random()*340);//prettyRaCo();
    		leafG.children.push(leaff);
    	}
    	rotateAmt = Math.random()*180;
    	var stem = new Path();
    	stem.add(pt-[0,1]);
    	stem.strokeColor = 'green';
    	stem.strokeWidth = 2;
    	for(var i=0;i<3;i++){
    		v = new Point(Math.random()*15-7.5,100);
    		stem.add(stem.segments[i].point+v);
    		//stem.insert(stem.segments[i].point+v-[2+Math.random()*4,0]);
    	}
    	leafG.children.push(stem);
    	//leafG.rotate(Math.random()*50-25);
    	leafG.base = pt;
    	if(window.innerWidth>480)
    	leafG.scale(2)
    	//leafG.bounds.top = 50;
    	//leafG.position.x = view.center.x;
    	return leafG;
    }
---
