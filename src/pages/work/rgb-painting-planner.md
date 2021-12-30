---
templateKey: work
title: RGB Painting Planner
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640837984/Screen_Shot_2021-12-29_at_11.19.38_PM_mh8akb.png
featured: false
draft: false
date: 2021-12-30T04:17:54.937Z
date-finish: 2021-12-30T04:17:54.943Z
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


    function num(range){
      return Math.floor(Math.random()*range);
    }


    function sl(arr){
      return arr.splice(num(arr.length),1)[0];
    }


    function go(rgb){
      return "rgb(" + rgb.reduce(function(a,i,j){
        a.push(sl(rgb))
        return a
      },[sl(rgb)]).concat(rgb)+")";
    }



    function rgb(){
      return "rgb("+[0,255,num(255)].map(function(e,i,a){
        return a.splice(Math.floor(Math.random()*a.length),1)[0] + ","+(a.length<2 ? a[0]:"")
      }).join("")+")"
    }


    var rows = 10;

    var columns = 8;

    var size = Math.min(window.innerWidth,window.innerHeight);

    var tapeSize = size/Math.max(rows,columns);

    var c = new Group();//[];

    var r = new Group();//[];


    for (var i = 0; i < rows; i++) {
      // c.push(new Group());
      var style = {
        // strokeWidth: tapeSize,
        fillColor: ["red","green","blue"][i%3]
      }
      var path = new Path(style);
      path.add(0,tapeSize*i)
      path.add(size*(columns/rows),tapeSize*i)
      path.add(size*(columns/rows),tapeSize+tapeSize*i)
      path.add(0,tapeSize+tapeSize*i)
      path[(Math.random() > .5 ? "sendToBack" : "bringToFront")]();
      r.children.push(path)
    }


    for (var i = 0; i < columns; i++) {
      // c.push(new Group());
      var style = {
        fillColor: ["red","green","blue"][i%3]
      }
      var path = new Path(style);
      path.add(tapeSize*i,0)
      path.add(tapeSize*i,size)
      path.add(tapeSize*i+tapeSize,size)
      path.add(tapeSize*i+tapeSize,0)
      path[(Math.random() > .5 ? "sendToBack" : "bringToFront")]();
      c.children.push(path)
    }


    r.rotate(num(10)-5)

    c.rotate(num(10)-5)


    var outside = new Path.Rectangle(0,0,tapeSize*columns,tapeSize*rows);
---
