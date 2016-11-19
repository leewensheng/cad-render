import cad from './core'
import paper from './paper'
import $ from 'jquery'
$.fn.svgFilter = function(name) {
	if(name&&name!="none") {
		this.attr("filter",'url(#' + name + ')');
	} else {
		this.attr("filter","");
	}
}
paper.fn.useFilter = function(name,option){
	var me = this;
	if(typeof cad.filters[name] === "function") {
		var filter = cad.filters[name];
		filter.call(me,me,option);
	}
	return this;
}
cad.extend({
	filters:{},
	defineFilter:function(name,filter){
		cad.filters[name] = filter;

	}
})
cad.defineFilter("blur",function(paper,option){
 var $defs = paper.select("defs");
 var id = "blur";
 var stdDeviation = option;
 var filter = paper.createSVGElement("filter").attr("id",id);
 var elem = paper.createSVGElement("feGaussianBlur")
 				 .attr("in","SourceGraphic")
 				 .attr("stdDeviation",stdDeviation);
 filter.append(elem);
 $defs.append(filter);
 return filter;
})
cad.defineFilter("shadow",function(paper,option){
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