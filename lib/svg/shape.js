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
        throw new Error("undefined shape");
        return;
    }
    return shape.call(this,this,x,y,options);
}
cad.defineShape("gear",function(paper,cx,cy,option){
    var r1  = option.r1;
    var r2 = option.r2;
    var h = Math.abs(r1-r2);
    var teeth = option.teeth;
    var path = new cad.Path();
    var gap = (r1+r2)/2/teeth;
    var angle = Math.PI*2/teeth;
    for(var i = 0; i <teeth; i ++) {
        var x = cx+r1*Math.cos(i*angle);
        var y = cy+Math.sin(angle*i);
        path.MoveTo(x,y);
        path.moveTo(-1*gap/2,gap*Math.sin(angle*i));
        path.lineTo(h*Math.sin(angle*i),h*Math.cos(angle*i));
    }
   return paper.append("path").attr("d",path.toString());
})