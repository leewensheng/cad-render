import path from './path'
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
	angleArcTo:function(cx,cy,r,angle,isColockWise){
		var point = this.getCurPoint();
		var x = point.x;
		var y = point.y;
	}
})