---
templateKey: work
title: Dots
type: Candusen page
featured: false
draft: false
date: 2021-05-19T20:18:11.781Z
date-finish: 2021-05-19T20:18:11.805Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1621455504/Screen_Shot_2021-05-19_at_4.18.05_PM_dzsgnl.png
paper_code:
  code: |-
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
    smaller = smaller/2
    var rect = new Path.Rectangle(0,0,smaller*1.3,smaller*1.3);
    rect.strokeColor="green";
    rect.strokeWidth = 20;
    rect.fillColor="yellow";
    rect.position = view.bounds.center;
    rect.sendToBack();
    function onMouseMove(e){
      rect.position  = e.point;
    }
    var g = new Group();
    var size = 450;
    for (var i = 0; i < smaller/size; i++) {
      for (var j = 0; j < smaller/size; j++) {
        var c = new Path.Circle(i*size,j*size,size/3);
        c.strokeColor = "red"
        c.strokeWidth=20;
        c.fillColor = "blue"
        g.children.push(c)
      }
    }
    g.position = view.bounds.center
    var colorCount = 0;
    function onMouseDown(e){
      // subtr = new CompoundPath({
      //   children: [g,copy],
      //   fillColor: "green"
      // })//copy.divide(g);
      rect = subtractGroup(rect,g)//rect = rect.subtract(g.children[0])
      // rect.smooth()
      console.log(rect)
      rect.strokeColor = ["blue","red","green","yellow"][(1+colorCount)%4]
      rect.strokeWidth = 20;
      rect.fillColor = ["blue","red","green","yellow"][colorCount%4]
      colorCount++
    }

    function subtractGroup(path,group){
      var p = path;
      for(var i in group.children){
        if(!group.children[i].isInside(p))
          p = p.subtract(group.children[i])
      }
      return p;
    }
desort: false
---
