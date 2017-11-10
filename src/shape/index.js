import inside_shapes from './shapes'
import Path from '../path'
var _shapes = inside_shapes;
var shape = {
	defineShape:function(name,func) {
		if(typeof name === 'string') {
        	_shapes[name] =  func;
		} else if(arguments.length === 1&&typeof name==='object') {
			for(var key in name) {
				_shapes[key] = name[key];
			}
		}
	},
	getShapesPath(shapes){
		var that = this;
		var path = new Path();
		shapes.map(function(shape){
			var type = shape.type;
			var shapePath = that.getShapePath(type,shape,true);
			path.connectPath(shapePath,true);
		});
		return path;
	},
    getShapePath:function(name,option,isPathObject){
		var shape = _shapes[name];
        if(isPathObject) {
        	return shape&&shape(option)
        } else {
        	return shape&&shape(option).toString();
        }
    },
    addShape(){
        var name = arguments[0];
	    var args = Array.prototype.slice.call(arguments,1);
    	var shape = _shapes[name];
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
module.exports = shape;