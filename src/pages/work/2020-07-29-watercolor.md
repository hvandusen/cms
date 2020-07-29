---
templateKey: work
title: Watercolor
type: Candusen page
date: 2020-07-29T15:21:29.840Z
paper_code:
  code: |
    var draw = false;



    var shadowOffset = new Point(-1550,-1550);
    var shadowOffsets = new Point(200,200);
    var isRetina = ( window.devicePixelRatio > 1)
    var getOptions = function(){
    	return{
    		fillColor: new Color(1,1),//prettyRaCo(),
    		strokeWidth: 200,
    		shadowColor:  prettyRaCo(),
    		shadowOffset: shadowOffset*(isRetina ? 2 : 1),
    		//closed: false,
    		opacity:.5,
    		shadowBlur: window.innerWidth >480 ? 800: (20+Math.random()*10),
    		movement: Point.random()
    }
    }

    var line = new Path(getOptions());

    function onMouseDown(e){
    	draw = !draw;
    }

    function onMouseMove(e){
    	var adder = e.delta.normalize().rotate(90).multiply(100)
    	if(draw){
    			line.add(new Point(e.point+adder-shadowOffset));
    			adder = adder.negate();
    			line.insertSegment(0,e.point+adder-shadowOffset)
    			line.position += line.movementgr;
    			line.smooth()
    	}
    }
    var splits = 2;
    function split(path){
    	var segLength = path.length/splits;
    	for(var i=0;i<splits;i++){

    	}
    }
---
