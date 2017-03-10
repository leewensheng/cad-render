import cad from './core'
import Color from './color'
import utils from './utils'
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
		for(key = 0; key < from.length;key++ ) {
			ret[key] = getInterpolateValue(from[key],to[key],dt);
		}
	} else {
		ret = to;
	}
	return ret;
}
function interpolate(from,to){
	if(typeof from =='string' && typeof to =='string') {
		if(Color.getColorByStr(from)&&Color.getColorByStr(to)) {
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
module.exports = {
	interpolate:interpolate,
	interpolateTransform:interpolateTransform,
	getInterpolateValue:getInterpolateValue
};