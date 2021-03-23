---
templateKey: work
title: Blinds
type: Candusen page
date: 2020-07-05T20:13:10.271Z
description: It's supposed to look like window blinds.
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431844/Screen_Shot_2020-09-17_at_6.44.36_PM_vs6zmv.png
paper_code:
  code: >

    var blinds = function(amount){
    	var width = view.bounds.width / (amount+2);
    	var blindArray = [];
    	var height = view.bounds.height -width;
    	var colorW = Math.random()*1536;
    	var colorOffset = Math.random()*800+368;
    	for(var i=0;i<amount;i++){
    		var color = colorWheel(colorW)//tinycolor(colorWheel(i));
    		var current = new Path.Rectangle({
    			point: [width+i*width,view.bounds.height *0],
    			size: [width,height],
    			fillColor: color,//'#'+color.toHex(),
    			shadowColor: colorWheel(colorW+colorOffset),//'#'+color.complement().toHex(),
    			shadowBlur: 150,
    			//shadowOffset: new Point(1500,100)
    		});
    		blindArray.push(current);
    		blindArray[i].dr = 0;
    		blindArray[i].wheelId = i;
    	}
    	return blindArray;
    }

    var myBlinds = blinds(20);

    var eventCount = 0;

    function onFrame(event){
    	myBlinds.map(function(e,i){
    		 e.shadowOffset = 15*Math.sin(((1+i)/100)*event.count)
    		e.shadowBlur = e.shadowBlur+Math.cos(((1+i)/100)*event.count)
    });

    };


    function onMouseDown(){
    	eventCount = 0
    	project.activeLayer.clear();
    	myBlinds = blinds(20);
    }
---
