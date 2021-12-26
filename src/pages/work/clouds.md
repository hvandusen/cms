---
templateKey: work
title: Clouds
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640528270/Screen_Shot_2021-12-26_at_8.52.42_AM_r0v3ux.png
featured: false
draft: false
date: 2021-12-26T13:49:27.659Z
date-finish: 2021-12-26T13:49:27.669Z
paper_code:
  code: |-
    var draw = false;

    function onMouseDown(e){
    	draw = !draw;
    	if(draw){
    		line = new Path(getOptions());
    	}
    }

    var shadowOffset = new Point(-1550,-1550);
    var shadowOffsets = new Point(200,200);
    var isRetina = ( window.devicePixelRatio > 1)
    var getOptions = function(){
    	return{
    		fillColor: new Color(1,1),
    		strokeWidth: 200,
    		shadowColor:  prettyRaCo(),
    		shadowOffset: shadowOffset*(isRetina ? 2 : 1),
    		opacity:.5,
    		shadowBlur: window.innerWidth >480 ? 800: (20+Math.random()*10),
    		movement: Point.random()
    }
    }

    var line = new Path(getOptions());

    $("body").on("touchend", function(){
    	draw = !draw;
    });

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
