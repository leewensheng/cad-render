import $ from 'jquery'
function Point(x,y) {
	if(arguments.length==1) {
		return new Point.prototype.init(arguments[0]);
	} else {
		return new Point.prototype.init(x,y);
	}
}
Point.fn = Point.prototype = {
	constructor:Point,
	init:function() {
		var p,x,y;
		if(arguments.length==1&&typeof arguments[0] == 'object') {
			var p = arguments[0];
			this.x = p.x||0;
			this.y = p.y||0;
		} else if(arguments.length == 2) {
			this.x = arguments[0];
			this.y = arguments[1];
		}
		return this;
	},
	clone:function(){
		return new Point.prototype.init(this.x,this.y);
	},
	getLenTo:function(){
		var x = this.x , y = this.y, x1 , y1 , point;
		if(arguments.length == 1 && typeof arguments[0] == 'object') {
			point = arguments[0];
			x1 = point.x;
			y1 = point.y;
		} else {
			x1 = arguments[0]||0;
			y1 = arguments[1]||0;
		}
		var len = Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
		return len;
	},
	getMidPointTo:function(x1,y1){
		return this.moveTo((x1+this.x)/2,(y1+this.y)/2);
	},
	getAngleTo:function(x1,y1){
		return this.getAngleToOrigin(x1-this.x,y1-this.y);
	},
	getAngleFrom:function(x0,y0){
		return this.getAngleToOrigin(this.x - x0,this.y - y0);
	},
	getAngleToOrigin:function(dx,dy){
		if(dx == dy && dx == 0) {
			return 0;
		}
		else if(dx == 0) {
			if(dy > 0) {
				return 90;
			} else {
				return  -90;
			}
		} 
		else if(dy == 0) {
			if(dx > 0) {
				return 0
			} else {
				return 180;
			}
		} else {
			var angle = Math.atan(dy/dx)*180/Math.PI;
			if(dx > 0 && dy > 0) {
				return angle;
			} else if(dx > 0 && dy < 0) {
				return angle;
			} else if(dx <0 && dy>0) {
				return angle+180;
			} else if(dx<0&&dy<0) {
				return angle + 180;
			}
		}
	},
	angleMoveTo:function(angle,len){
		return this.moveBy(len*Math.cos(Math.PI*angle/180),len*Math.sin(Math.PI*angle/180));
	},
	getVerticalPoint:function(x1,y1,x2,y2){
		var x  = this.x, 
			y  = this.y; 
		var mirrorPoint = this.mirror(x1,y1,x2,y2);
		var x1 = mirrorPoint.x,
			y1 = mirrorPoint.y;
		var vx = (x+x1)/2;
		var vy = (y+y1)/2;
		return new Point.prototype.init(vx,vy);
	},
	mirror:function(x1,y1,x2,y2) {
		var a = y1-y2;
		var b = x2 - x1;
		var c = x1*(y2-y1) - y1*(x2-x1);
		var x = this.x;
		var y = this.y;
		var x0,y0;
		x0 = x - 2*a*(a*x+b*y+c)/(a*a+b*b);
		y0 = y - 2*b*(a*x+b*y+c)/(a*a+b*b);
		return new Point.prototype.init(x0,y0);
	},
	moveBy:function(dx,dy){
		var x = this.x+dx;
		var y = this.y+dy;
		this.x = x;
		this.y = y;
		return this;
	},
	moveTo:function(x,y){
		this.x = x;
		this.y = y;
		return this;
	},
	nearTo:function(x1,y1,len) {
		var angle = this.getAngleTo(x1,y1);
		return this.moveTo(x1,y1).angleMoveTo(angle+180,len);
	},
	rotate:function(angle,cx,cy) {
		var x = this.x;
		var y = this.y;
		var cur_angle = this.getAngleFrom(cx,cy);
		var new_angle = cur_angle + angle;
		var len = this.getLenTo(cx,cy);
		this.x = cx + len*Math.cos(Math.PI*new_angle/180);
		this.y = cy + len*Math.sin(Math.PI*new_angle/180);
		return this;
	},
	scale:function(sclae,cx,cy) {
		scale = scale ||1;
		cx = cx || 0;
		cy = cy || 0;
		var angle = this.getAngleFrom(cx,cy);
		var len = this.getLenTo(cx,cy);
		this.x = cx + scale*len(Math.cos(Math.PI*angle/180));
		this.y = cy + scale*len(Math.sin(Math.PI*angle/180));
		return this;
	},
	getTangentPoint:function(cx,cy,r){
		//也可以支持SVG circle
	},
	getVerticalPoint:function(x1,x2,y1,y2){
		
	}
}
Point.fn.init.prototype = Point.prototype;
Point.extend = Point.fn.extend = $.extend;
Point.extend({
	getPointOnCircle:function(cx,cy,r,angle){
		var dx = r*Math.cos(angle);
		var dy = r*Math.sin(angle);
		x = cx + dx;
		y = cy + dy;
		return Point(x,y);
	}
})
module.exports = Point;