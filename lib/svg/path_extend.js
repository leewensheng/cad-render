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
	LineToPoints:function(points) {
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			if(i==0) {
				this.MoveTo(p.x,p.y)
			} else {
				this.LineTo(p.x,p.y)
			}
		}
		return this;
	}
})