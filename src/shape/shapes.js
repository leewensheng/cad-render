import Path from '../path'
import Point from '../point'

exports.sector = function(cx,cy,option){
    var {startAngle,endAngle,radius} = option;
     var innerRadius = option.innerRadius||0;
    if(innerRadius>radius) {
        console.log("warning:outerRadius should be larger than innerRadius");
    }
    if(endAngle - startAngle>=360) {
        endAngle = startAngle+359.999;
    };
    var path = '';
    var p1 = [cx,cy];
    var p2 = Point(cx,cy).angleMoveTo(startAngle,radius);
    var p3 = Point(cx,cy).angleMoveTo(endAngle,radius);
    var dangle = endAngle - startAngle;
    var isLargeArc = dangle>180?1:0;
    var isClockwise = dangle>0?1:0;
    return new Path()
        .MoveTo(cx,cy)
        .angleMoveTo(startAngle,innerRadius)
        .angleLineTo(startAngle,radius - innerRadius)
        .angleArcTo(endAngle - startAngle ,cx,cy,radius)
        .angleLineTo(endAngle+180,radius - innerRadius)
        .angleArcTo(startAngle -endAngle,cx,cy,innerRadius)
       
}