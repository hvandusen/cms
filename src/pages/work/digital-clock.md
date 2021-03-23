---
templateKey: work
title: Digital clock
type: Candusen page
draft: true
date: 2020-07-29T15:23:49.527Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600434043/Screen_Shot_2020-09-18_at_9.00.20_AM_rka7gc.png
paper_code:
  code: >
    var currentShape = null;

    var ratio = 1;

    var still = true;

    var shapes;

    var points = [];

    var count = 0;

    var q = console;

    var cunt = Math.floor(Math.random()*1536);

    var speed = 1+Math.floor(Math.random()*3)

    var difference = 100+Math.random()*100

    if (!paper.Item.prototype.setRampPoint) {
         paper.Item.prototype.setRampPoint = function () {};
    }

    function frame(){
    	time = Date().split(' ')[4].split(':')
    	hours = time[0]
    	minutes = time[1]
    	setClock(hours,minutes)
    }

    var background;

    background = new Path.Rectangle([0,0],[view.bounds.width+1000,view.bounds.height+1000]);


    background.opacity = .6
    		background.fillColor = {
    		gradient:{
    			stops:[[colorWheel(cunt),'0'],[colorWheel(cunt+difference),'.5'],[colorWheel(cunt+difference),'1']]},
    			origin: [0,Math.random()*screen.availHeight],
    			destination: [screen.availWidth+150,Math.random()*screen.availHeight]
    					}
    function setBgnd(){
    	cunt = Math.floor(Math.random()*1536);
    	speed = 1+Math.floor(Math.random()*3)
    	difference = 100+Math.random()*100
    	background = new Path.Rectangle([0,0],[view.bounds.width+1000,view.bounds.height+1000]);

    background.opacity = .6
    		background.fillColor = {
    		gradient:{
    			stops:[[colorWheel(cunt),'0'],[colorWheel(cunt+difference),'.5'],[colorWheel(cunt+difference),'1']]},
    			origin: [0,Math.random()*screen.availHeight],
    			destination: [screen.availWidth+150,Math.random()*screen.availHeight]
    					}
    }

    new Layer()

    project.importSVG("/static/img/clock.svg",function(files){
    		layer = project.activeLayer.children
    		layer.position = view.center;

    		//layer.activate()

    		project.activeLayer.children[0]
    		for(c in files.children){
    			points.push(new Point(files.children[c].bounds.center))
    			files.children[c].fillColor = prettyRaCo();
    			files.children[c].visible = false;
    					}
    		files.children[files.children.length-1].visible = true;
    		files.children[files.children.length-2].visible = true;
    		project.activeLayer.children[0].position = view.center+[-70,0]
    		textH = project.activeLayer.children[0].bounds.height
    		layer[0].scale(.16*window.innerHeight/textH)
    		frame();
    		});

    window.onresize = function(event) {
    	textH = project.activeLayer.children[0].bounds.height
    	layer[0].scale(.25*window.innerHeight/textH)
    	project.activeLayer.children[0].position = view.center +[-70,0]
    }


    setInterval(function(){
    	time = Date().split(' ')[4].split(':')
    	hours = time[0]
    	minutes = time[1]
    	setClock(hours,minutes)
    },1000);


    var currentMin;

    var numPatterns = {
    	'0' :[0,1,2,4,5,6],
    	'1' :[0,1],
    	'2' :[2,0,3,5,4],
    	'3' :[0,1,2,3,4],
    	'4' :[0,1,3,6],
    	'5' :[1,2,3,4,6],
    	'6' :[1,2,3,4,5,6],
    	'7' :[0,1,2],
    	'8' :[0,1,2,3,4,5,6],
    	'9' :[0,1,2,3,6]
    }

    function setClock(hours,minutes){
    	if(hours>12)
    	hours = hours-12
    	if(hours == 0)
    	hours = 12
    	if(hours.length == 1){
    		hours.insert(0,0)
    	}
    	h = hours.toString();
    	m = minutes.toString();
    	//project.activeLayer.children[0].visible = false;
    	kids = project.activeLayer.children[0].children
    	for(var i = kids.length-3;i> -1;i--){
    		kids[i].visible = false;
    	}

    	for(i in numPatterns[h[0]]) //digit 1; fill panels that match time digit
    		{
    		dig1 = h[0]
    		kids[7+numPatterns[h[0]][i]].visible = true;// fillColor = prettyRaCo();
    		}
    	for(i in numPatterns[h[1]])
    		{
    		kids[14+numPatterns[h[1]][i]].visible = true;//.fillColor = prettyRaCo();
    		}
    	for(i in numPatterns[m[0]])
    		{
    		kids[numPatterns[m[0]][i]].visible = true;//.fillColor = prettyRaCo();
    		}
    	for(i in numPatterns[m[1]])
    		{
    		kids[21+numPatterns[m[1]][i]].visible = true;//.fillColor = prettyRaCo();
    		}
    }
---
