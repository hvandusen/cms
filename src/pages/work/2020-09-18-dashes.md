---
templateKey: work
title: Dashes
type: Candusen page
featured: false
draft: false
date: 2020-09-18T13:02:28.808Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600434229/Screen_Shot_2020-09-18_at_9.03.38_AM_thqo2v.png
paper_code:
  code: >-
    var oval,oval2;

    var down = false;

    var dash= [Math.random()*100,Math.random()*300];

    var sw= Math.random()*300

    oval = new paper.Shape.Ellipse(project.view.center);


    	function onMouseMove(event){


        if(down){
    		dash= [Math.random()*100,Math.random()*300];
    		sw= Math.random()*300
    		oval.size = [(event.point.x-oval.position.x)*2,(event.point.y-oval.position.y)*2]
    		temp = oval.toPath()
    		new paper.Path({segments:temp.segments,closed:true,dashArray: dash,strokeColor: prettyRaCo(),strokeWidth:sw})
    			if(project.activeLayer.children.length > 3)
    				{
    				a = project.activeLayer.children.pop()
    				project.activeLayer.children[3] = project.activeLayer.children[2]
    				project.activeLayer.children[2] = project.activeLayer.children[1]
    				project.activeLayer.children[1] = project.activeLayer.children[0]
    				project.activeLayer.children[0] = a
    				//project.activeLayer.children[0].fillColor = prettyRaCo();
    				}

    		}
    	};

    	function onMouseDown(event){
        oval = new paper.Shape.Ellipse(project.view.center);
    	};

    	function onMouseUp(event){
    		down = !down
    		if(down)
    		project.activeLayer.clear()
    		dash= [Math.random()*100,Math.random()*300];
    		return

    		temp = oval.toPath()
    		//oval.remove()
    		oval = new paper.Path({segments:temp.segments,closed:true,dashArray: [30,10],strokeColor: prettyRaCo(),strokeWidth:10})
    		removed = oval.segments.pop().point
    		oval.add([removed.x+num(50)-25,removed.y+num(50)-25])
    		oval.smooth()
    		oval.fillColor = prettyRaCo();
    		//oval.rotate(num(5)-2.5)
    	}
interactivity:
  - click-and-move
---
