---
templateKey: work
title: Ring game
type: Candusen page
draft: true
date: 2020-07-29T15:49:21.649Z
paper_code:
  code: |-

    var text = new PointText(new Point(700,500));
    text.fontFamily = 'Suisse'
    text.fontSize = '2.8em'
    text.justification = 'center';
    text.fillColor = 'black';
    text.content = 'give it a go';

    var ring = new Path.Oval(900,200,100,100);
    ring.strokeWidth = 20;
    ring.strokeColor = prettyRaCo();
    //this function executes really fast over and over. so you can
    //make slight changes drop-motion style

    var hitB = new Path.Rectangle(0,0,800,100);
    var startB = new Path.Rectangle(0,window.innerHeight-100,800,100);
    startB.fillColor = 'black';
    hitB.fillColor = 'black';
    var above = false;
    var swingX=0;
    var swingY = 0;
    function onMouseMove(e){
    	t = ' '+e.delta.x+', '+e.delta.y
    	if(e.point.y<100)
    	{
    		if(above==false)
    			{	
    				if(Math.abs(e.delta.y)>60)
    					{
    					swingX = e.delta.x
    					swingY = e.delta.y
    					hitB.fillColor = 'pink';
    					text.content = 'inaccurate but fast enough!!'+t
    					if(Math.abs(e.delta.x)<20){
    						hitB.fillColor = 'yellow';
    						text.content = 'almost there!!'+t
    					}
    					if(Math.abs(e.delta.x)==0){
    					    hitB.fillColor = 'green';						
    						text.content = 'good you hit the hook!!'+t
    					}
    					}
    					if(Math.abs(e.delta.y)==(60) && Math.abs(e.delta.x)==0)
    					{
    						text.content = 'YOU RINGED IT!!!!!!!!!'+t
    						hitB.fillColor = 'blue';
    					}			

    				above = true;
    			}
    	}
    	else
    	{
    		above = false;
    	}
    }
    var string = new Path()
    string.add(945,0);
    string.add(955,0);
    string.add(ring.bounds.center+[10,-80]);
    string.add(ring.bounds.center-[10,80]);
    //string.strokeWidth = 15;
    string.fillColor = 'black'
    function onFrame(e){
    	if(ring)
    	ring.remove();
    	if(string)
    	string.remove();

    	ring = new Path.Oval(
    	//x
    	900,
    	//y
    	Math.sin(e.count/15)*400,
    	//width
    	100-Math.sin(e.count/15)*30,//+Math.cos(e.count/7)*40,
    	//height
    	40+Math.abs(Math.sin(Math.cos(e.count/30))*180)
    	);





    }
---
