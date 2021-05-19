---
templateKey: work
title: Spiro
type: Candusen page
featured: false
draft: false
date: 2021-05-19T21:01:03.885Z
date-finish: 2021-05-19T21:01:03.911Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1621458081/Screen_Shot_2021-05-19_at_5.00.58_PM_fyomi0.png
paper_code:
  code: >
    function innerOuter(radius,innerPercentage){
      var that = {};
      that.outer = new Path.Circle(0,0,radius);
      that.outer.position = view.bounds.center;
      that.outer.strokeColor = "black";
      that.inner = that.outer.clone().scale(innerPercentage,that.outer.bounds.leftCenter);
      return that;
    }


    var Spirograph = function(radius,innerPercentage){
      this.outer = new Path.Circle(0,0,radius);
      this.outer.position = view.bounds.center;
      this.outer.strokeColor = prettyRaCo();
      this.lines = []
      this.inner = this.outer.clone().scale(innerPercentage,this.outer.bounds.leftCenter);
      this.drawPoint = new Path.Circle(this.inner.position + [40,0],10);
      this.drawPoint.fillColor = "red"
      this.spinner = new Group({children: [this.inner,this.drawPoint]});
      this.setDrawPoint = function(outset,rotation){
        this.spinner.children =  [this.inner,this.drawPoint];
      }

      this.rot = function(step){
        if(this.spinner.children.length){
            this.lines[0].add(this.spinner.children[1].position)
            this.spinner.rotate(7.13,this.outer.position);
            this.spinner.rotate(5.54);
          }
      }

      this.addLine = function(color){
        this.lines.push(new Path({strokeColor: color}));
      }

    }

    var circles = new Spirograph(Math.min(window.innerWidth,window.innerHeight)*.4,.3+(Math.random()*.5));

    circles.addLine("red");


    function onMouseDown(){
      project.activeLayer.clear();
      circles = new Spirograph(Math.min(window.innerWidth,window.innerHeight)*.4,.3+(Math.random()*.5));
      circles.addLine("red");
    }



    function onFrame(){
      circles.rot(1)
      //circles.inner.rotate(1,circles.outer.position);
    }
desort: false
---
