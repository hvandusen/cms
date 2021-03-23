---
templateKey: work
title: Battleship
type: Candusen page
featured: false
draft: false
date: 2020-09-18T13:45:50.474Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600436698/Screen_Shot_2020-09-18_at_9.43.44_AM_hfa82c.png
paper_code:
  code: >-
    var Drawable = function(units){
      this.units = units;
      var size = this.size = Math.floor(window.innerHeight/units);
      var squares = this.squares = new Group();
      var lines = this.lines = new Group();
      this.filled = {};
      for (var i = 0; i < units; i++) {
        for (var j = 0; j < units; j++) {
          var vert = new Path.Line({
            segments: [[i*size,0],[i*size,size*units]]
          })
          var horizontal = new Path.Line({
            segments: [[0,size+i*size],[size*units+size,size+i*size]]
          })
          vert.strokeColor = horizontal.strokeColor = "black";
          vert.strokeWidth = horizontal.strokeWidth = 1;
          lines.children.push(vert);
          lines.children.push(horizontal);
          var path = new Path.Rectangle(i*size,j*size,size,size);
          squares.children.push(path);
        }
      }
      var current = lines.position;
      lines.position = view.bounds.center;

      squares.position += new Point(lines.position - current);// = view.bounds.center;

    }

    var d = new Drawable(130);


    Drawable.prototype.pixelAt = function(x,y){
      var length = this.squares.children.length;
      return this.squares.children[x*this.units+y] || null;
    }


    Drawable.prototype.isFilled = function(x,y){
      if(this.filled.hasOwnProperty(x) && this.filled[x].indexOf(y)>-1){
        return true;
      }
      return false;
    }


    Drawable.prototype.fill = function(points,color){
      if(typeof points[0] === "object")
        for(var i=0;i<points.length;i++){
          if(!d.pixelAt(points[i][0],points[i][1])){
            return;
          }
          var p = d.pixelAt(points[i][0],points[i][1]);
          p.fillColor = color;//prettyRaCo()
          if(!this.filled.hasOwnProperty(points[i][0])){
            this.filled[points[i][0]] = [];
          }
          this.filled[points[i][0]].push(points[i][1]);
        }
      else{
        if(!d.pixelAt(points[0],points[1]))
          return;

        var p = d.pixelAt(points[0],points[1]);
        p.fillColor = color;//prettyRaCo();
        if(!this.filled.hasOwnProperty(points[0])){
          this.filled[points[0]] = [];

        }
        this.filled[points[0]].push(points[1]);
      }
      return this;
    }


    Drawable.prototype.blob = function(size){
      var pts = {};
      var out = [];
      pts[num(this.units)] = [num(this.units)]
      for(var i=0;i<size;i++){
        var guess = nextPoint(pts);
        while(guess[0]>=0 && guess[0]<this.units && guess[1]>=0 && guess[1]<this.units &&  pts.hasOwnProperty(guess[0]) && pts[guess[0]].indexOf(guess[1])>-1){
          guess = nextPoint(pts);
        }
        if(!pts.hasOwnProperty(guess[0])){
          pts[guess[0]] = [];
        }
        pts[guess[0]].push(guess[1])
        // this.fill(guess,"black")
      }
      function nextPoint(pts){
        //choose a random blob point
        var ran = parseInt(Object.keys(pts).length === 1 ? Object.keys(pts)[0] : Object.keys(pts)[num(Object.keys(pts).length-1)]);
        var pt = [ran,pts[ran][num(pts[ran].length-1)]];
        var move = [0,0];
        move[num(2)] = -1+num(2)*2;

        return [pt[0]+move[0],pt[1]+move[1]];
      }
      for(var i in pts){
        for(var j in pts[i]){
          out.push([parseInt(i),pts[i][j]]);
        }
      }
      return out;
      // return this;
    }


    Drawable.prototype.drew = function(pix){



    }


    Drawable.prototype.gen = function(amt){
      var pts = [];
      for (var i = 0; i < amt; i++) {
        pts.push([num(this.units),num(this.units)]);
      }
      return pts;
    }


    Drawable.prototype.filter = function(func){
      this.squares.children.filter(function(path,i){
        func(path,i);
      })
    }

    var blobs = 20;

    var newPoints = d.blob(20);

    for(var i=0;i<blobs;i++){
      d.fill(d.blob(80),"black");
    }
---
