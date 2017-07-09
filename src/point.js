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
	getLenTo:function(x1,y1){
		var x = this.x , y = this.y;
			x1 = x1||0;
			y1 = y1||0;
		var len = Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
		return len;
	},
	getMidPointTo:function(x1,y1){
		return this.moveTo((x1+this.x)/2,(y1+this.y)/2);
	},
	getAngleTo:function(x1,y1){
		return this.getAngleFromOrigin(x1-this.x,y1-this.y);
	},
	getAngleFrom:function(x0,y0){
		return this.getAngleFromOrigin(this.x - x0,this.y - y0);
	},
	getAngleFromOrigin:function(dx,dy){
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
		return this.constructor(vx,vy);
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
		return this.constructor(x0,y0);
	},
	moveBy:function(dx,dy){
		this.x += dx;
		this.y += dy;
		return this;
	},
	moveTo:function(x,y){
		this.x = x;
		this.y = y;
		return this;
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
		//切点
	},
	renderOnPaper:function(paper,r){
		r = r || 10;
		return paper.circle(this.x,this.y,r);
	}
}
Point.fn.init.prototype = Point.prototype;
Point.getPointOnCircle = function(cx,cy,r,angle){
		var dx = r*Math.cos(angle);
		var dy = r*Math.sin(angle);
		x = cx + dx;
		y = cy + dy;
		return Point(x,y);
}
module.exports = Point;