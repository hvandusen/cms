---
templateKey: work
title: Analog clock
type: Candusen page
date: 2015-07-29T15:21:00.000Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600434044/Screen_Shot_2020-09-18_at_8.58.54_AM_avj6j7.png
paper_code:
  code: >
    c = project.view.center

    d = new Date();

    size = screen.availHeight/2.5

    notch1 = prettyRaCo()

    notch2 = prettyRaCo()

    notch3 = prettyRaCo()

    notches = []

    var background = new Path.Rectangle(0,0,4000,4000);


    function gradient(shape,stops,p1,p2){
    	shape.fillColor = {
    		gradient:{
    			stops:[notch2,notch3,notch1]},
    			origin: [0,Math.random()*screen.availHeight],
    			destination: [screen.availWidth,Math.random()*screen.availHeight]
    					};
    }


    background.fillColor = {
    		gradient:{
    			stops:[notch2,notch3,notch1]},
    			origin: [0,Math.random()*screen.availHeight],
    			destination: [screen.availWidth,Math.random()*screen.availHeight]
    					};

    var frame = new Path.Circle(c,size);

    frame.opacity = .5

    frame.strokeColor = {
    		gradient:{
    			stops:[notch1,notch3,notch2]},
    			origin: [0,Math.random()*screen.availHeight],
    			destination: [screen.availWidth,Math.random()*screen.availHeight]
    					};

    frame.strokeWidth = 40

    frame.fillColor = {
    		gradient:{
    			stops:[notch1,notch3,notch2]
    			},
    			origin: [Math.random()*screen.availWidth,0],
    			destination: [Math.random()*screen.availWidth,screen.availHeight]
    		};

    var guide = new Path([c,c+[0,-size]])

    guide.strokeWidth = 1;



    notchSize = 3;

    for(var i=0;i<60;i++){

    	notches.push(new Point(guide.segments[1].point.x,guide.segments[1].point.y))
    	if(i%5===0){
    	 new Path.Circle(guide.segments[1].point,notchSize+4).fillColor = notch1
    	 }
    	 else {
    		 new Path.Circle(guide.segments[1].point,notchSize+2+(i%5)).fillColor = notch2
    	 }
    	 guide.rotate(6,c)
    }


    var hours = new Path([c,c+[0,-size]])

    hours.strokeColor = prettyRaCo()

    hours.strokeWidth = 23


    var minutes = new Path([c,c+[0,-size]])

    minutes.strokeColor = prettyRaCo()

    minutes.strokeWidth = 15


    var seconds = new Path([c,c+[0,-size]])

    seconds.strokeColor = prettyRaCo()

    seconds.strokeWidth = 8


    var circles = []

    for(var i=0;i<3;i++){
    	circle = new Path.Circle(400,400,(i+1)*6)
    	circle.fillColor = [notch1,notch2,notch3][i]
    	circle.strokeColor = [notch3,notch1,notch2][i]
    	circle.strokeWidth = 15;
    	circle.visible = false;
    	circles.push(circle)
    }


    var nip = new Path.Circle(c,size/15);

    nip.fillColor = notch1

    var group = new Group([hours,minutes,seconds,nip]);

    group.strokeCap = 'round'

    group.strokeColor = {
    		gradient:{
    			stops:[notch1,notch3,notch2]
    			},
    			origin: [Math.random()*screen.availWidth,0],
    			destination: [Math.random()*screen.availWidth,screen.availHeight]
    		};


    function time(){
    	d = new Date();
    	return [d.getHours(),d.getMinutes(),d.getSeconds()]//Date().split(" ")[4].split(':')
    }


    function updateThatIsh(t){
    	secs = (t[2]/60)*Math.PI
    }

    var current = 0

    function onFrame(event){
    	t = time()
    		updateThatIsh(t)
    }


    //whatever i just wrote it twice cus it works, if you're reading this, fuck off, jk, what's up??

    //if you're reading this please send me an email and i will mail you some prints i made free of charge!!!!
    	t = time();
          seconds.segments[1].point = notches[t[2]]//rotate(6,c)
          seconds.visible = true;
          circles[0].position = notches[t[2]]
    	  minutes.segments[1].point = notches[t[1]]

    	  circles[1].position = notches[t[1]]

    	  hours.segments[1].point = notches[(t[0]%12)*5]

    	  circles[2].position = notches[(t[0]%12)*5]



    function start() {
      var wrapper = function() {
        return function sick() {
          t = time();
          seconds.segments[1].point = notches[t[2]]//rotate(6,c)
          circles[0].position = notches[t[2]]
    	  minutes.segments[1].point = notches[t[1]]
    	  circles[1].position = notches[t[1]]
    	  hours.segments[1].point = notches[(t[0]%12)*5]
    	  circles[2].position = notches[(t[0]%12)*5]
        };
      }(); // Note we are actually invoking this function but it returns another function which is what then gets scheduled.
      setInterval(wrapper, 1000);
    }

    start();
---
