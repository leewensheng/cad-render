import cad from './core'
import Paper from './paper'
import $ from 'jquery'
cad.extend({
    $shapes:{},
    defineShape:function(name,func) {
        this.$shapes[name] =  func;
    }
})
Paper.fn.addShape = function(name,x,y,options){
    var shape = cad.$shapes[name]
    if(!shape) {
        return;
    }
    return shape.call(this,this,x,y,options);
}
