---
templateKey: work
title: Eye
type: Candusen page
date: 2020-07-29T15:39:50.583Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600434119/Screen_Shot_2020-09-18_at_9.01.35_AM_u1hkmx.png
paper_code:
  code: >-
    var window = project.view.bounds;

    var center = new Point(400,200);

    var shape = new Path.Circle(new Point(0,window.height/4)+center,new Size(window.width*.65,(window.height*.65)));

    var innerShape = new Path.Circle(new Point(window.width/4,window.height/4)+center,new Size(window.width*.40,(window.height*.40)));

    var inShape = new Path.Circle(new Point(window.width/2.8,window.height/3.5)+center,new Size(window.width*.18,window.height*.2));

    var step = 0;

    var r=255;

    var g = 0;

    var b = 0;

    var phase = 0;

    var eyeShakeWidth = 20;

    //var clicked=false;


    function onMouseMove(event){

    inShape.position.x+= event.delta.x/1.5;

    shape.position.x-= event.delta.x;

    center+= event.delta/10;

    }

    var temp = "";

    function onMouseDown(event){
    	temp = r;
    	r=b;
    	b=g;
    	g=temp;
    	phase+=2
    }


    function onFrame(event){

    if(event.count%2==0)
    	shape.fillColor = nextColor();

    }

    var stringOuter ="";

    var stringMiddle ="";

    var stringInner ="";

    function nextColor(){
    	switch(phase%6){
    		case 0:
    		g++;
    		break;
    		case 1:
    		r--;
    		break;
    		case 2:
    		b++;
    		break;
    		case 3:
    		g--;
    		break;
    		case 4:
    		r++;
    		break;
    		case 5:
    		b--;
    	}

    	stringOuter = "rgb("+r+","+g+","+b+")";
    	stringMiddle = "rgb("+b+","+r+","+g+")";
    	stringInner = "rgb("+g+","+b+","+r+")";
    	innerShape.fillColor = stringMiddle;
    	inShape.fillColor = stringInner;
    	step++;
    	if(step == 255)
    		{
    		phase++;
    		step = 0;
    		}
    		return stringOuter;
    }
---
