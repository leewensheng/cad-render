import gradient from './gradient'
import filters from './filters'
import patterns from './patterns'
import marker from './marker'
var $$defs = {};
var defs = {
	registDefs:function(){
		var name ,def,defs;
		if(arguments.length==1 && typeof arguments[0] == 'object') {
			defs = arguments[0]
			for(var name in defs) {
				$$defs[name] = defs[name];
			}
		}
		if(arguments.length==2&& typeof arguments[0] == 'string') {
			name = arguments[0];
			def = arguments[1];
			$$defs[name] = def;
		} 
	},
	registDefs:function(){
		var name ,def,defs;
		if(arguments.length==1 && typeof arguments[0] == 'object') {
			defs = arguments[0]
			for(var name in defs) {
				$$defs[name] = defs[name];
			}
		}
		if(arguments.length==2&& typeof arguments[0] == 'string') {
			name = arguments[0];
			def = arguments[1];
			$$defs[name] = def;
		} 
	},
	importDefs:function(name,option){
		var me = this;
		var args = Array.prototype.slice.call(arguments,1);
		if(typeof $$defs[name] === "function") {
			var def = $$defs[name];
			return  def.apply(me,args);
		}
		return this;
	},
	createLinearGradient: function(){
		
	},
	createRadialGradient: function(){

	}
}
defs.registDefs(gradient);
defs.registDefs(filters);
defs.registDefs(patterns);
defs.registDefs(marker);
module.exports = defs;
