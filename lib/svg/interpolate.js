import cad from './core'
import Color from './color'
cad.extend({
	interpolates:{},
	interpolate:function(from,to,ease){
		var that = this;
		if(typeof from=='number' && typeof to =='number') {
			return function(dt){
				that.interpolateNumber.call(that,from,to,dt,ease);
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
	interpolateNumber:function(from,to,dt,ease){
		var change = to - from;
		return from + change*ease(dt);
	},
	interpolateArray:function(fromArr,toArr,dt,ease){
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