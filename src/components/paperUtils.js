const installOldFunctions = (window,paper) => {
  if(typeof window === "undefined")
    return
    window.num = (range) => Math.floor(Math.random()*range)
    window.colorWheel = (entry) =>
            {
                if(entry<0)
                  entry = 1535-(-entry%1535)
                else
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
    window.prettyRaCo = () => {
      var colorWheel =  Math.floor(Math.random()*6);

        var color = "rgb(";
        var randomNumber =  Math.floor(Math.random()*256);
        if(colorWheel === 0)
        color= color+ "0,255,"+randomNumber+")";
         if(colorWheel === 1)
        color= color+ "0,"+randomNumber+",255)";
         if(colorWheel === 2)
        color= color+ "255, 0,"+randomNumber+")";
         if(colorWheel === 3)
        color= color+ "255,"+randomNumber+",0)";
         if(colorWheel === 4)
        color= color+ randomNumber+",255,0)";
         if(colorWheel === 5)
        color= color+ randomNumber+",0,255)";
        return color;

    }
    window.grid = function(x,y,size,color){
    var columns = [], width,height;
		this.groups = new paper.Group();
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
			this.groups.children.push(new paper.Group());
			for(var j=0;j<y;j++){
				columns[i][j] = new paper.Path.Rectangle(i*width,j*height,width,height);
				//columns[i][j].scale(2)
				this.groups.children[i].children.push(columns[i][j]);
				}
			//groups[i].scale(3);

		}
		this.columns = columns;
    this.modify = function(fn){
      this.groups.children.forEach(function(column,i){
        column.children.forEach(function(path,j){
          path.set(fn(i,j));
        })
      })
    }
    this.clear = function(){
      this.groups.children.forEach(function(column,i){
        column.children.forEach(function(path,j){
          path.remove();
        })
        column.remove();
      })
      this.groups.remove()
    }
		return this;
  }

}
export default installOldFunctions
