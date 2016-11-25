import cad from './core'
import paper from './paper'

cad.extend({
	$$blocks:{},
	defineBlock:function(id,callback){
		if(typeof callback=='function') {
			this.$$blocks[id] = callback;
		}
	}
});
paper.fn.extend({
	addBlock:function(){
		var name = arguments[0];
		var args = Array.prototype.slice.call(arguments,1);
		if(typeof cad.$$blocks[name]==='function') {
			return cad.$$blocks[name].apply(this,args);
		}
	}
})
cad.defineBlock('chrome',function(cx,cy,r){
    var paper = this;
    var Point = cad.Point;
    var Line = cad.Line;
    var r1,r2,r3,p0;
    r1 = r;
    r2 = r1*0.6;
    r3 = r1*0.5;
    p0 = Point(cx,cy);
    var p1 = p0.clone().moveBy(0,-1*r2);
    //为获取交点
    var pc = p1.clone().moveBy(5,0);
    var hline = Line(p1.x,p1.y,pc.x,pc.y);
    var px = hline.getPointWithCircle(cx,cy,r1);
    var p2,p3;
    p3 = p1.clone().rotate(120,cx,cy,r2);
    if(px.length>0) {
        if(px[0].x > px[1].x) {
            p2 = px[0]
        } else {
            p2 = px[1];
        }
    }
    var path = new cad.Path();
    path.M(p1.x,p1.y).L(p2.x,p2.y).angleArcTo(120,cx,cy,r1).L(p3.x,p3.y).angleArcTo(-120,cx,cy,r2);
    var colors = ['red','blue','yellow'];
    paper.circle(cx,cy,r2+1).fill("#fff");
    paper.circle(cx,cy,r3).fill("rgb(76,139,245");
    paper.path(path).arrayCopy(3,function(index){
        $(this).fill(colors[index]).rotate(index*120,cx,cy);
    })
 })