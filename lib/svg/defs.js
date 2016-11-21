import cad from './core'
import paper from './paper'
import $ from 'jquery'

cad.extend({
	$$defs:{},
	registDefs:function(name,def){
		cad.$$defs[name] = def;
	}
})
$.fn.useDefs = function(attr,name) {
	if(name&&name!="none") {
		this.attr(attr,'url(#' + name + ')');
	} else {
		this.removeAttr(attr);
	}
	return this;
}
paper.fn.importDefs = function(name,option){
	var me = this;
	if(typeof cad.$$defs[name] === "function") {
		var def = cad.$$defs[name];
		def.call(me,me,option);
	}
	return this;
}

//滤镜
cad.registDefs("blur",function(paper,option){
 var $defs = paper.select("defs");
 var id = "blur";
 var stdDeviation = option;
 if(typeof option == "undefined") {
 	stdDeviation = 10;
 }
 var filter = paper.createSVGElement("filter").attr("id",id);
 var elem = paper.createSVGElement("feGaussianBlur")
 				 .attr("in","SourceGraphic")
 				 .attr("stdDeviation",stdDeviation);
 filter.append(elem);
 $defs.append(filter);
 return filter;
})
cad.registDefs("shadow",function(paper,option){
	var $defs = paper.select("defs");
	option = cad.extend(true,
			{
				id:"shadow",
				offsetX:20,
				offsetY:20,
				blur:10
			},option);
	var id = option.id;
	var offsetX = option.offsetX;
	var offsetY = option.offsetY;
	var blur = option.blur;
	var filter = paper.createSVGElement("filter").attr("id",option.id);
	var elemOffset = paper.createSVGElement("feOffset").attr("result","offOut").attr("in","SourceGraphic").attr("dx",offsetX).attr("dy",offsetY);
	var elemColorMartix = paper.createSVGElement("feColorMartrix").attr("result","martrixOut").attr("in","offOut").attr("type","martrix").attr("values","0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0");
	var elemGaussianBlur = paper.createSVGElement("feGaussianBlur").attr("result","blurOut").attr("in","martrixOut").attr("stdDeviation",blur);
	var elemBlend = paper.createSVGElement("feBlend").attr("in","SourceGraphic").attr("in2","blurOut").attr("mode","normal");
	filter.append(elemOffset);
	filter.append(elemColorMartix);
	filter.append(elemGaussianBlur);
	filter.append(elemBlend);
	$defs.append(filter)
	return filter;
})


cad.registDefs("linearGradient",function(paper,option){
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
})

cad.registDefs("radialGradient",function(paper,option){
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
})
