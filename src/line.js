import Point from './point'
//还剩下交点　偏移 测试
module.exports = Line;
function Line(x1,y1,x2,y2) {
	return Line.prototype.init(x1,y1,x2,y2);
}
Line.prototype = {
	init:function(x1,y1,x2,y2){
		this.x1 = x1 || 0;
		this.y1 = y1 || 0;
		this.x2 = x2 || 0;
		this.y2 = y2 || 0;
		return this;
	},
	rotate:function(angle,cx,cy){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		var p1 = Point(x1,y1).rotate(angle,cx,cy);
		var p2 = Point(x2,y2).rotate(angle,cx,cy);
		this.x1 = p1.x,this.y1 = p1.y;
		this.x2 = p2.x,this.y2 = p2.y;
		return this;
	},
	offset:function(){

	},
	getEquationParam:function() {
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		var a = y1-y2;
		var b = x2 - x1;
		var c = x1*(y2-y1) - y1*(x2-x1);
		return {a:a,b:b,c:c};
	},
	extendLen:function(index,len){
		var p1 = Point(x1,y1);
		var p2 = Point(x2,y2);
		var angle;
		if(index == 0) {
			angle = p1.getAngleTo(x2,y2);
			p2.angleMoveTo(angle,len);
			this.x2 = p2.x;
			this.y2 = p2.y;
		} else {
			angle = p2.getAngleTo(x1,y1);
			p1.angleMoveTo(angle,len);
			this.x1 = p1.x;
			this.y1 = p1.y;
		}
		return this;
	},
	clone:function(){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		return new this.constructor(x1,y1,x2,y2);
	},
	isHorizontal:function(){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		return y1 === y2;
	},
	isVertical:function(){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		return x1 === x2;
	},
	getLen:function() {
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		var len = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
	},
	getLenToPoint:function(x,y){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		var pv = Point(x,y).getVerticalPoint(x1,y1,x2,y2);
		return pv.getLenTo(pv.x,pv.y);
	},
	getSlope:function(){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		return (y1-y2)/(x1-x2);
	},
	getAngle:function(){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		var p1 = Point(x1,y1);
		return p1.getAngleTo(x2,y2);
	},
	getMidPoint:function(){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		return {
			x:(x1+x2)/2,
			y:(y1+y2)/2
		}
	},
	getPointWithCircle:function(cx,cy,r){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		var p0 = Point(cx,cy);
		var pv = p0.getVerticalPoint(x1,y1,x2,y2);
		//中心点到垂点的距离
		var len = p0.getLenTo(pv.x,pv.y);
		if(len === r) {
			//相切
			return [pv];
		} else if(len > r) {
			return [];
		}
		var d = Math.sqrt(r*r - len*len);
		var angle = this.getAngle();
		var p1 = pv.clone().angleMoveTo(angle,d);
		var p2 = pv.clone().angleMoveTo(angle+180,d)
		return [p1,p2];
	},
	getPointWithLine:function(x11,y11,x22,y22){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		var angle = this.getAngle();
		var agnle2 = Line(x11,y11,x22,y22).getAngle();
		var d = Math.abs(angle - angle2);
		if(d === 0 || d === 180) {
			//互相平行
			return;
		}

	},
	renderOnPaper:function(paper){
		var x1 = this.x1,y1 = this.y1,x2= this.x2,y2=this.y2;
		return paper.line(x1,y1,x2,y2);
	}
}
Line.prototype.init.prototype = Line.prototype;