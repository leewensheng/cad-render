import path from './path'
import Point from './point'
path.fn.extend({
	angleLineTo:function(angle,len) {
		var dx = len*Math.cos(angle*Math.PI/180);
		var dy = len*Math.sin(angle*Math.PI/180);
		return this.lineTo(dx,dy);
	}, 
	angleMoveTo:function(angle,len){
		var dx = len*Math.cos(angle*Math.PI/180);
		var dy = len*Math.sin(angle*Math.PI/180);
		return this.moveTo(dx,dy);
	},
	angleArcTo:function(angle,r,cx,cy,isClockWise){
		if(typeof isClockwise == 'undefined') {
			isClockWise = 1;
		}
		var point = this.getCurPoint();
		var x = point.x;
		var y = point.y;
		var endPoint = Point(x,y).rotate(angle,cx,cy);
		var flagClock = isClockWise ? 1:0;
		var isLargeArc = angle > 180 ? 1 : 0;
		return this.ArcTo(r,r,0,isLargeArc,flagClock,endPoint.x,endPoint.y);
	},
	CurveToPoints:function(points) {
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			if(i==0) {
				var curP = this.getCurPoint()
				this.LineTo(p.x,p.y)
				//this.C(curP.x,curP.y,curP.x,curP.y,p.x,p.y);
			} else {
				this.LineTo(p.x,p.y)
				//this.S(p.x,p.y,p.x,p.y);
			}
		}
	}
})