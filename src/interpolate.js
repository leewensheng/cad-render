import cad from './core'
import Color from './color'
import utils from './utils'

var linear = function(dt) {
	return dt;
}
cad.extend({
	interpolates:{},
	interpolate:function(from,to,ease){
		var that = this;
		if(typeof from=='number' && typeof to =='number') {
			return function(dt){
				return that.interpolateNumber.call(null,from,to,ease,dt);
			}
		} else if(from instanceof Array && to instanceof Array) {
				return function(dt) {
					return that.interpolateArray.call(that,from,to,ease,dt);
				}
		} else if( typeof from =='object' && typeof to == 'object') {
			return function(dt) {
				return that.interpolateObject.call(that,from,to,ease,dt);
			}
		} else if(typeof from =='string' &&typeof to =='string') {
			if(Color.getColorByStr(from)&&Color.getColorByStr(to)) {
				var colorFrom = new Color(from).toRgbObj();
				var colorTo = new Color(to).toRgbObj();
				return function(dt) {
					var obj = that.interpolateObject.call(that,colorFrom,colorTo,ease,dt);
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
		}
	}, 
	interpolateNumber:function(from,to,ease,dt){
		ease = ease||linear;
		var change = to - from;
		var ret =  from + change*ease(dt);
		return ret;
	},
	interpolateObject:function(from,to,ease,dt){
		ease = ease || linear;
		var ret = {};
		var that = this;
        for(var key in from) {
            if(typeof from[key] ==='object') {
                 var obj = from[key];
                if(obj instanceof Array) {
                    ret[key] = obj.map(function(val,subkey){
                    	var change = to[key][subkey] - obj[subkey];
                    	return obj[subkey] + ease(dt)*change;
                    })
                } else {
                    ret[key] = {};
                    for(var subkey in obj) {
	                    var change =  to[key][subkey]- obj[subkey];
	                    ret[key][subkey] = obj[subkey] + ease(dt)*change;
	                }
                }
            } else {
                var change = to[key] - from[key];
                ret[key] = from[key] + ease(dt)*change;
            }
        }
        return ret;
	},
	interpolateArray:function(fromArr,toArr,ease,dt){
		ease = ease || linear;
		return fromArr.map(function(val,index){
			var from = val;
			var to = toArr[index];
			var change = to - from;
			return from + change*ease(dt);
		})
	},
    interpolateShape:function(from,to){
        
    }
})