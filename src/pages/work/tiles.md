---
templateKey: work
title: Tiles
type: Candusen page
featured: false
draft: false
date: 2021-05-19T21:03:20.715Z
date-finish: 2021-05-19T21:03:20.751Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1621458211/Screen_Shot_2021-05-19_at_5.03.14_PM_scslq5.png
paper_code:
  code: >-
    var all = new Group();

    function rgb(){
      return ["red","blue","green","yellow","purple"][num(5)];
    }


    function tiles(){
      var width = 5+num(25);
      var height = 5+num(25);
      var size = Math.min(window.innerHeight,window.innerHeight)/(2+width)
      var lines = new Group();
      var cellSize = new Point(window.innerWidth/width,window.innerHeight/height);
      for (var i = 0; i < width; i++) {
        var line = new Path();
        line.strokeColor = rgb();
        line.add(i*cellSize.x,0);
        line.add(i*cellSize.x,height*cellSize.y);
        lines.children.push(line);
      }
      lines.children[lines.children.length-1].strokeColor = prettyRaCo();
      var last = lines.children[lines.children.length-1].clone();
      last.position += [cellSize.x,0];
      last.strokeColor = "orange"
      lines.children.push(last);
      for (var j = 0; j < height; j++) {
        var line = new Path();
        line.strokeColor = rgb();
        line.add(0,j*cellSize.y);
        line.add(width*cellSize.x,j*cellSize.y);
        lines.children.push(line);
      }
      var nextLast = lines.children[lines.children.length-1].clone();
      nextLast.position += [0,cellSize.y]
      lines.children.push(nextLast);
      nextLast.strokeColor = "orange"
      // nextLast.rotate(10)
      // line.position+=[size,0];
      all.children.push(lines);
      var bunches = new Group();
      for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
          var pt = new Point(size/2,size/2);
          var theGroup = bunch(cellSize);
          theGroup.fitBounds(new Size(cellSize));
          theGroup.position += [cellSize.x*i,cellSize.y*j];
          theGroup.scale(.88-Math.random()*.1);
          bunches.children.push(theGroup)
        }
      }
      all.children.push(bunches);
    }


    function bunch(cellSize){
      var amt = num(5)+1;
      var out = new Group();
      for (var i = 0; i < amt; i++) {
        out.children.push(shp(cellSize));
      }
      return out;
    }


    function shp(size){
      var numberz = 2//(.2+Math.random()*.5)
      var thePoint = [size.x*(.3+Math.random()*.5),size.y*(.3+Math.random()*.5)]//[numberz*size.x,numberz.y*size];
      var methods = [
        function(){
          var c = new Path.Circle(thePoint,Math.min(size.x,size.y)/(Math.random()+3));
          c.fillColor = rgb();
          c.rotate(num(20))
          return c;
        },
        function(){
          var t = new Path.RegularPolygon({
            center: thePoint,
            sides: 3,
            radius: Math.min(size.x,size.y)/(Math.random()+2.3),
            fillColor: rgb()
          });
          t.rotate(num(180)-90)
          return t;
        },
        function(){
          var sizes = [size.x*(.2+Math.random()*.2),size.x*(.2+Math.random()*.2)];
          var x = num((size.x-sizes[0]));
          var y = num((size.y-sizes[1]));
          var r = new Path.Rectangle(x,y,sizes[0],sizes[1]);
          r.fillColor = rgb();
          r.rotate(num(10)-5)
          return r;
        }
      ]
      return methods[num(3)]();
    }


    tiles()

    function onMouseDown(){
      project.activeLayer.clear();
      tiles()
    }
desort: false
---
