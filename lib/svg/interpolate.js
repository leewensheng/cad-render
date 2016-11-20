import cad from './core'

cad.extend({
	$$interpolates:{

	},
	definedInterpolate:function(name,func) {
		this.$$interpolates[name] = func;
	},
	interpolate:function(name) {
		var args = [];
		for(var i = 1; i <arguments.length; i++) {
			args.push(arguments[i]);
		}
		if(typeof this.$$interpolates[name] == 'function') {
			return this.$$interpolates[name].apply(null,args);
		} else {
			return false;
		}
	},
	arrayInterpolate:function(){
		var args = [];
		for(var i = 0; i <arguments.length; i++) {
			args.push(arguments[i]);
		}
		var ret  = arr.map(function(val,index){
			return cad.interpolate.apply(null,args);
		})
		return ret;
	},
	rangeInterpolate:function(name,from,to,num,option) {
		//按份数插值，
		//按距离插值
	}
})
cad.definedInterpolate("heart",function(t){
	var	ret = {
		x:16*Math.pow(Math.sin(t),3),
		y:13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) -Math.cos(4*t)
	}
	return ret;
})