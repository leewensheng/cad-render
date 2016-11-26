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
    importBlock:function(){
        var id = arguments[0];
        var args = Array.prototype.slice.call(arguments,1);
        var blocks = cad.$$blocks;
        if(!blocks[id]) {
            throw new Error("undefined blocks");
            return false;
        }
        this.addLayer(id,{},true);
        this.temporarySwitchLayer(id,function(){
            blocks[id].apply(this,args);
        })
    }
})
cad.defineBlock('chrome',function(r){
    var paper = this;
    var Point = cad.Point;
    var Line = cad.Line;
    var r1,r2,r3,p0;
    r1 = r;
    r2 = r1*0.5;
    r3 = r1*0.4;
    var cx = r,cy = r;
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
    var colors = ['#FFCE43','#159F5C','#DD5044'];
    var c1 = paper.circle(cx,cy,r2+1).fill("#fff");
    var c2 = paper.circle(cx,cy,r3).fill("#4C8CF5");
    var shapes = paper.path(path).arrayCopy(3,function(index){
        $(this).fill(colors[index]).rotate(index*120,cx,cy);
    })
    return shapes.add([c1,c2]);
 })