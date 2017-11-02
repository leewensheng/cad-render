import paper from './paper'
import Point from '../point'
import Path from '../path'

paper.fn.extend({
    setViewBox:function(x,y,width,height,fit) {
        var a = [x,y,width,height];
        this.svg.attr("viewBox",a.join(" "));
        return this;
    },
    line:function(x1,y1,x2,y2){
        //需要考虑IE下的线条粗细，如果x1===x2或y1===y2，需要将x1x2或y1y2调至非整数位置
        return this.append("line",{
            x1:x1,
            y1:y1,
            x2:x2,
            y2:y2
        });
    },
    angleLine:function(x,y,angle,len){
        var x2 = x + len*Math.cos(angle*Math.PI/180);
        var y2 = y + len*Math.sin(angle*Math.PI/180);
        return this.append("line",{
            x1:x,
            y1:y,
            x2:x2,
            y2:y2
        });
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
    ellipse:function(cx,cy,rx,ry){
        return this.append("ellipse",{
            cx:cx,
            cy:cy,
            rx:rx,
            ry:ry
        })
    },
    diagonalEllipse:function(x1,y1,x2,y2){
        var minx,miny,maxx,maxy,cx,cy,rx,ry;
        minx = Math.min(x1,x2);
        miny = Math.min(y1,y2);
        maxx = Math.max(x1,x2);
        maxy = Math.max(y1,y2);
        rx = (maxx - minx)/2;
        ry = (maxy - miny)/2;
        cx = (x1+x2)/2;
        cy = (y1+y2)/2;
        return this.ellipse(cx,cy,rx,ry);
    },
    textPath:function(dom,id){
        var elem = this.createSVGElement("textPath");
        id&&elem.attr("xlink:href","#"+id);
        dom.append(elem);
        return elem;
    },
    text:function(x,y,content,option){
        option = paper.extend({
            color:"#333",
            fontSize:12,
            textAlign:"left",//left right center 
            textBaseLine:"bottom" //middle top bottom
        },option);
        var anchor = {
            left:'start',
            right:'end',
            center:'middle',
        };
        var dy = 0;
        if(option.textBaseLine === 'middle') {
            dy = option.fontSize/3;
        } else if(option.textBaseLine === "top") {
            dy = option.fontSize;
        }
        var el = this.append("text",{
            "x":x,
            "y":y,
            "dy":dy,
            "stroke":"none",
            "font-size":option.fontSize,
            "text-anchor":anchor[option.textAlign] ||'start'
        });
        return el.text(content);
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
    arc:function(cx,cy,radius,startAngle,endAngle,counterclockwise){
        var angle = endAngle - startAngle;
        if(angle < 360) {
            var path = new cad.Path();
            path.arc(cx,cy,radius,startAngle,endAngle,counterclockwise);
            return this.path(path.toString());
        } else {
           return this.circle(cx,cy,radius); 
        }
    },
    path:function(path){
        if(typeof path == 'object') {
            path = path.toString();
        }
        return this.append("path",{d:path});
    },
    polygon:function(points){
        if(points instanceof Array) {
            var p = points.map(function(val){
                return val.x +","+ val.y;
            })
            return this.append("polygon").attr("points",p.join(" "));
        } else {
            return this.append("polygon");
        }
    },
    polyline:function(points){
        var p = points.map(function(val){
            return val.x +","+ val.y;
        })
        return this.append("polyline").attr("points",p.join(" "));
    },
    spline:function(points,isClosed){
        var path = new Path().CurveToAll(points,isClosed);
        return this.append("path").attr('d',path.toString())
    },
    sector:function(cx,cy,radius,startAngle,endAngle,innerRadius){
        return this.addShape("sector",cx,cy,{
            startAngle:startAngle,
            endAngle:endAngle,
            radius:radius,
            innerRadius:innerRadius
        })
    },
    image:function(x,y,width,height,url){
        return this.append("image",{
            "xlink:href":url,
            "src":url,
            "x":x,
            "y":y,
            "width":width,
            "height":height
        });
    },
    diagonalImage:function(x1,y1,x2,y2,url) {
        var minx = Math.min(x1,x2);
        var miny = Math.min(y1,y2);
        var maxx = Math.max(x1,x2);
        var maxy = Math.max(y1,y2);
        var width = maxx - minx;
        var height = maxy - miny;
        return this.append("image",{
            "xlink:href":url,
            "src":url,
            "x":minx,
            "y":miny,
            "width":width,
            "height":height
        })
    },
    title:function(text){
        return this.append("title").text(text);
    },
    use:function(id,x,y,width,height){
        return this.append("use",{
            "xlink:href":"#"+id,
            "x":x,
            "y":y,
            "width":width,
            "height":height
        });
    },
    g:function(attrs){
        return this.append("g",attrs);
    },
    clipPath:function(callback){
        var $defs = this.select("defs");
        var clipPath = this.createSVGElement("clipPath");
        $defs.append(clipPath);
        this.temporarySwitchLayer(clipPath,callback);
        return clipPath;
    }
})