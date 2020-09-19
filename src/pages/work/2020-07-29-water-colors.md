---
templateKey: work
title: Water colors
type: Candusen page
draft: true
date: 2020-07-29T15:41:04.102Z
paper_code:
  code: |
    var draw = false;
    function onMouseDown(e){
    	draw = !draw;
    	if(draw){
    		line = new Path(getOptions());
    		//line.sendToBack();
    	}
    	else {
    		//draw.scale(.9+Math.random()*.2)
    		//split(line);
    		// var randPt = line.getPointAt(Math.random()*line.length);
    		// console.log(line.length);
    		// line.split(randPt);
    	}
    }

    var shadowOffset = new Point(0,0);
    var shadowOffsets = new Point(0,0);

    var getOptions = function(){
    	return{
    		fillColor: new Color(1,1),//prettyRaCo(),
    		strokeWidth: 200,
    		shadowColor:  prettyRaCo(),
    		shadowOffset: shadowOffset*2,
    		//closed: false,
    		opacity:.5,
    		shadowBlur: window.innerWidth >480 ? 800: (20+Math.random()*10),
    		movement: Point.random()
    }
    }

    var line = new Path(getOptions());

    function onMouseMove(e){
    	var adder = e.delta.normalize().rotate(90).multiply(100)
    	if(draw){
    			line.add(new Point(e.point+adder-shadowOffset));
    			adder = adder.negate();
    			line.insertSegment(0,e.point+adder-shadowOffset)
    			line.position += line.movementgr;
    	}
    }
    var splits = 2;
    function split(path){
    	var segLength = path.length/splits;
    	for(var i=0;i<splits;i++){

    	}
    }
---
