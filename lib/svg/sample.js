import cad from './core'

cad.extend({
	$$interpolates:{

	},
	defineSample:function(name,func) {
		this.$$interpolates[name] = func;
	},
	sample:function(name) {
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
	objectSample:function(name,obj){
        var me = this;
        var call_func;
        if(typeof name == 'function') {
        	call_func = name;
        } else {
        	call_func = cad.$$interpolate[name];
        }
        for(var key in obj) {
            if(typeof obj[key]!=='object') {
            	obj[key] = call_func.call(null,obj[key]);
            } else {
            	obj[key] = call_func.call(null,obj[key])
            }
        }
        return obj;
    },
	arraySample:function(){
		var name = arguments[0];
		var args = Array.prototype.slice.call(arguments,1);
		var ret  = arr.map(function(val,index){
			if(typeof name == 'function') {
				return name.call(null,val);
			} else {
				return cad.sample.call(null,name,val);
			}
		})
		return ret;
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
