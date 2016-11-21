import cad from './core'
import Paper from './paper'
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
cad.defineShape("heart",function(paper,cx,cy,option){
    //此处需要插值
    option = option ||{};
    if(typeof option.size == "undefined") {
        option.size = 100;
    }
    var points = [];
    var num = 50;
    for(var i = 0; i < num; i ++) {
        var  angle = 360/num*i;
        var point = cad.interpolate("heart",angle*Math.PI/180,option.size);
        point.x = cx + point.x*option.size/32.69;
        point.y = cy + point.y*option.size/32.69;
        points.push(point);
    }
    return paper.spline(points)
})
cad.defineShape("sinCurve",function(paper,cx,cy,option){
    option = cad.extend(option,{height:20,interval:100,width:500});
    var path = new cad.Path();
    var height = option.height;
    var width  = option.width;
    var interval = option.interval;
    var ret = cad.rangeInterpolate(Math.sin,0,Math.PI*2*width/interval,width/5);
    var x = ret[0], y = ret[1];
    var points = x.map(function(val,index){
        return  {
            x:cx+val*interval/Math.PI/2,
            y:(cy+y[index]*height)
        }
    })
    return paper.spline(points);
})
cad.defineShape("spline",function(paper,cx,cy,option){
    //cad光滑曲线
})
cad.defineShape("bendLine",function(paper,cx,cy,option){
    var points = [];
    var len = option.len;
    var h = option.h;
    points.push({x:cx-len/2,y:cy});
    points.push({x:cx,y:cy+h});
    points.push({x:cx+len/2,y:cy});
    return paper.spline(points);
})