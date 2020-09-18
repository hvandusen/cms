---
templateKey: work
title: Worm
type: Candusen page
date: 2020-07-29T15:52:27.222Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431836/Screen_Shot_2020-09-17_at_6.55.48_PM_iycuhd.png
paper_code:
  code: >
    var moveOffset = 0;

    var dots = [];

    var ff = function(i,total){
    	var x = (i/total);
    	var unit = x*window.innerHeight+Math.sin(moveOffset+x*30)*100;
    	return unit;
    }

    function lineGroup(len){
    	this.group =  new Group();
    	for(var i=0;i<len;i++){
    		var l = new Path.Line({
    			segments: [[i*(window.innerWidth/len),0],[i*(window.innerWidth/len),window.innerHeight]],
    			strokeWidth: 0,
    			strokeColor: 'white',
    			shadowColor: 'white',
    			shadowBlur: 1
    		});
    		this.group.children.push(l);
    		dots.push(new Path.Circle(i*(window.innerWidth/len),ff(i,len),20));
    		dots[i].fillColor =colorWheel(i*10);
    		//l.rotate(Math.random()*5)
    	}
    	return this;
    }

    var grr = new lineGroup(200);


    function drawSin(func){
    	var total = grr.group.children.length;
    	grr.group.children.map(function(e,i){
    		//new Path.Circle(e.position.x,func(i),2).fillColor='red';
    		dots[i].position = [e.firstSegment.point.x,ff(i,total)]//e.getPointAt(500*Math.sin(.2*moveOffset+(i/20))+e.length*((i+1)/total));//new Point(i*(window.innerWidth/total),ff(i,total));
    		//new Path.Circle(i*(window.innerWidth/total),func(i,total),3).fillColor = 'red'

    	})
    }

    drawSin(ff);


    function onFrame(e){
    	moveOffset+=.03+Math.sin(e.count/70)*.01;
    	drawSin(ff);
    }
---
