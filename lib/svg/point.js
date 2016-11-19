import $ from 'jquery'
function Point(x,y) {
	return new Point.prototype.init(x,y);
}
Point.fn = Point.prototype = {
	constructor:Point,
	init:function(x,y) {
		this.x = x||0;
		this.y = y||0;
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
	getAngleFrom:function(x0,y0){
		var dx = this.x - x0,
			dy = this.y - y0;
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
	angleTo:function(angle,len){
		return this.moveBy(len*Math.cos(Math.PI*angle/180),len*Math.sin(Math.PI*angle/180));
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