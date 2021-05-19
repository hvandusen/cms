---
templateKey: work
title: Digital clock
type: Candusen page
draft: true
date: 2020-07-29T15:23:49.527Z
date-finish: 2021-05-19T15:57:02.505Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600434043/Screen_Shot_2020-09-18_at_9.00.20_AM_rka7gc.png
paper_code:
  code: >
    var clock = new Group();

    var digits = [];

    var theTime = ""


    var timeObj = {         //   0
      "0": [0,1,2,4,5,6],   //1     2
      "1": [2,5],           //   3
      "2": [0,2,3,4,6],     //4     5
      "3": [0,2,3,5,6],     //   6
      "4": [1,2,3,5],
      "5": [0,1,3,5,6],
      "6": [0,1,3,4,5,6],
      "7": [0,2,5],
      "8": [0,1,2,3,4,5,6],
      "9": [0,1,2,3,5,6],
    }

    var background;

    function setBgnd(){
    	counter = Math.floor(Math.random()*1536);
    	speed = 1+Math.floor(Math.random()*3)
    	difference = 100+Math.random()*100
    	background = new Path.Rectangle(view.bounds.size*2);
      background.opacity = .6
      background.fillColor = {
        gradient:{
        	stops:[[colorWheel(counter),'0'],[colorWheel(counter+difference),'.5'],[colorWheel(counter+difference),'1']]},
        	origin: [0,Math.random()*screen.availHeight],
        	destination: [screen.availWidth+150,Math.random()*screen.availHeight]
        }
      background.sendToBack()
      }
    setBgnd()


    function orientClock(){
      clock.fitBounds(view.bounds.size)
      clock.scale(.9)
      clock.position = view.bounds.center
    }


    project.importSVG("img/clock-2.svg",function(files,i){
      clock.children = files.children.reverse();
      clock.children.forEach(function(child){
        lightSegment(child,true)
      })
      orientClock()
      for (var i = 0; i < 4; i++) {
        digits.push(new Group(
          clock.children.slice(2,9)
        ))
      }
      clock.children = clock.children.concat(digits)
    });


    function lightSegment(path,dim){
      path.set({
        fillColor: prettyRaCo(),
        opacity: dim ? 0.01 : 1
      })
    }


    setInterval(function(){
      getTime(function(time){
        time.forEach(function(digit,i){
          timeObj[digit].forEach(function(digitSlot,j){
            lightSegment(digits[i].children[digitSlot])
          })
        })
        lightSegment(clock.children[0])
        lightSegment(clock.children[1])
      })
    },1000)


    function getTime(updateClock) {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = (hours+""+minutes).split("");
      if(theTime[3] != strTime[3]){
        theTime = strTime
        updateClock(theTime)
      }
      return strTime;
    }


    function onResize(){
      orientClock()
    }
---
