module.exports = {
	line:function(angle,gap){
		var paper = this;
		var $defs = paper.select("defs");
		var width,height;
		var patternUnits = ['objextBoundingBox','userSpaceOnUse'];
		width = Math.abs(gap/Math.cos(angle*Math.PI/180));
		height = Math.abs(gap/Math.sin(angle*Math.PI/180));
		var $pattern = paper.createSVGElement("pattern",{
			width:width-1,
			height:height-1,
			patternUnits:patternUnits[1],
			patternContentUnits:patternUnits[1]
		});
		if(angle%90!==0) {
			var $line = paper.createSVGElement("line")
							.attr("x1",0)
							.attr("y1",0)
							.attr("x2",width)
							.attr("y2",height)
							.attr("stroke","#fff")
							.attr("stroke-width",1)
							.attr("stroke-linecap","square");
			$pattern.append($line);
		} else {

		}
		$defs.append($pattern);
		return $pattern;
	}
}