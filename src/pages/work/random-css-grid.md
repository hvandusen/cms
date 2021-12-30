---
templateKey: work
title: Random CSS Grid
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640831215/Screen_Shot_2021-12-29_at_9.26.49_PM_p94xle.png
featured: false
draft: false
date: 2021-12-30T02:25:45.801Z
date-finish: 2021-12-30T02:25:45.812Z
paper_code:
  code: |
    var thresholds = [.8,.8,.8,.8]
    function borders(){
      return {
        'border-bottom-left-radius': Math.random()> thresholds[0] ? '100%' : 0,
        'border-bottom-right-radius': Math.random()> thresholds[1] ? '100%' : 0,
        'border-top-left-radius': Math.random()> thresholds[2] ? '100%' : 0,
        'border-top-right-radius': Math.random()> thresholds[3] ? '100%' : 0,
      }
    }

    $(document).ready(function(){
      function draw(range){
        var roundedShapes = Math.random()<.5
        $("#container").html("")
        var offset = 0;
        for (var i = 0; i < 2000; i++) {
          var box = $("<div class='box'></div>")
          var paint = $('<span></span>').css(roundedShapes ? borders() : {});
          $("#container").append(box.append(paint))
        }


        let colors = ['red','green','blue']
        colors = [prettyRaCo(),prettyRaCo(),prettyRaCo()]
        $("body").css("background",colors[num(colors.length)])
        for (var i = 0; i < colors.length; i++) {
          $(`.box:nth-child(${colors.length}n+${i}) span`).css({
            background: colors[i]
          });

        }
        for (var i = 0; i < range; i++) {
          let size = num(range);
          $(`.box:nth-child(${range}n+${i})`).css({
            'grid-column': `span ${size}`,
            'grid-row': `span ${size}`,
            'background': colors[range%colors.length]
          })
        }
      }

      draw(4)
      $("body").click(() => draw(4))
      // setInterval(()=>draw(4),1000)
    })
---
