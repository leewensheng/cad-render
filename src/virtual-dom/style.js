function Style(str) {
	this.style = {};
	return this.init(str);
};
module.exports = Style;
Style.prototype = {
	init(str){
		if(typeof str === 'string') {
			var obj = {};
			str.split(";").forEach(function(val){
				var css = val.split(":");
				if(css.length==2) {
					var name = css[0];
					var val = css[1];
					obj[name] = val
				}
			});
			this.style = obj;
		}
		return this;
	},
	css() {
		var key ,val, obj;
		if(arguments.length===2) {
			key = arguments[0];
			val = arguments[1];
			this.style[key]  = val;
		} else if(arguments.length==1) {
			if(typeof arguments[0] === 'object') {
				obj = arguments[0];
				for(var key in obj) {
					this.style[key] = obj[key];
				}
			} else if(typeof arguments[0]  === 'string') {
				key = arguments[0];
				return this.style[key];
			}
		}
		return this;
	},
	toString(){
		var style = this.style ||{};
		var css = [];
		for(var name in style) {
			css.push(name+":"+style[name]);
		}
		return css.join(";");
	}
}