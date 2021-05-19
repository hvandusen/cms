---
templateKey: work
title: One line
type: Candusen page
featured: false
draft: false
date: 2020-07-31T13:17:39.068Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600438038/Screen_Shot_2020-09-18_at_10.06.45_AM_afi6j1.png
paper_code:
  code: >-


    function genGrid(x,y,size){
      var columns = [];
          var groups = [];
          var offset = Math.floor(Math.random()*1536)
          width = window.innerWidth/x;
          height = window.innerHeight/y;
          if(size!==undefined){
              width = size;
              height = size;
              x = Math.ceil(window.innerWidth/size);
              y = Math.ceil(window.innerHeight/size);
          }
          for(var i=0;i<x;i++){
              columns[i] = [];
              groups[i] = new paper.Group();
              for(var j=0;j<y;j++){
                  columns[i][j] = new paper.Path.Rectangle(i*width,j*height,width,height);
                  columns[i][j].fillColor = colorWheel(offset+((i*j)/(x*y)*1536));//prettyRaCo();
                  //columns[i][j].scale(2)
                  groups[i].children.push(columns[i][j]);
                  }
              //groups[i].scale(3);

          }
          this.columns = columns;
          return groups;
    }


    function sketch(){
       project.activeLayer.clear()
       var g = genGrid(0,0,200)
       var all = new Group();
       g.map(function(e){
         e.children.map(function(f){
           if(f.fillColor)
           f.fillColor = "white"
           all.children.push(f)
         })
       })

       var children = all.children.slice();
       shuffle(children)

       var path = new Path({strokeColor: "black"});
       path.add(children[0].position)
       path.closed = true;

       for (var i = 1; i < children.length-1; i+=2) {
         var choice = ["arcTo","add","curveTo"][num(3)]
         console.log(choice,children[i+1].position,children[i].position+[0,1])
         try {
          path[choice](children[i+1].position,children[i].position)
         } catch(error) {
          path[["add","curveTo"][num(2)]](children[i+1].position,children[i].position)  
         }
       }

       path.fitBounds(view.bounds)
       path.scale(.9)
       return path;
     }

     function onMouseDown(){
         sketch()
     }
     sketch()
---
