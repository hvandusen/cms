---
templateKey: work
title: Hole cutter
type: Candusen page
date: 2020-07-29T15:19:49.452Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431841/Screen_Shot_2020-09-17_at_6.48.02_PM_b1qvwy.png
paper_code:
  code: >
    var count = -4;

    var gradientRatio=.1;

    var range = 80;

    var colorAmt = 4;

    var size = 200;

    var dots = 10000;

    var speed = .1;

    var symbols = {};

    function downloadAsSVG(fileName) {

       if(!fileName) {
           fileName = "paperjs_example.svg"
       }
       console.log(paper.project.exportSVG({asString:true}))
       var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));

       var link = document.createElement("a");
       link.download = fileName;
       link.href = url;
       link.click();
    }


    function setColors(circleSize){
    	for(var i=1;i<colorAmt+1;i++){
    		n = 3
    		base = 2.3
    		ext = 4+1
    		var path = new Path.Circle(0,0,circleSize)
    		path.fillColor = prettyRaCo();
    		var symb = new Symbol(path);
    		symbols[i-1] = symb
    		symb.place(150,250)
    	}
    }

    function draw(size){
    	setColors(size);
    	project.activeLayer.children = []
    	for(var i=1;i<dots;i++){
    		//x = (560*Math.random()*range*gradientRatio)%(screen.availWidth+500)
    		c = i/5000
    		x = c*c*(screen.availWidth)-200
    		y = 2*(Math.random())*screen.availHeight
    		p = new Point(screen.availWidth-x,y)
    		symbols[Math.floor(num(3))].place(p);
    		}
    }


    draw(7)


    function onMouseDown(event){
    	draw(7);//Math.floor(Math.sin(count/100)*20));
    	//count++;
    }
---
