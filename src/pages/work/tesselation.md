---
templateKey: work
title: Tesselation
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640813637/Screen_Shot_2021-12-29_at_4.29.56_PM_bcm7mf.png
featured: false
draft: false
date: 2021-12-29T21:33:00.832Z
date-finish: 2021-12-29T21:33:00.858Z
paper_code:
  code: >-
    function go(){
      var baseSize = 200
      project.activeLayer.clear();
      var repeat = 6;
      var bounds = view.bounds;
      var rect = new Path.Rectangle(0,0,100,100).set({fillColor: 'white'})
      rect.fitBounds(bounds.size)
      var line = new Path({segments: [rect.position,rect.position+[baseSize,0]]})//rect.bounds.rightCenter]})
      switch (repeat) {
        case 3:
          line.rotate(.5*(360/repeat/2),line.segments[0].point)
        break;
        case 4:
          line.rotate(.5*(360/repeat),line.segments[0].point)
        break;
        case 5:
          line.rotate(.5*(-360/repeat/2),line.segments[0].point)
        break;
        case 6:

        break;
        case 7:
          line.rotate((360/repeat/4),line.segments[0].point)
        break;

      }
      rect.remove()
      var container = line.clone()
      line.rotate((-360/repeat),line.segments[0].point)
      container.add(line.segments[1].point)
      container.closed = true;
      // line.rotate(1,line.segments[0].point)
      var trash = new Group();
      var amt = 2+num(15)
      var maxRadius = 5+num(150)
      for (var i = 0; i < amt; i++) {
        var color = prettyRaCo()
        var t = Math.random() > .5 ? new Path.RegularPolygon({
          position: Point.random()*container.bounds.size + container.bounds.topLeft,
          radius: maxRadius,
          fillColor: color,
          strokeColor: color,
          sides: 3+num(3)
        }) : new Path.Circle({
          position: Point.random()*container.bounds.size + container.bounds.topLeft,
          radius: maxRadius,
          fillColor: color,
          strokeColor: color
        })
        for (var i = 0; i < trash.children.length; i++) {
          var next = t.subtract(trash.children[i])
          console.log('nect',next)
          t.remove()
          t = next
          next.remove()
        }
        trash.children.push(t)
        t.remove()
      }

      var overlap = new Group();
      overlap.children = trash.children.filter(function(child,i){
        return child.intersects(container)
      }).map(function(child,i){
        return container.intersect(child).set({fillColor: child.fillColor,strokeWidth: 0})
      })
      container.remove()
      var modes = ['normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard- light', 'color-dodge', 'color-burn', 'darken', 'lighten', 'difference', 'exclusion', 'hue', 'saturation', 'luminosity', 'color', 'add', 'subtract', 'average', 'pin-light', 'negation', 'source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'darker', 'copy', 'xor']
      // overlap.blendMode = 'color'//modes[num(modes.length)]
      console.log('o length',overlap.children.length)
      trash.remove()
      var unit = new Group();
      // unit.children.push(overlap)

      for (var i = 0; i < repeat; i++) {
        overlap.rotate(360/repeat,line.segments[0].point)
        var cpy = overlap.clone()
        unit.children.push(cpy)
        cpy.remove()
      }
      var newunit = mergeColors(unit);
      unit.children.map(function(ch){ch.remove()})
      unit.remove()
      overlap.remove()

      var group = tiler(newunit,1)
      function tile(unit,count,index){
        if(!index)
          index = 0
        if(index === count)
          return unit

        var outcome = new Group();
        // if(index%2===0)
        // outcome.children.push(unit)
        var turnScaleOffset = {
          '3': {
            turn: 1,
            scale: 1,
            offset: 1
          },
          '4': {
            turn: 1,
            scale: 1,
            offset: 1
          },
          '5': {
            turn: 1,
            scale: 1,
            offset: 1
          },
          '6': {
            turn: .5,
            scale: 2*Math.cos(1/2),
            offset: 5
          },
          '7': {
            turn: 1,
            scale: 1,
            offset: 1
          }
        }
        var vals = turnScaleOffset[repeat]
        line.rotate(vals.turn*(360/repeat),line.segments[0].point)
        line.scale(vals.scale,line.segments[0].point)
        line.segments[1].point = line.getPointAt(line.length-vals.offset)
        var cc = line.clone();
        for (var i = 0; i < repeat; i++) {
          var copy = unit.clone();
          line.rotate((360/repeat),line.segments[0].point)
          copy.position = new Point(line.segments[1].point)
          outcome.children.push(copy)
          // copy.children.forEach(function(p){p.remove()})
          copy.remove()
        }
        return tile(outcome,count,index+1)
      }
      function tiler(unit,count,index){
        var row = new Group()
        var outcome = new Group();
        line.rotate(.5*(360/repeat),line.segments[0].point)
        line.scale(2*Math.cos(1/2),line.segments[0].point)
        line.segments[1].point = line.getPointAt(line.length-5)
        console.log(line.length)
        var width = unit.bounds.width ? (Math.floor(view.bounds.width / unit.bounds.width/2)+3) : 4
        var height = unit.bounds.height ? (Math.floor(view.bounds.height / unit.bounds.height/2)+3) : 4
        console.log(width)
        for (var i = -1*width; i < width; i++) {
          var copy = unit.clone();
          copy.position += new Point(line.segments[0].point-line.segments[1].point)*i
          row.children.push(copy)
          copy.remove()
        }
        for (var i = -1*height; i < height; i++) {
          var copy = row.clone();
          copy.position += new Point(0,line.length)*i
          outcome.children.push(copy)
          copy.remove()
        }

      }
      line.remove()
    }


    function correctUnitZindex(group){
      console.log(group)
      //if we a grandparent
      if(group.children && group.children[0].children && !group.children[0].children[0].hasOwnProperty('children'))
        for (var i = 0; i < group.children[0].children.length; i++) {
          for (var j = 0; j < group.children.length; j++) {
            group.children[j].children[i].sendToBack()
            console.log("brought that shit")
          }
        }

    }


    function mergeColors(slices){
      var result = new Path();
      var results = new Group()
      console.log(slices)
      for (var i = 0; i < slices.children[0].children.length; i++) {
        result.remove()
        result = new Path()
        for (var j = 0; j < slices.children.length; j++) {

          var piece1 = slices.children[j%slices.children.length].children[i]
          console.log(piece1.area)
          if(!result)
            result = piece1
          var piece2 = slices.children[(j+1)%slices.children.length].children[i]
          // console.log(slices.children,slices.children[i%slices.children.length])
          // if(piece1.intersects(piece2))
            result = result.unite(piece2)
        }
        results.children.push(result)
        result.remove()
      }
      // results.position = [200,200]
      return results
    }


    function onMouseDown() {
      go()
    }
---
