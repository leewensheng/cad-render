import Color from './color/core'
import utils from './utils'
import Path from './path'
function getInterpolateValue(from,to,dt) {
	var ret,key;
	if(utils.isNumber(from) && utils.isNumber(to)) {
		var change = to - from;
		ret = ( from + change * dt);
	} else if(utils.isPlainObject(from) && utils.isPlainObject(to)) {
		ret = {};
		for(key in from) {
			ret[key] = getInterpolateValue(from[key],to[key],dt);
		}
	}else if(utils.isArray(from) && utils.isArray(to)) {
		ret = [];
		for(key = 0; key < to.length;key++ ) {
			ret[key] = getInterpolateValue(from[key],to[key],dt);
		}
	} else {
		ret = to;
	}
	return ret;
}
function interpolate(from,to){
	if(typeof from =='string' && typeof to =='string') {
		if(Color.parse(from)&&Color.parse(to)) {
			var colorFrom = new Color(from).toRgbObj();
			var colorTo = new Color(to).toRgbObj();
			return function(dt) {
				var obj = getInterpolateValue(colorFrom,colorTo,dt);
				return new Color(obj).toRgb();
			}
		} else if(utils.isTransform(from)&&utils.isTransform(to)) {
			var TranFrom = utils.parseTransform(from);
			var tranTo = utils.parseTransform(to);
			return function(dt) {
				var obj = getInterpolateValue(TranFrom,tranTo,dt);
				return utils.getTransform(obj);
			}
		}
	} else {
		return function(dt) {
			return getInterpolateValue(from,to,dt);
		}
	}
}
function interpolateObject(from,to){
	return function(dt) {
		return getInterpolateValue(from,to,dt);
	}
}
function interpolateTransform(from,to) {
	from =  from ||"";
	to = to || "";
	var TranFrom = utils.parseTransform(from);
	var tranTo = utils.parseTransform(to);
	return function(dt) {
		var obj = getInterpolateValue(TranFrom,tranTo,dt);
		return utils.getTransform(obj);
	}
}
function interpolatePath(from,to){
	if(! (from instanceof Path)) {
		from  = new Path(from);
	}
	if(! (to instanceof Path)) {
		to  = new Path(to);
	}
	return function(dt){
		var obj = getInterpolateValue(from.pathStack,to.pathStack,dt);
		var path = new Path();
		path.pathStack = obj;
		path.refreshXY();
		return path.toString();
	}
}
function interpolateColor(from,to){
	var colorFrom = new Color(from).toRgbObj();
	var colorTo = new Color(to).toRgbObj();
	return function(dt) {
		var obj = getInterpolateValue(colorFrom,colorTo,dt);
		return new Color(obj).toRgb();
	}
}
module.exports = {
					interpolate,
					interpolateObject,
					interpolateTransform,
					interpolatePath,
					interpolateColor,
					getInterpolateValue

};