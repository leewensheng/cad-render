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
cad.defineShape("regPolgon",function(paper,cx,cy,option){
    var num = option.num;
    if(num<2) {
        return;
    }
    var rotate = option.rotate;
    var angle = Math.PI*2/num;
    var size = option.size;
    var r = option.size;
    var path = new cad.Path();
    var startAngle = Math.PI/2- angle/2;
    for(var i = 0; i < num; i ++) {
        var x1 = cx + r*Math.cos(startAngle+i*angle);
        var y1 = cy + r*Math.sin(startAngle+i*angle);
        var x2 = cx + r*Math.cos(startAngle+(i+1)*angle);
        var y2 = cy + r*Math.sin(startAngle+(i+1)*angle);
        path.MoveTo(x1,y1).LineTo(x2,y2);
    }
    path.closePath();
    return paper.append("path").attr("d",path.toString()).attr("stroke",5)
})