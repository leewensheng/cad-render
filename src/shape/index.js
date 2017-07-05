import insideShapes from './shapes'
var shapes = {};
var shape = {
	defineShape:function(name,func) {
		if(typeof name === 'string') {
        	shapes[name] =  func;
		} else if(arguments.length === 1&&typeof name==='object') {
			for(var key in name) {
				shapes[key] = name[key];
			}
		}
    },
    getShapePath:function(){
        var name = arguments[0];
        var args = Array.prototype.slice.call(arguments,1);
        var shape = shapes[name];
        return shape&&shape.apply(null,args).toString();
    },
    addShape(){
        var name = arguments[0];
	    var args = Array.prototype.slice.call(arguments,1);
    	var shape = shapes[name];
	    if(!shape) {
	        console.error("error:　undefined shape " + name);
	        return;
	    }
	    var path = shape.apply(this,args);
	    return this.append("path",{
	        d:path.toString()
	    });
    }
};
shape.defineShape(insideShapes);
module.exports = shape;