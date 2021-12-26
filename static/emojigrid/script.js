var gridHtml;
var entities=[];
var rows = 8;
var current;
var selected = [];
var mouseDown = false;
var ERASER = "";
var mode;
var drag = [];
var randomBrush = false;
var width = 12;

$(".single-column").width(width*24);
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function num(range){
  return Math.floor(Math.random()*range);
}

function getId(el){
  return parseInt($(el).index())+(parseInt($(el).parent().index())*width)

}

function initEditor(){
  $(".editor .block").mousemove(function(){
    if(mouseDown){//drag.length){
      addEntity(randomBrush ? randomEmoji() : current, getId(this));
      if(current.length===1){
        $(this).addClass("letter")
      }
      else {
        $(this).removeClass("letter")
      }
      //$(".editor .block[data-x="+drag[0]+"][data-y="+drag[1]+"]").html(current);
    }
  }).mouseenter(function(){
    $(".editor .block:eq("+getId(this)+")").html(current);
    // if(randomBrush)
      // addEntity(randomEmoji,getId(this))
    $(this).toggleClass("hovering")
  }).mouseleave(function(){
    $(".editor .block:eq("+getId(this)+")").html(entities[getId(this)]);//$(this).html(entities[getId(this)]);
    $(this).toggleClass("hovering")
  }).click(function(){
    addEntity(current, getId(this));
    if(current.length===1){
      $(this).addClass("letter")
    }
    else {
      $(this).removeClass("letter")
    }
  })
}

function initGrid(){
  var emptyGrid = "";
  entities = [];
  var idCount = 0;
  for (var i = 0; i < rows; i++) {
    emptyGrid+= "<span class='line-block'>";
    for (var j = 0; j < width; j++) {
      emptyGrid+= "<span class='block' data-x='"+j+"' data-y='"+i+"'></span>";
      entities.push("")
      idCount++;
    }
    emptyGrid+= "</span>";
  }
  $(".editor").html(emptyGrid)
  initEditor();
}
$("button[name=guides]").click(function(){
  $(".editor").toggleClass("guides")
})
$(".mode").click(function(){
  mode = $(this).text()
})
$("button[name=erase]").click(function(){
  initGrid()
})
$("button[name=eraser]").click(function(){
  updateCurrent(ERASER);
  randomBrush = false;
})
$("input[name=rows]").change(function(){
  updateRows($(this).val())
})
$("input[name=columns]").change(function(){
  updateColumns(parseInt($(this).val()))
})
$("body").on("mousedown",function(){
  mouseDown = true;
}).on("mouseup",function(){
  mouseDown = false;
  drag = [];
});

function updateGrid(){
  // $(".editor").map(function(i,editor){
  //       $(editor).find(".block").map(function(j,block){
  //         if(j>=entities.length){
  //           $(block).remove()
  //         }
  //         $(block).html(entities[j]);
  //       })
  // });
  $(".single-column").html(entities.map(function(e){
    return "<span class='block'>"+e+"</span>";
  }).join(""))
  initEditor();

}

function attachHandlers(){

}

function updateCurrent(entity){
    current = entity;//$(emojiElement).html();
    $("#current").html("current emoji: "+(current === "" ? "ERASER" : current))
}

$(".emoji").click(function(e){
  updateCurrent($(this).html());
})

function updateRows(newRows){
  if(newRows>rows){
    var newHtml = ""
    var lastId = entities.length;
    for (var i = 0; i < newRows-rows; i++) {
      for (var j = 0; j < width; j++) {
        newHtml+= "<span class='block x"+j+" y"+(rows+i)+"'></span>";
        entities.push("")
        lastId++;
      }
    }
    $(".editor").html($(".editor").html()+newHtml);
    initEditor();
  }
  if(newRows<rows){
    entities = entities.slice(0,entities.length-width);
    updateGrid();
  }
  rows = newRows;
}

function updateColumns(newColumns){
  var newEntities = [];
  var addon = [];

  if(newColumns>width){
    for(var j = 0;j<newColumns-width;j++){
        addon.push("")
    }
      for (var i = 0; i < rows; i++) {
        newEntities = newEntities.concat(entities.splice(0,width)).concat(addon);
      }

  }
  if(newColumns<width){
    var counter = 0;
    for (var i = 0; i < rows; i++) {
      var copy = entities.slice();
      newEntities= newEntities.concat(copy.slice(counter,counter+newColumns))
      console.log("reducing columns. entities: ",newEntities,"counter: ",counter,"newCols: ",newColumns)
      counter += width;
      console.log(counter,"condition: ",counter+newColumns,entities.length)
    }
  }
  width = newColumns;
  entities = newEntities;
  $(".single-column").width(width*24);
  updateGrid();
  initEditor();
}

function fillWNumbers(){
  entities = entities.map(function(e,i){return i});
  updateGrid();
}

function randomEmoji(){
  var guess = $(".emoji:eq("+num($(".emoji").length)+")").html();
  return guess.length <2 ? randomEmoji() : guess;
}

function addEntity(entity,id){
  entities[id] = entity;
  updateGrid();
}

function randomFill(){
  entities = entities.map(function(e,i){
    return e.length>1 ? randomEmoji() : "";
  })
  updateGrid();
}

$(window).keypress(function(event){
  current = event.key;
  $(".hovering").html(event.key)
});

$(".copy-html").click(function(e){
  var newHtml = "";
  var anEmoji = $(".emoji:eq(0)").text();
  $(".emojizone").html($(".editor.single-column").html());
  $(".emojizone span").removeAttr("data-y")
  $(".emojizone span").removeAttr("data-x")
  $(".emojizone span").removeAttr("data-id")
  $(".emojizone span").removeClass("block")
  $(".emojizone span").removeClass("class")
  $(".emojizone span").map(function(i,e){
    var txt = $(e).text()
    if(i!==0 && i%width === 0)
      newHtml+="<br>"
    if(txt.length>=1){
      if (txt.charCodeAt(0)<200) {
        newHtml+= "<em>"+txt+"</em>"
      }
      else{
        newHtml+= txt
      }
    }
    else{
      newHtml+= "<span>"+anEmoji+"</span>"
    }
  });
  console.log(newHtml)
  $(".emojizone").html(newHtml);
  $(".output").text($(".temp").html().replaceAll(' class=""',''));
  // $(".output").text($(".output").text($(".temp").html().replaceAll(' class=""','')));
  $(".output").select();
  document.execCommand("copy");
  // console.log(he.encode($(".editor.single-column").html()))
});

$(".copy-text1").click(function(e){
  $(".output").text($(".editor.single-column").text());
  $(".output").select();
  document.execCommand("copy");
  // console.log(he.encode($(".editor.single-column").html()))
});

$(".random-fill").click(function(e){
  randomFill();
});
$(".random-brush").click(function(e){
  randomBrush = !randomBrush;
});


$(".copy-text2").click(function(e){
  $(".output").text($(".editor.double-column").text());
  $(".output").select();
  document.execCommand("copy");
  // console.log(he.encode($(".editor.single-column").html()))
});

initGrid()
updateCurrent($(".emoji:eq("+num($(".emoji").length)+")").html())
