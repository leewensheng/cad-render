import $ from '$'
function Point(x,y) {
	return new Point.prototype.init(x,y);
}
Point.fn = Point.prototype = {
	init:function(x,y) {
		this.x = x||0;
		this.y = y||0;
		return this;
	},
	angleTo:function(angle,len){
		return this.moveBy(len*Math.cos(angle/180),len*Math.sin(angle/180));
	},
	moveBy:function(dx,dy){
		this.x += this.x+dx;
		this.y += this.y+dy;
		return this;
	},
	moveTo:function(x,y){
		this.x = x;
		this.y = y;
		return this;
	},
	rotate:function(angle,cx,cy) {

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