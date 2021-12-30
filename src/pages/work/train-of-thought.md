---
templateKey: work
title: Train of thought
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640838681/Screen_Shot_2021-12-29_at_11.30.57_PM_ed0l08.png
featured: false
draft: false
date: 2021-12-30T04:31:04.420Z
date-finish: 2021-12-30T04:31:04.426Z
paper_code:
  code: >
    /*

    function onMouseDown(e){

    }


    function onMouseMove(e){

    }


    function onMouseUp(e){

    }


    function onKeyPress(e){

    }


    function onFrame(e){

    }

    */


    function cropToArea(container,group){
      var overlap = new Group();
      overlap.children = group.children.filter(function(child,i){
        return child.intersects(container)
      }).map(function(child,i){
        return container.intersect(child).set({fillColor: child.fillColor,strokeWidth: 0})
      })
      group.children.map(function(ch){ch.remove()})
      group.remove()
      return overlap
    }


    function go(position){
      var pts = [Point.random()*view.bounds.size]
      pts.push(pts[0]+Point.random()*200)
      console.log(pts)
      var container = new Path.Rectangle(pts[0].x,pts[0].y,pts[1].x-pts[0].x,pts[1].y-pts[0].y)
      // container.strokeColor = "black"
      var gr = new Group()
      for (var i = 0; i < 20; i++) {
        gr.children.push(randomShape(container,(container.bounds.width+container.bounds.height)/4))
      }

      var stuff = cropToArea(container,gr)
      var direction = num(2)
      var polarity = direction>1 ? 1 : -1
      var copies = new Group();
      for (var i = 0; i < 3; i++) {
        var copy = stuff.clone();
        copy.position += direction%2 ? [polarity*stuff.bounds.width*(i+1),0] : [0,polarity*stuff.bounds.height*(i+1)]
        copies.children.push(copy)
        copy.remove()
      }
      stuff.remove()
      var copyz = new Group();
      for (var i = 0; i < 3; i++) {
        var copiess = copies.clone();
        copiess.position += direction % 2 ?  [0,polarity*stuff.bounds.height*(i+1)] : [polarity*stuff.bounds.width*(i+1),0]
        copyz.children.push(copiess)
        copiess.remove()
      }
      copies.remove()
      copyz.position = position
    }


    function randomShape(container,radius,color){
      return Math.random() > .5 ? new Path.RegularPolygon({
          position: Point.random()*container.bounds.size + container.bounds.topLeft,
          radius: num(radius),
          fillColor: color ? color : prettyRaCo(),
          sides: 3+num(3)
        }) : new Path.Circle({
          position: Point.random()*container.bounds.size + container.bounds.topLeft,
          radius: radius,
          fillColor: color ? color : prettyRaCo(),
        })
    }


    function onMouseDown(e){
      go(e.point)
    }
---
