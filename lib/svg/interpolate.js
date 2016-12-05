import cad from './core'
import Color from './color'
var linear = function(dt) {
	return dt;
}
cad.extend({
	interpolates:{},
	interpolate:function(from,to,ease){
		var that = this;
		if(typeof from=='number' && typeof to =='number') {
			return function(){
				var dt = arguments[0];
				return that.interpolateNumber.call(null,from,to,ease,dt);
			}
		} else if(from instanceof Array && to instanceof Array) {
				return function(dt) {
					that.interpolateArray.call(that,from,to,dt,ease);
				}
		} else if( typeof from =='object' && typeof to == 'object') {
			return function(dt) {
				that.interpolateObject.call(that,from,to,dt,ease);
			}
		} else if(typeof from =='string' &&typeof to =='string') {

		}
	}, 
	interpolateNumber:function(from,to,ease,dt){
		ease = ease||linear;
		var change = to - from;
		var ret =  from + change*ease(dt);
		return ret;
	},
	interpolateArray:function(fromArr,toArr,ease,dt){
		ease = ease || linear;
		return fromArr.map(function(val,index){
			var from = val;
			var to = toArr[index];
			var change = to - from;
			return to + change*ease(dt);
		})
	},
	interpolateTransform:function(){

	},
	interpolateColor:function(){

	}
})