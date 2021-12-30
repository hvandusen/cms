---
templateKey: work
title: Cutouts
type: Candusen page
date: 2020-07-29T15:23:05.036Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431842/Screen_Shot_2020-09-17_at_6.46.19_PM_kj9d6b.png
paper_code:
  code: |
    function set(pt,size){
      var colors = ["red","blue","green"];
      var shapes = [
        new Path.Rectangle(pt,size*.75,size*.75),
        new Path.Circle(pt,size/2.5),
        new Path.RegularPolygon(pt,3,size/2)
      ]
      var group = new Group({children: shapes});
      group.strokeColor = "black"
      group.strokeWidth = 1;
      group.children.map(function(child){
        child.position = pt;
        child.position += [num(size),num(size)];
        child.strokeColor = colors.splice(num(colors.length),1)
        child.rotate(Math.random()*360)
      });
      group.position = pt;
      return group;
    }

    //set(new Point(100,100),50)
    function draw(){
      project.activeLayer.clear()
      var all = new Group();
      var cellSize = 25 + Math.random()*250;
      var size = cellSize*.5;
      var columns = window.innerWidth / cellSize;
      var rows = window.innerHeight / cellSize;
      for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
          all.children.push(set(new Point(i*cellSize,j*cellSize),size))
        }
      }
      all.fitBounds(view.bounds);
      all.scale(.9)
    }
    draw()
    function onMouseDown(){
      draw()
    }
---
