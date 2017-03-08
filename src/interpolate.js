import cad from './core'
import Color from './color'
import utils from './utils'
function linear(k) {
	return k;
}
function getInterpolateValue(from,to,dt,ease) {
	ease = ease||linear;
	var ret,key;
	if(utils.isNumber(from) && utils.isNumber(to)) {
		var change = to - from;
		ret = ( from + change*ease(dt) );
	} else if(utils.isPlainObject(from) && utils.isPlainObject(to)) {
		ret = {};
		for(key in from) {
			ret[key] = getInterpolateValue(from[key],to[key],dt,ease);
		}
	}else if(utils.isArray(from) && utils.isArray(to)) {
		ret = [];
		for(key = 0; key < from.length;key++ ) {
			ret[key] = getInterpolateValue(from[key],to[key],dt,ease);
		}
	} else {
		ret = to;
	}
	return ret;
}
function interpolate(from,to,ease){
	if(typeof from =='string' && typeof to =='string') {
		if(Color.getColorByStr(from)&&Color.getColorByStr(to)) {
			var colorFrom = new Color(from).toRgbObj();
			var colorTo = new Color(to).toRgbObj();
			return function(dt) {
				var obj = getInterpolateValue(that,colorFrom,colorTo,dt,ease);
				return new Color(obj).toRgb();
			}
		} else if(utils.isTransform(from)&&utils.isTransform(to)) {
			var TranFrom = utils.parseTransform(from);
			var tranTo = utils.parseTransform(to);
			return function(dt) {
				var obj = that.interpolateObject.call(that,TranFrom,tranTo,ease,dt);
				return utils.getTransform(obj);
			}
		}
	} else {
		return function(dt) {
			return getInterpolateValue(from,to,dt,ease);
		}
	}
}
module.exports = {
	interpolate:interpolate,
	getInterpolateValue:getInterpolateValue
};