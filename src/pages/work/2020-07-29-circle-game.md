---
templateKey: work
title: Circle game
type: Candusen page
date: 2020-07-29T15:45:20.158Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600788273/Screen_Shot_2020-09-22_at_11.24.13_AM_ke8drp.png
paper_code:
  code: >
    var ctr = new Point(window.innerWidth*2,window.innerHeight*2);

    var bounds = new Point(window.innerWidth*2,window.innerHeight);

    //new Path.Circle(ctr,10,10).fillColor = 'red'

    var spex = {
      x:Math.floor(Math.random()*40),
      y:Math.floor(Math.random()*40),
      size: 3+Math.random()*15,
    }

    var count = Math.floor(Math.random()*1536);

    var speed = 1+Math.floor(Math.random()*3)

    var difference = 100+Math.random()*100

    var background = new Path.Rectangle(view.bounds);
    	background.fillColor = {
    		gradient:{
    			stops:[[whl(count),'0'],[whl(count+difference),'.5'],[whl(count+difference),'1']]},
    			origin: [0,Math.random()*screen.availHeight],
    			destination: [screen.availWidth+150,Math.random()*screen.availHeight]
    					}



    					
    /*}

    var background = new Path.Rectangle(view.bounds);

    gradient(background,[0,[prettyRaCo(),prettyRaCo(),prettyRaCo()],Math.random()*screen.availHeight],[screen.availWidth,Math.random()*screen.availHeight])*/

    var bls = new Group();

    var whs = new Group();

    var bs; //= new Symbol(black);

    var ws;

    function initDots(){
    	black = new Path.Circle([0,0],spex.size);
    	white = new Path.Circle([0,0],spex.size);
    	black.strokeWidth=1
    	black.strokeColor = 'black'
    	white.strokeWidth=1
    	white.strokeColor = 'black'
    	black.fillColor = 'black'
    	white.fillColor = 'black'
    	bs = new Symbol(white);
    	ws = new Symbol(black)



    	
    }


    initDots();


    function gen(specs){
      //project.activeLayer.clear()
      for(var i =0;i<specs.x;i++){
        for(var j =0;j<specs.y;j++){
          r = [Math.random()]
          //c = new Path.Circle([(.5+i)*(bounds.x/specs.x),(j+.5)*(bounds.y/specs.y)],specs.size);
          if(Math.random()>.5)
            {c = ws.place([(.5+i)*(bounds.x/specs.x),(j+.5)*(bounds.y/specs.y)])
            whs.children.push(c)
            }
          else
            {c = bs.place([(.5+i)*(bounds.x/specs.x),(j+.5)*(bounds.y/specs.y)])
            bls.children.push(c)}
          c.fillColor = prettyRaCo()//'black'
          c.balls = (Math.random()>.5);
          //c.fillColor = (c.balls == true? 'black' : 'white')
        }
      }
    }



    gen(spex);


    function whl(entry)
            {
                var key;
                entry = entry%1535
                var text = "rgb(";
                var num = entry%256;
                if(entry >= 0 && entry < 256)
                	text= text+ "0,255,"+num+")";
                else if(entry>255 && entry<512)
    				text= text+ "0,"+(255-num)+",255)";
    			else if(entry>511 && entry<768)
                	text= text+ num +",0,255)";
    			else if(entry>767 && entry<1024)
                	text= text+ "255,0,"+(255-num)+")";
                else if(entry>1023 && entry<1280)
                	text= text+ "255,"+num+",0)";
                else if(entry>1279 && entry<1535)
                	text= text+ (255-num)+",255,0)";       
                return text;
            }


    function onMouseMove(ev){
      bls.position += ev.delta*1.3
      whs.position -= ev.delta*1.3
      pt = [ev%window.outerWidth,ctr.y]
      stopLocation = .5+Math.sin(ev.count/100)*.5
      percentString = stopLocation.toString();
      count+=speed;
     background.fillColor = {
    		gradient:{
    			stops:[[whl(count),'0'],[whl(count+difference),percentString],[whl(count+difference),'1']]},	
    			origin: [-50,screen.availHeight/2],
    			destination: [screen.availWidth+150,screen.availHeight/2]
    					}
    }






    function onMouseDown(){
    	project.activeLayer.clear();
    	save = background.fillColor
    	initDots();
    	background = new Path.Rectangle(view.bounds);
    	background.fillColor = save;
      spex = {
        x:1+Math.floor(Math.random()*30),
        y:1+Math.floor(Math.random()*30),
        size: 3+Math.random()*15
      }
      gen(spex);
    }
---
