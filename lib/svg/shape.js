import cad from './core'
import Paper from './paper'
import $ from 'jquery'
import Point from './point'
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
        h = Math.abs(r1-r2) , 
        r3 = option.r3;
    var teeth = option.teeth,angle = 360/teeth;
    for(var i = 0; i < teeth; i++) {
        var midPoint = Point(cx,cy).angleTo(angle*i,r1);
        var leftPoint = midPoint.clone().rotate(-1*angle/4,cx,cy);
        debugger;
        var rightPoint = midPoint.clone().rotate(angle/4,cx,cy);
        var gap = leftPoint.getLenTo(rightPoint);
        var topMidPoint = Point(cx,cy).angleTo(angle*i,r2);
        var topLeftPoint = topMidPoint.clone().angleTo(angle*i-90,gap/2);
        var topRightPoint = topMidPoint.clone().angleTo(angle*i+90,gap/2);
        if(i==0) {
            path.MoveTo(leftPoint.x,leftPoint.y);  
        } 
        path.LineTo(topLeftPoint.x,topLeftPoint.y)
            .LineTo(topRightPoint.x,topRightPoint.y)
            .LineTo(rightPoint.x,rightPoint.y)
            .angleArcTo(angle/2,r1,cx,cy,true);
    }
    return paper.append("path").attr('d',path.toString());
})