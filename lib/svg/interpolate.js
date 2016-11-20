import cad from './core'

cad.extend({
	$$interpolates:{

	},
	definedInterpolate:function(name,func) {
		this.$$interpolates[name] = func;
	},
	interpolate:function(name,option) {
		var args = [];
		for(var i = 1; i <arguments.length; i++) {
			args.push(arguments[i]);
		}
		if(typeof this.$$interpolates[name] == 'function') {
			return this.$$interpolates[name].apply(null,args);
		} else {
			return false;
		}
	}
})
cad.definedInterpolate("heart",function(t,size){
	var t,ret;
	if(typeof size == 'undefined') {
		size = 1;
	}
	size = size/32.69;

	t = arguments[0];
	ret = {
		x:16*Math.pow(Math.sin(t),3),
		y:13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) -Math.cos(4*t)
	}
	ret = {
		x:ret.x*size,
		y:ret.y*size
	}
	
	return ret;
})