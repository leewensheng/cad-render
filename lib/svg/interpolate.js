import cad from './core'

cad.extend({
	$$interpolates:{

	},
	definedInterpolate:function(name,func) {
		this.$$interpolates[name] = func;
	},
	interpolate:function(name) {
		var args = Array.prototype.slice.call(arguments,1);
		if(typeof name == "function"){
			return name.apply(null,args);
		} else {
			if(typeof cad.$$interpolates[name] == 'function') {
				return cad.$$interpolates[name].apply(null,args);
			} else {
				return false;
			}
		}
	},
	arrayInterpolate:function(){
		var name = arguments[0];
		var args = Array.prototype.slice.call(arguments,1);
		var ret  = arr.map(function(val,index){
			if(typeof name == 'function') {
				return name.call(null,val);
			} else {
				return cad.interpolate.call(null,name,val);
			}
		})
		return ret;
	},
	rangeInterpolate:function(name,from,to,num) {
		var args = Array.prototype.slice.call(arguments,1);
		var gap = (to-from)/num;
		var arr = [];
		arr.push(from);
		for(var i = 0; i <num; i++) {
			arr.push(from+gap*i);
		}
		arr.push(to);
		var ret  = arr.map(function(val,index){
			if(typeof name == 'function') {
				return name.call(null,val);
			} else {
				return cad.interpolate.apply(null,name,val);
			}
		})
		return [arr,ret];
	}
})
cad.definedInterpolate("heart",function(t){
	var	ret = {
		x:16*Math.pow(Math.sin(t),3),
		y:13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) -Math.cos(4*t)
	}
	return ret;
})
