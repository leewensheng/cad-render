module.exports = {
	linearGradient:function(option){
		var paper = this;
		var $defs = paper.select("defs");
		option = cad.extend(true,
				{
					id:"linearGradient",
					x1:"0%",
					x2:"0%",
					y1:"0%",
					y2:"100%",
					stops:[{

					}]
				},option);
		var id = option.id,x1 = option.x1,x2 = option.x2,y1 =option.y1,y2 = option.y2,stops = option.stops;
		var linearGradient  = paper.createSVGElement("linearGradient ",{x1:x1,x2:x2,y1:y1,y2:y2,id:id});
		for(var i = 0 ;i  < stops.length; i++) {
			var stop = stops[i];
			var offset = stop.offset,color = stop.color,opacity = 1;
			if(typeof stop.opacity != 'undefined') {
				opacity = stop.opacity;
			} 
			var el = paper.createSVGElement("stop").attr("offset",offset).attr("stop-color",color).attr("stop-opacity",opacity);
			linearGradient.append(el);
		}
		$defs.append(linearGradient);
		return linearGradient;
	},
	radialGradient:function(option){
		var paper = this;
		var $defs = paper.select("defs");
		option = cad.extend(true,
				{
					id:"radialGradient",
					cx:"50%",
					cy:"50%",
					r:"50%",
					fx:"50%",
					fy:"50%",
					stops:[{

					}]
				},option);
		var id = option.id,cx = option.cx,cy = option.cy,r = option.r,fx = option.fx,fy=option.fy,stops = option.stops;
		var radialGradient  = paper.createSVGElement("radialGradient",{id:id,cx:cx,cy:cy,r:r,fx:fx,fy:fy});
		for(var i = 0 ;i  < stops.length; i++) {
			var stop = stops[i];
			var offset = stop.offset,color = stop.color,opacity = 1;
			if(typeof stop.opacity != 'undefined') {
				opacity = stop.opacity;
			} 
			var el = paper.createSVGElement("stop").attr("offset",offset).attr("stop-color",color).attr("stop-opacity",opacity);
			radialGradient.append(el);
		}
		$defs.append(radialGradient);
		return radialGradient;
	}
}