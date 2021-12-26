---
templateKey: work
title: Basket
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1640540072/Screen_Shot_2021-12-26_at_12.34.15_PM_xsrp7e.png
featured: false
draft: false
date: 2021-12-26T17:32:15.545Z
date-finish: 2021-12-26T17:32:15.551Z
paper_code:
  code: >-
    var inputMinMax = {
      bunchSpace: [0,100,'Space btw groups'],// bunchSpace,
      strWidth: [1,100,'String width'],// strWidth,
      bunchWidth: [1,6,'Size of groups'],// bunchWidth,
      strSpace: [0,10,'Space within groups'],// strSpace,
      period: [0,100,'Period'],// num(1000),
      baseColorX: [0,1536,'Row start color'],// num(1536),
      baseColorY: [0,1536,'Column start color'],// num(1536),
      speed: [4,50,'Speed'],// num(50),
      colorDiff: [5,1536,'Color diff btw groups'],// 5+num(100),
      colorSubDiff: [0,1536,'Color diff within groups']// num(100),
    }



    var isMobile = window.innerWidth<480;

    if(isMobile){
      $('.showMenu').hide();
    }

    var movementVector = new Point();


    var grid = generateGrid();

    makeVerts(grid);

    makeHoris(grid);

    setupMenu();


    function makeVerts(grid){

      for(var i=0;i<grid.columns;i++){
        for(var j=0;j<grid.bunchWidth;j++){
          var x = i*grid.totalWidth+j*grid.strWidth+j*grid.strSpace;
          var line = new Path({
            segments: [[x,0],[x,view.bounds.height]],
            strokeWidth: grid.strWidth,
            strokeColor: colorWheel(grid.baseColorX+i*grid.colorDiff+j*grid.colorSubDiff)
          });
          line.data.color = grid.baseColorX+i*grid.colorDiff+j*grid.colorSubDiff;
          grid.columnGroup.children.push(line);
        }

      }
      return grid.columnGroup;
    }


    function makeHoris(grid){
      for(var i=0;i<grid.rows;i++){
        for(var j=0;j<grid.bunchWidth;j++){
          var y = i*grid.totalWidth+j*grid.strWidth+j*grid.strSpace;
          var line = new Path({
            segments: [[0,y],[view.bounds.width,y]],
            strokeWidth: grid.strWidth,
            strokeColor: colorWheel(grid.baseColorY+i*grid.colorDiff+j*grid.colorSubDiff)
          });
          line.data.color = grid.baseColorY+i*grid.colorDiff+j*grid.colorSubDiff;
          grid.rowGroup.children.push(line);
          if(i%2===0)
            line.sendToBack();
        }
      }
      return grid.rowGroup;
      //return horizontalGroup;
    }


    var modify;

    if(Math.random()>.5)
      modify = function (grid){
      return grid.speed*Math.sin((Math.cos(grid.time/grid.period)));
    }

    else {
      modify = function (grid){
      return grid.speed*(Math.cos(grid.time/grid.period));
    }

    }


    var modX = function(grid){
      return grid.speed*(Math.sin(grid.time/grid.period));
    }

    var modY = function(grid){
      return Math.abs(grid.speed*(Math.cos(grid.time/grid.period)));
    }


    function onFrame(event){
      if(!grid.rowGroup)
        return;
      grid.time++;
      grid.rowGroup.children.map(function(e,i){
        e.data.color += modX(grid);
        e.strokeColor = colorWheel(e.data.color);
      });
     grid.columnGroup.children.map(function(e,i){
       e.data.color +=modY(grid);
       e.strokeColor = colorWheel(e.data.color);
     });
    }


    function onMouseMove(e){
      movementVector = (view.center-e.point).normalize();
    }

    function onMouseDown(e){
      grid = generateGrid();
      makeVerts(grid);
      makeHoris(grid);
    }


    function generateGrid(options){
      project.activeLayer.clear();
      var bunchSpace = num(10);
      var strWidth = 1+num(8);
      var strSpace = num(strWidth);
      var bunchWidth = 1+num(5);
      var totalWidth = strSpace*bunchWidth+strWidth*bunchWidth +bunchSpace;
      var setProp = function(options){
        Object.keys(options).map(function(e){
          if(that[e])
          that[e] = options[e]
        });
      }
      var that =  {
        rowGroup : new Group(),
        columnGroup : new Group(),
        bunchSpace: bunchSpace,
        strWidth: strWidth,
        bunchWidth: bunchWidth,
        strSpace: strSpace,
        period: num(1000),
        baseColorX: num(1536),
        baseColorY: num(1536),
        totalWidth: strSpace*bunchWidth+strWidth*bunchWidth +bunchSpace,
        columns: Math.ceil(window.innerWidth/totalWidth),
        rows: Math.ceil(window.innerHeight/totalWidth),
        speed: 4+num(20),
        colorDiff: 5+num(100),
        colorSubDiff: num(100),
        time: 0,
        setProp: setProp
      }
      if(options){
        console.log('overwrote option')
        console.log(options);
        Object.keys(options).map(function(e,i){
          if(that[e])
            that[e] = options[e];
        })
        that.totalWidth = that.strSpace*that.bunchWidth+that.strWidth*that.bunchWidth +that.bunchSpace;
        that.columns = Math.ceil(window.innerWidth/that.totalWidth);
        that.rows = Math.ceil(window.innerHeight/that.totalWidth);
      }
      console.log(that)
      return that;
    }


    function onKeyDown(event) {
      var settings = {};
      Object.keys(grid).map(function(e){
        if(e.indexOf('Group')<0)
          settings[e] = grid[e];
      });
    }


    function setupMenu(){
      var inputs = '';
      $('label').remove();
      Object.keys(grid).map(function(e,i){
        if(grid[e]>=0 && inputMinMax[e])
        inputs += '<label data-name="'+ e +'">'+ inputMinMax[e][2] +'<input step=".1"  type="'+ (isMobile ? 'number' : 'range') +'" value="'+ grid[e] +'" min="'+ inputMinMax[e][0] +'" max="'+ inputMinMax[e][1] +'"></input></label>';
      });
      $('.menu').html(inputs+$('.menu').html());
    }


    $(".menu").on("input change", function(e) {
      var inputVals = {};
      var getProps = $('input').map(function(i,e){
        inputVals[$(e).closest('label').attr('data-name')] = e.valueAsNumber;
      });
      console.log(inputVals)
      var val = e.target.valueAsNumber;
      var prop = $(e.target).closest('label').attr('data-name');
      //grid.setProp(prop,val);
      grid = generateGrid(inputVals);
      makeVerts(grid);
      makeHoris(grid);
    });


    $(document).on('click','.newGrid',function(e){
      console.log(e)
      grid = generateGrid();
      makeVerts(grid);
      makeHoris(grid);
      setupMenu();
    });


    $(document).on('click','.showMenu',function(e){
      $('.menu').toggleClass('show');
    });
---
<style>
  @media(max-width:480px){
    .showMenu {
      font-size: 16px;
    }
  }
  .menu {
    position: fixed;
    bottom: 0;
    right: 0;
    background: transparent;
    font-size: 16px!important;
  }
  .menu label {
  display: none;
  padding-bottom: 5px;
  text-align: right;
}
  .menu.show label {
    display: inherit;
    position: relative;
  }
  .menu.show label:after{
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: white;
    filter: blur(33px);
    -webkit-filter: blur(33px);
  }
  button {
    font-size: 30px;
    font-family: SwissRounded;
    background: white;
  }
  .showMenu {
    font-size: 20px;
    background-image: url('options.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100%;
    width: 50px;
    height: 50px;
    float: right;
    padding: 0 15px;
  }
  .newGrid {
    background-image: url('newGrid.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    width: 50px;
    height: 50px;
    float: right;
  }

</style>
<div class='menu'>
    <button class='newGrid'>
    </button>
    <button class='showMenu'>
    </button>
  </div>
