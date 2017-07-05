import cad from './core'
import paper from './paper/index'
import gradient from './defs/gradient'
import filters from './defs/filters'
import patterns from './defs/patterns'
import marker from './defs/marker'
cad.extend({
	$$defs:{},
	registDefs:function(){
		var name ,def,defs;
		if(arguments.length==1 && typeof arguments[0] == 'object') {
			defs = arguments[0]
			for(var name in defs) {
				cad.$$defs[name] = defs[name];
			}
		}
		if(arguments.length==2&& typeof arguments[0] == 'string') {
			name = arguments[0];
			def = arguments[1];
			cad.$$defs[name] = def;
		} 
	}
})
paper.fn.importDefs = function(name,option){
	var me = this;
	var args = Array.prototype.slice.call(arguments,1);
	if(typeof cad.$$defs[name] === "function") {
		var def = cad.$$defs[name];
		return  def.apply(me,args);
	}
	return this;
}
paper.fn.createLinearGradient = function(){
	
}
paper.fn.createRadialGradient = function(){

}
cad.registDefs(gradient);
cad.registDefs(filters);
cad.registDefs(patterns);
cad.registDefs(marker);
