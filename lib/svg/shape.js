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
    var sizeof = option.sizeof||'outerRadius';
    var r;
    if(sizeof=="innerRadius") {
        r = size / Math.cos(angle/2);
    }else if(sizeof == 'side') {
        r = size/2 /Math.sin(angle/2)
    } else {
        r = size;
    }
    var points = [];
    var startAngle = Math.PI/2- angle/2;
    for(var i = 0; i < num; i ++) {
        var x1 = cx + r*Math.cos(startAngle+i*angle);
        var y1 = cy + r*Math.sin(startAngle+i*angle);
        points.push(x1+','+y1);
    }
    return paper.append("polygon").attr("points",points.join(' '));
})
cad.defineShape("gear",function(paper,cx,cy,option){
    var path = new cad.Path();
    var r1 = option.r1 , 
        r2= option.r2 , 
        h = (r1-r2) , 
        r3 = option.r3;
    var teeth = option.teeth,angle = 180/teeth;
    path.MoveTo(cx,cy);
    for(var i = 0; i < teeth; i ++) {
        path.angleMoveTo(-1*angle/2+angle*2*i,r1)
            .angleLineTo(angle*2*i,h/2)
            .angleLineTo(angle*2*i+45,3);
    }
    return paper.append("path").attr('d',path.toString());
})