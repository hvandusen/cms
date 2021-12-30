---
templateKey: work
title: Random CSS Grid
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640831215/Screen_Shot_2021-12-29_at_9.26.49_PM_p94xle.png
featured: false
draft: true
date: 2021-12-30T02:25:45.801Z
date-finish: 2021-12-30T02:25:45.812Z
paper_code:
  code: |
    var thresholds = [0.8,0.8,0.8,0.8];
    function borders(){
      return {
        'border-bottom-left-radius': Math.random()> thresholds[0] ? '100%' : 0,
        'border-bottom-right-radius': Math.random()> thresholds[1] ? '100%' : 0,
        'border-top-left-radius': Math.random()> thresholds[2] ? '100%' : 0,
        'border-top-right-radius': Math.random()> thresholds[3] ? '100%' : 0
      }
    }
    $(document).ready(function(){
      function draw(range){
        var roundedShapes = Math.random()<.5;
        $("#container").html("");
        var offset = 0;
        for (var i = 0; i < 2000; i++) {
          var box = $("<div class='box'></div>");
          var paint = $('<span></span>').css(roundedShapes ? borders() : {});
          $("#container").append(box.append(paint));
        }
        var colors = ["red","green","blue"];
        $("body").css("background",colors[Math.floor(Math.random()*colors.length)]);
        for (var i = 0; i < colors.length; i++) {
          $(".box:nth-child("+colors.length+"n+"+i+") span").css({
            background: colors[i]
          });

        }
        for (var i = 0; i < range; i++) {
          var size = Math.floor(Math.random()*range);
          $(".box:nth-child("+range+"n+"+i+")").css({
            'grid-column': "span "+size,
            'grid-row': "span "+size,
            'background': colors[range%colors.length]
          })
        }
      }

      draw(4);
      $("body").click(function(){draw(4)});
    })
---
<style>
body {
  margin: 0;
}
#container {
  display: grid;
  grid-template-columns: repeat(50,2vw);
  grid-template-rows: repeat(50,2vw);
  grid-auto-flow: dense;
}

.box {
  height: 0;
  padding-bottom: 100%;
  position: relative;
}

.box span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<div id="container"></div>
