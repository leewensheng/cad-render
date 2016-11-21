import paper from './paper'
import Point from './point'
import Path from './path'

paper.fn.extend({
    angleLine:function(){

    },
    line:function(){

    },
    circle:function(){

    },
    rect:function(){
        
    },
    path:function(){

    },
    polygon:function(){

    },
    spline:function(points){
        var data = [];
        //去掉头尾两段
        var path = new Path();
        var p0 = points[0];
        var p1 = points[1];
        var pnPrev = points[points.length-2];
        var pn = points[points.length-1];
        var angle = Point(p0).getAngleTo(p1.x,p1.y);
        var m1 = Point(p0).angleTo(angle,1);
        var angle2 = Point(pn).getAngleTo(pnPrev.x,pnPrev.y);
        var mn = Point(pn).angleTo(angle,1);
        points.unshift({x:m1.x,y:m1.y});
        points.push({x:mn.x,y:mn.y});
        for(var i = 1; i < points.length -2;i++) {
            var p = points[i];
            var p0 = points[i-1];
            var p1 = points[i+1];
            var p2 = points[i+2];
            var x = p.x, y = p.y;
            var param = {};
            var x1,y1,x2,y2;
            x1 = p.x+(p1.x-p0.x)/4;
            y1 = p.y + (p1.y-p0.y)/4;
            x2 = p1.x - (p2.x - p.x)/4;
            y2 = p1.y - (p2.y - p.y)/4;
            param = {x:x,y:y,x1:x1,y1:y1,x2:x2,y2:y2,endx:p1.x,endy:p1.y};
            data.push(param);
        }
        path.MoveTo(points[1].x,points[1].y);
        for(var i = 0;i <data.length;i++) {
            var d = data[i];
            path.C(d.x1,d.y1,d.x2,d.y2,d.endx,d.endy);
        }
        return this.append("path").attr('d',path.toString())
    }
})