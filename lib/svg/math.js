import cad from './core'

cad.extend({
	min:function(arr) {
		return this.__arraymethod(arr,'min');
	},
	max:function(arr) {
		return this.__arraymethod(arr,'max');
	},
	sum:function(arr) {
		return this.__arraymethod(arr,'sum');
	},
	mean:function(arr) {
		return this.__arraymethod(arr,'mean');
	},
	__arraymethod:function(arr,type){
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
})