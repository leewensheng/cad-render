import cad from './core'
function __arraymethod(arr,type){
		var min = null,max=null,mean = null,sum = 0;
		for(var i = 0; i < arr.length;i++) {
			var num = parseFloat(arr[i]);
			if(!isNaN(num)) {
				if(i==0) {
					min = max = arr[i];
				}
				sum += arr[i];
				min = Math.min(min,num);
				max = Math.max(max,num);
			}
		}
		mean = sum / arr.length;
		switch(type) {
			case 'min' :
				return min;
			case 'max' :
				return max;
			case 'mean' :
				return mean;
			case 'sum' :
				return sum;
			default:;
		}
	}
cad.extend({
	min:function(arr) {
		return __arraymethod(arr,'min');
	},
	max:function(arr) {
		return __arraymethod(arr,'max');
	},
	sum:function(arr) {
		return __arraymethod(arr,'sum');
	},
	mean:function(arr) {
		return __arraymethod(arr,'mean');
	},
	sin:function(angle) {
		return Math.sin(angle*2*Math.PI/360);
	},
	cos:function(angle) {
		return Math.cos(angle*2*Math.PI/360);
	},
	asin:function(val){
		return 180/Math.PI*Math.asin(val);
	},
	acos:function(val){
		return 180/Math.PI*Math.acos(val);
	}
})