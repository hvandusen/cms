---
templateKey: work
title: Painting generator
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640535730/Screen_Shot_2021-12-26_at_11.21.44_AM_im3g0n.png
featured: false
draft: false
date: 2021-12-26T16:21:54.133Z
date-finish: 2021-12-26T16:21:54.143Z
paper_code:
  code: >-
    function rgb(){
      return ['red','green','blue'][num(3)]
    }



    function go(){
      project.activeLayer.clear()
      var workspace = new Path.Rectangle(0,0,10,10);
      workspace.fitBounds(view.bounds)
      // workspace.fillColor = rgb()
      var inch = workspace.bounds.width / 10;
      console.log(inch)
      var tape = inch*.75;
      var groups = {
        red: new Group(),
        green: new Group(),
        blue: new Group(),
      }

      var rows = Math.ceil(workspace.bounds.width/tape)
      console.log(rows)


      var corner = workspace.bounds.topLeft;

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < rows; j++) {
          var color = rgb();
          var path =  new Path.Rectangle(corner.x+i*tape,corner.y+j*tape,tape,tape)
          path.fillColor = color;
          groups[color].children.push(path)
        }
      }


        var amt = num(3);
        for (var i = 0; i < amt; i++) {
          groups[rgb()].rotate(10* num(3));
        }
        var amt = num(3);
        for (var i = 0; i < amt; i++) {
          groups[rgb()].scale(2*(num(3)+1));
        }
        var amt = num(3);
        for (var i = 0; i < amt; i++) {
          groups[rgb()].bringToFront();
        }

      var cover = new Path.Rectangle(view.bounds.size);
      var result = cover.subtract(workspace)
      result.fillColor = "white"

    }


    function go2color(){
      project.activeLayer.clear()
      var colors = ['red','green','blue','yellow']
      var bg = colors.splice(num(colors.length),1)
      var workspace = new Path.Rectangle(0,0,10,10);
      workspace.fitBounds(view.bounds)
      workspace.fillColor = bg
      function prc(){
        return colors[num(3)]
      }
      var inch = workspace.bounds.width / 10;
      console.log(inch)
      var tape = inch*.75;
      var groups = {
      }
      colors.forEach(function(item, i){
        groups[item] = new Group();
      });

      var rows = Math.ceil(workspace.bounds.width/tape)
      console.log(rows)


      var corner = workspace.bounds.topLeft;

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < rows; j++) {
          var color = prc();
          var path =  new Path.Rectangle(corner.x+i*tape,corner.y+j*tape,tape,tape)
          path.fillColor = color;
          groups[color].children.push(path)
        }
      }

        var amt = num(4);
        for (var i = 0; i < amt; i++) {
          groups[prc()].rotate(10* num(3));
        }
        var amt = num(5);
        for (var i = 0; i < amt; i++) {
          groups[prc()].scale(2*(num(3)+1));
        }
        var amt = num(3);
        for (var i = 0; i < amt; i++) {
          groups[prc()].bringToFront();
        }

      var cover = new Path.Rectangle(view.bounds.size);
      var result = cover.subtract(workspace)
      result.fillColor = "white"

    }


    go2color()


    function onMouseDown(){
      go2color()
    }
---
