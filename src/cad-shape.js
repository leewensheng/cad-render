import cad from './core'
import {defineShape,getShapePath,addShape} from './shape/index'
import Point from './point'
cad.extend({defineShape,getShapePath});
cad.defineShape("regularPolygon",function(cx,cy,option){
    var paper = this;
    var path = new cad.Path();
    var num = option.num;
    if(num<2) {
        return;
    }
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
        if(i == 0) {
            path.MoveTo(x1,y1);
        } else {
            path.LineTo(x1,y1);
        }
    }
    path.closePath();
    return path;
})
cad.defineShape("gear",function(cx,cy,option){
    var path = new cad.Path();
    var r1 = option.r1 , 
        r2= option.r2 , 
        h = Math.abs(r1-r2) , 
        r3 = option.r3;
    var teeth = option.teeth,angle = 360/teeth;
    for(var i = 0; i < teeth; i++) {
        var midPoint = Point(cx,cy).angleMoveTo(angle*i,r1);
        var leftPoint = midPoint.clone().rotate(-1*angle/4,cx,cy);
        var rightPoint = midPoint.clone().rotate(angle/4,cx,cy);
        var gap = leftPoint.getLenTo(rightPoint.x,rightPoint.y);
        var topMidPoint = Point(cx,cy).angleMoveTo(angle*i,r2);
        var topLeftPoint = topMidPoint.clone().angleMoveTo(angle*i-90,gap/2);
        var topRightPoint = topMidPoint.clone().angleMoveTo(angle*i+90,gap/2);
        if(i==0) {
            path.MoveTo(leftPoint.x,leftPoint.y);  
        } 
        path.LineTo(topLeftPoint.x,topLeftPoint.y)
            .LineTo(topRightPoint.x,topRightPoint.y)
            .LineTo(rightPoint.x,rightPoint.y)
            .angleArcTo(angle/2,cx,cy,r1);
    }
    return path;
})
cad.defineShape("heart",function(cx,cy,option){
    var path = new cad.Path();
    option = cad.extend({
        size:100
    },option)
    var size = option.size;
    var points = [];
    var num = size;
    for(var i = 0; i < num; i ++) {
        var  angle = 360/num*i;
        var point = cad.sample("heart",angle*Math.PI/180,option.size);
        point.x = cx + point.x*option.size/32.69;
        point.y = cy + point.y*option.size/32.69;
        points.push(point);
    }
    return path.CurveToAll(points);
})
cad.defineShape("sinCurve",function(cx,cy,option){
    var path = new cad.Path();
    option = cad.extend({height:20,interval:100,width:500},option);
    var path = new cad.Path();
    var height = option.height;
    var width  = option.width;
    var interval = option.interval;
    var ret = cad.rangeSample(Math.sin,0,Math.PI*2*width/interval,width/5);
    var x = ret[0], y = ret[1];
    var points = x.map(function(val,index){
        return  {
            x:cx+val*interval/Math.PI/2,
            y:(cy+y[index]*height)
        }
    })
    return path.CurveToAll(points);
})
cad.defineShape("markLine",function(x1,y1,x2,y2,option){
    //这个宜作为箭头
    option = cad.extend({width:10,height:18},option);
    var path = new cad.Path();
    var width = option.width;
    var height = option.height;
    var angle = Point(x1,y1).getAngleTo(x2,y2);
    path.MoveTo(x1,y1).LineTo(x2,y2)
        .angleMoveTo(angle-180,height)
        .angleMoveTo(angle+90,width/2)
        .angleLineTo(angle-90,width)
        .LineTo(x2,y2)
        .closePath();
    return path;
})
