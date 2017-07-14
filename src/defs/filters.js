import {extend} from '../utils'
module.exports = {
    blur:function(option){
	    var paper = this;
		var $defs = paper.$defs;
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
	},
	shadow:function(option){
		var paper = this;
		var $defs = paper.$defs;
		option = extend(
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
		//var elemColorMartix = paper.createSVGElement("feColorMartrix").attr("result","martrixOut").attr("in","offOut").attr("type","martrix").attr("values","0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0");
		var elemGaussianBlur = paper.createSVGElement("feGaussianBlur").attr("result","blurOut").attr("in","offOut").attr("stdDeviation",blur);
		var elemBlend = paper.createSVGElement("feBlend").attr("in","SourceGraphic").attr("in2","blurOut").attr("mode","normal");
		filter.append(elemOffset);
		//filter.append(elemColorMartix);
		filter.append(elemGaussianBlur);
		filter.append(elemBlend);
		$defs.append(filter)
		return filter;
	},
	gray:function(id){
		var paper = this;
		id = id || "gray";
		var $defs = paper.select("defs");
		var filter = paper.createSVGElement("filter").attr("id",id);
		var feColorMatrix = paper.createSVGElement('feColorMatrix',{
			values:"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
		});
		filter.append(feColorMatrix);
		$defs.append(filter);
		return filter;
	}
}