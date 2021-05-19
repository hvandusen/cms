---
templateKey: work
title: Leparc
type: Candusen page
featured: false
draft: false
date: 2021-05-19T20:35:42.888Z
date-finish: 2021-05-19T20:35:42.959Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1621455816/Screen_Shot_2021-05-19_at_4.23.16_PM_urq1sz.png
paper_code:
  code: >-
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

    var speed = 10;

    var colorOffsets = [1280,1280,1167,1167];

    var rows = Math.floor(window.innerHeight/20);;

    var columns = Math.floor(window.innerWidth/20);

    var colorDiffs = [Math.floor(3072/(rows-4)),Math.floor(3072/(columns-4)),Math.floor(3072/(rows-4)),Math.floor(3072/(columns-4))];

    $(document).ready(function(){

    $("<div class='shapes'></div>").appendTo($("body"))
      addShapes(rows,columns)
      colorShapes(colorOffsets,colorDiffs);
    });

    var count = 0;


    function addShapes(rows,columns){
      $(".shapes").html("")
      for (var i = 0; i < rows; i++) {
        var row = $("<div class='row'></div>");
        for (var j = 0; j < columns; j++) {
          row.append("<div class='shape'></div>");

        }
        $(".shapes").append(row);
      }
    }

    function colorShapes(colorOffsets,colorDiffs){
      $(".row:nth-child(2n+1) .shape:nth-child(2n+1)").map(function(i,e){
         $(e).css("background", colorWheel(colorOffsets[0]+colorDiffs[0]*(i%(columns/2))))
       });
      $(".row:nth-child(2n+1)").map(function(i,e){ $(e).find(".shape:nth-child(2n+0)").css("background", colorWheel(colorOffsets[1]-colorDiffs[1]*(i%(rows/2))))});
      $(".row:nth-child(2n+0)").map(function(i,e){ $(e).find(".shape:nth-child(2n+1)").css("background", colorWheel(colorOffsets[2]-colorDiffs[2]*(i%(rows/2))))});
      $(".row:nth-child(2n+0) .shape:nth-child(2n+0)").map(function(i,e){ $(e).css("background", colorWheel(colorOffsets[3]+colorDiffs[3]*(i%(columns/2))))});
    }

    $(document).mousemove(function(){

    });

    setInterval(function(){
      colorOffsets[0]+=speed;
      //colorOffsets[1]+=speed*.8;
      //colorOffsets[2]-=speed*.7;
      //colorOffsets[3]+=speed*.65;
      colorShapes(colorOffsets,colorDiffs);
    },10)
desort: false
---
