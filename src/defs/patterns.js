module.exports = {
	line:function(angle,gap){
		var paper = this;
		var $defs = paper.select("defs");
		var width,height;
		var patternUnits = ['objextBoundingBox','userSpaceOnUse'];
		var x1,y1,x2,y2;
		if(angle%90!==0) {
			width = Math.abs(gap/Math.sin(angle*Math.PI/180));
			height = Math.abs(gap/Math.cos(angle*Math.PI/180));
			if(Math.tan(angle*Math.PI/180) < 0) {
				x1 = 0,y1=height,x2 = width,y2 = 0;
			}  else {
				x1 = y1 = 0,x2 = width,y2 = height;
			}
		} else {
			width = height = gap;
			if(angle%180==0) {
				//水平
				x1 = 0, y1 = gap/2,x2 = gap,y2  = gap/2;
				
			} else {
				//垂直
				x1 = gap/2,y1 = 0,x2 = gap/2,y2 = gap;
			}
		}
		var $pattern = paper.createSVGElement("pattern",{
			width:width,
			height:height,
			patternUnits:patternUnits[1],
			patternContentUnits:patternUnits[1],
			stroke:"#f00"
		});
		var $line =	paper.createSVGElement("line")
						 .attr("x1",x1)
						 .attr("y1",y1)
						 .attr("x2",x2)
						 .attr("y2",y2)
						 .attr("stroke-linecap","square");
			$pattern.append($line);
		$defs.append($pattern);
		return $pattern;
	},
	block:function(size) {
		var paper = this;
		var $defs = paper.select("defs");
		var width,height;
		var patternUnits = ['objextBoundingBox','userSpaceOnUse'];
		width = size*2,height = size;
		var $pattern = paper.createSVGElement("pattern",{
			width:width,
			height:height,
			patternUnits:patternUnits[1],
			patternContentUnits:patternUnits[1],
			stroke:"yellow"
		});
		$defs.append($pattern);
		paper.temporarySwitchLayer($pattern,function(){
			paper.line(0,0,width,0);
			paper.line(0,height/2,width,height/2);
			paper.line(0,height,width,height);
			paper.line(width/4,0,width/4,height/2);
			paper.line(width*3/4,0,width*3/4,height/2);
			paper.line(width/2,height/2,width/2,height);
			paper.line(width,height/2,width,height);
		})
		return $pattern;
	}
}