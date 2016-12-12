import cad from './core'

cad.extend({
	samples:{

	},
	defineSample:function(name,func) {
		this.samples[name] = func;
	},
	sample:function(name) {
		var args = Array.prototype.slice.call(arguments,1);
		if(typeof name == "function"){
			return name.apply(null,args);
		} else {
			if(typeof cad.samples[name] == 'function') {
				return cad.samples[name].apply(null,args);
			} else {
				return false;
			}
		}
	},
	rangeSample:function(name,from,to,num) {
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
				return cad.sample.apply(null,name,val);
			}
		})
		return [arr,ret];
	}
})
cad.defineSample("heart",function(t){
	var	ret = {
		x:16*Math.pow(Math.sin(t),3),
		y:13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) -Math.cos(4*t)
	}
	return ret;
})
