---
templateKey: work
title: Finger trap
type: Candusen page
date: 2020-07-29T15:40:18.287Z
paper_code:
  code: |
    var totalLines = 50;
    var colorStart = num(1536);

    function setupLines(){
      var size = 10+num(60);
      var setupVec = new Point(size,0)- new Point(0,0);
      setupVec.angle = 0;
      var lns = new Group();
      for(var i=0;i<totalLines;i++){
        var newLine = new Path.Line({
          segments: [view.bounds.center, view.bounds.center+setupVec],
          //strokeColor: prettyRaCo(),
        });
        lns.children.push(newLine);
        setupVec.angle += 380/totalLines;
        setupVec = setupVec.normalize()*(size);
      }
      return lns;
    }
    function setupTraces(lines){
      var traces = new Group();
      lines.children.map(function(e,i){
        var trace = new Path();
        trace.strokeColor = colorWheel(colorStart+i*10);//prettyRaCo();
        trace.strokeWidth = 1;
        traces.children.push(trace);
      })
      return traces;
    }

    var lines = setupLines();
    var traces = setupTraces(lines);

    function onMouseMove(e){
      if(!clicked)
        return;
      lines.bounds.center = e.point;
      lines.rotate(3,e.point);
      traces.children.map(function(e,i){
        e.add(lines.children[i].segments[1].point);
        e.smooth();
      });
    }
    var clicked = false;
    function onMouseDown(e){
      clicked = !clicked;
      if(!clicked){
        lines.children = [];
        traces.children = [];
        return;
      }

      totalLines = 50;
      size = 10+num(100)
      colorStart = num(1536);
      //lines.children.map(function(e){e.remove()});
      lines.children = [];
      //traces.children.map(function(e){e.remove()});
      traces.children = [];
      lines = setupLines();
      traces = setupTraces(lines);
    }
---
