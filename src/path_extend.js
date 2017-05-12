import path from './path'
import Point from './point'
function __curveToAll(points,isAboslute,isClosed) {
    var data = [];
    var p0 = points[0];
    var p1 = points[1];
    var pnPrev = points[points.length-2];
    var pn = points[points.length-1];
    var angle = Point(p0).getAngleTo(p1.x,p1.y);
    var m1 = Point(p0).angleMoveTo(angle,1);
    var angle2 = Point(pn).getAngleTo(pnPrev.x,pnPrev.y);
    var mn = Point(pn).angleMoveTo(angle,1);
    if(!isClosed) {
        points.unshift({x:m1.x,y:m1.y});
        points.push({x:mn.x,y:mn.y});
    } else {
        points.unshift(pn);
        points.push(p0);
        points.push(p1);
    }
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
    if(isAboslute) {
        this.MoveTo(points[1].x,points[1].y);
    } else {
        this.moveTo(points[1].x,points[1].y);
    }
    for(var i = 0;i < data.length; i++) {
        var d = data[i];
        if(isAboslute) {
            this.C(d.x1,d.y1,d.x2,d.y2,d.endx,d.endy);
        } else {
            this.c(d.x1,d.y1,d.x2,d.y2,d.endx,d.endy);
        }
    }
    return this;
}
function __lineToAll(points,isAboslute){
    for(var i = 0; i <points.length;i++) {
        var p = points[i];
        if(isAboslute) {
            this.LineTo(p.x,p.y);
        } else {
            this.lineTo(p.x,p.y);
        }
    }
    return this;
}
path.fn.extend({
    getAbsolutePoints:function(){
        alert('todo')
    },
    arc:function(cx,cy,r,startAngle,endAngle,counterClockWise) {
        var pCenter =  Point(cx,cy);
        var pStart = pCenter.clone().angleMoveTo(startAngle,r);
        var pEnd = pCenter.clone().angleMoveTo(endAngle,r);
        var counterLargeArc = (pEnd - pStart) > 180 ? 1: 0;
        if(counterClockWise) {
            //逆时针,canvas和svg相反
            counterLargeArc = false;
        }
        return  this.M(pStart.x,pStart.y).A(r,r,0,counterLargeArc,counterClockWise?0:1,pEnd.x,pEnd.y);
    },
	angleLineTo:function(angle,len) {
        len = Math.abs(len);
		var dx = len*Math.cos(angle*Math.PI/180);
		var dy = len*Math.sin(angle*Math.PI/180);
		return this.lineTo(dx,dy);
	}, 
	angleMoveTo:function(angle,len){
		var dx = len*Math.cos(angle*Math.PI/180);
		var dy = len*Math.sin(angle*Math.PI/180);
		return this.moveTo(dx,dy);
	},
	angleArcTo:function(angle,cx,cy,r){
        if(angle==0) {
            return this;
        }
        var angle1 = angle % 360;
        //todo 根据angle判断isClockWise
        var isClockWise = 0;
		if(angle > 0) {
			isClockWise = 1;
		}
		var x = this.x;
		var y = this.y;
        if(typeof r === 'undefined') {
            r = Point(x,y).getLenTo(cx,cy);
        }
        var endPoint = Point(x,y).rotate(angle,cx,cy);
		var flagClock = isClockWise ? 1:0;
		var isLargeArc = Math.abs(angle)>= 180 ? 1 : 0;
        if(angle >= 360) {
            this.angleArcTo(359.9,cx,cy,r).LineTo(x,y).MoveTo(x,y);
            endPoint = Point(x,y).rotate(angle1,cx,cy);
            this.ArcTo(r,r,0,Math.abs(angle1)>=180?1:0,flagClock,endPoint.x,endPoint.y);
            return this;
        } else {
            return this.ArcTo(r,r,0,isLargeArc,flagClock,endPoint.x,endPoint.y);
        }
	},
    clockWiseArcTo:function(cx,cy,endx,endy,r){

    },
    antiClockArcTo:function(cx,cy,endx,endy,r){

    },
	curveToAll:function(points,isClosed) {
        return __curveToAll.call(this,points,false,isClosed);
	},
	CurveToAll:function(points,isClosed){
		return __curveToAll.call(this,points,true,isClosed);
	},
    lineToAll:function(points){
        return __lineToAll.call(this,points,false);
    },
    LineToAll:function(points){
        return __lineToAll.call(this,points,true);
    }
});