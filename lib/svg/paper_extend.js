import paper from './paper'
import Point from './point'
import Path from './path'

paper.fn.extend({
    angleLine:function(x,y,angle,len){
        var x2 = x + len*Math.cos(angle*Math.PI/2);
        var y2 = y + len*Math.sin(angle*Math.PI/2)
        return this.append("line",{
            x1:x,
            y1:y,
            x2:x2,
            y2:y2
        });
    },
    line:function(x1,y1,x2,y2){
        return this.append("line",{
            x1:x1,
            y1:y1,
            x2:x2,
            y2:y2
        });
    },
    ellipse:function(cx,cy,rx,ry){
        return this.append("ellipse",{
            cx:cx,
            cy:cy,
            rx:rx,
            ry:ry
        })
    },
    circle:function(cx,cy,r){
        return this.append("circle",{
            cx:cx,
            cy:cy,
            r:r
        });
    },
    circumCircle:function(points){

    },
    textPath:function(dom,id){
        var elem = this.createSVGElement("textPath");
        id&&elem.attr("xlink:href","#"+id);
        dom.append(elem);
        return elem;
    },
    text:function(content,x,y,option){
        option = paper.extend({
            fontSize:14,
            align:"left",
            baseline:"top",
            rotate:0,
            fontWeight:"normal"
        },option);
        var fontSize = option.fontSize,
            align = option.align,
            baseline = option.baseline,
            rotate = option.rotate,
            fontWeight = option.fontWeight;

        var elem = this.append("text");
        elem.attr('x',x);
        elem.attr("font-size",fontSize);
        elem.attr('rotate',rotate);
        elem.attr("font-weight",fontWeight);
        if(option.color) {
            elem.attr("fill",option.color);
        }
        if(align=="left"||align =="start") {
            elem.attr("text-anchor",'start');
        } else if(align == "center"||align=="middle") {
            elem.attr("text-anchor",'middle');
        } else {
            elem.attr("text-anchor",'end');
        }
        var scale = 1.6 , add = 10;
        if(baseline == "top") {
            elem.attr("y",y + fontSize*scale/2 + add);
        } else if(baseline == "middle") {
            elem.attr('y',y + fontSize/2*scale+ add);
        } else {
            elem.attr('y',y+add);
        }
        return elem.text(content);
    },
    rect:function(x,y,width,height,rx,ry){
        if(rx >= 0 &&!typeof ry == 'undefined') {
            ry = rx;
        }
        return this.append("rect",{
            x:x,
            y:y,
            width:width||0,
            height:height||0,
            rx:rx||0,
            ry:ry||0
        })
    },
    diagonalRect:function(x1,y1,x2,y2,rx,ry){
        var minx = Math.min(x1,x2);
        var miny = Math.min(y1,y2);
        var maxx = Math.max(x1,x2);
        var maxy = Math.max(y1,y2);
        var width = maxx - minx;
        var height = maxy - miny;
        if(rx>=0 && typeof ry == 'undefined') {
            ry = rx;
        }
        return this.append("rect",{
            x:minx,
            y:miny,
            width:width,
            height:height,
            rx:rx||0,
            ry:ry||0
        })
    } ,
    path:function(path){
        return this.append("path").attr('d',path);
    },
    polygon:function(points){
        var p = points.map(function(val){
            return val.x +","+ val.y;
        })
        return this.append("polygon").attr("points",p.join(" "));
    },
    polyline:function(points){
        var p = points.map(function(val){
            return val.x +","+ val.y;
        })
        return this.append("polyline").attr("points",p.join(" "));
    },
    spline:function(points){
        var path = new Path().SplineTo(points);
        return this.append("path").attr('d',path.toString())
    }
})