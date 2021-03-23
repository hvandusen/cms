---
templateKey: work
title: Needles
type: Candusen page
date: 2020-07-29T15:44:27.158Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431840/Screen_Shot_2020-09-17_at_6.51.37_PM_l3suxl.png
paper_code:
  code: >
    var lines = new Group();

    var num = 0;

    var range = 3;

    var symb;


    function draw(){
    	rotate = (Math.random()*6)-3
    	project.activeLayer.children = []

    	for (var i=0;i<range;i++){
    		var path = new Path([[window.innerWidth*.1,0],[window.innerWidth*.9,0]]);
    		path.strokeColor = prettyRaCo()
    		symb = new Symbol(path);
    		lines.children.push(symb)
    	}

    	for(var i = 0;i<2500;i++){
    		lines.children[i%range].place([(window.innerWidth*.5)+Math.random()*30,(i/3)]).rotate(rotate)
    	}
    }



    function onMouseMove(event){
    	draw()
    };
---
