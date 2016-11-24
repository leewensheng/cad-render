import cad from './core'
import paper from './paper'

cad.extend({
	$$blocks:{},
	defineBlock:function(id,callback){
		if(typeof callback=='function') {
			this.$$blocks[id] = callback;
		}
	}
});
paper.fn.extend({
	addBlock:function(){
		var name = arguments[0];
		var args = Array.prototype.slice.call(arguments,1);
		if(typeof cad.$$blocks[name]==='function') {
			return cad.$$blocks[name].apply(this,args);
		}
	}
})
cad.defineBlock('circle',function(cx,cy,radius){
	return this.circle(cx,cy,radius);
})