---
templateKey: work
title: Doodle
type: Candusen page
featured: false
draft: false
date: 2020-09-18T13:48:24.339Z
description: This is a doodle I used to do in class in high school
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600437058/Screen_Shot_2020-09-18_at_9.48.14_AM_baqamo.png
paper_code:
  code: >-
    function doodle(points, uni, repeat){
    	if(repeat == 0)
    		return;
    	totalCount++;
    	var box = new Path(points);
    	//box.strokeWidth = 4;
    	//box.strokeColor = 'black';
    	box.closed = true;
    	var uniform = uni;
    	var diags = diagonals(box);
    	var bisections = bisectAndColor(box,diags, uni);

    	var newPoints = bisections.map(function(e){
    		return new Point(e.segments[1].point);
    	});

    	doodle(newPoints,(stationary ? !uni: !uni),repeat-1)

    }


    var stationary = true;


    var totalCount = 0;

    function bisectAndColor(box,diags,regular){
    	var bs = [];//[b1,b2,b3,b4];
    	var fs=[];
    	var outerFs = [];
    	var group = new Group();
    	var offset = [];
    	if(regular==true)
    		offset = [.75,.25]
    	else{
    		var ran = Math.abs(Math.cos(totalCount/3000));//Math.abs(Math.cos(totalCount/1000))//

    		offset = [ran,1-ran]
    	}
    	//get point at percentage of line segment
    	var dLength = diags[0].length;
    	for(var b =0;b<4;b++){
    		bs[b] = new Path({
    			//this line draws line from corner to the diagonal counterclockwise from it.. sry
    			'segments': [box.segments[b].point,diags[(1+b)%2].getPointAt(dLength*offset[[1,0,0,1][b]])]})
    		fs[b] = new Path({'segments':bs[b].segments})
    		fs[b].add([window.innerWidth*.5,window.innerHeight*.5]);
    		fs[b].fillColor = colorWheel(totalCount+Math.abs(Math.cos(totalCount/1000)*384)*b)//prettyRaCo();
    		outerFs[b] = new Path({'segments':bs[b].segments})
    		outerFs[b].add(box.segments[(b+1)%4]);
    		outerFs[b].fillColor = colorWheel(192+totalCount+384*b)//prettyRaCo();
    	}
    		group.children = bs;
    	return group.children;
    }



    function diagonals(path){
    	var diag_1,diag_2;
    	diag_1 = new Path();
    	diag_2 = new Path();
    	diag_1.add(path.segments[0].point,path.segments[2].point)
    	diag_2.add(path.segments[1].point,path.segments[3].point)
    	return [diag_1,diag_2]
    }


    function generateBox(topMargin){
    	return [new Point(0,0),new Point(window.innerWidth,0),new Point(window.innerWidth,window.innerHeight),new Point(0,window.innerHeight)];
    }


    function onMouseDown(){
    	stationary = !stationary;
    	var pts = generateBox(.1);
    	if(stationary)
    		doodle(pts, false,8)
    }


    var pts = generateBox(.1);

    doodle(pts, false,5)


    function onFrame(e){
        if(e.count %3 == -120)
            return;
    	project.activeLayer.clear();
    	var pts = generateBox(.1);
    	doodle(pts, false,5)

    }
---
