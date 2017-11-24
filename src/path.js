import Point from './point'
import utils from './utils'
/*https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Arcto*/
module.exports = Path;
function Path(initialPath){
    if(initialPath instanceof Path) {
        this.pathStack = initialPath.pathStack;
        this.x= initialPath.x;
        this.y = initialPath.y;
    } else if(typeof initialPath === 'string') {
        if(!Path.parse(initialPath)) {
            this.pathStack = [];
        } else {
            let path =  Path.parse(initialPath);
            this.pathStack = path.pathStack;
            this.x = path.x;
            this.y = path.y;
        }
    } else {
        this.pathStack = [];
    }     
};
window.Path = Path;
Path.prototype = {
    constructor:Path,
    pushStack:function(action,params){
        this.pathStack.push({
            action:action,
            params:params
        });
        var {x,y} = this;
        var point = params[params.length-1];
        if(action !== 'z' && action !== 'Z') {
            if(/^[a-z]$/g.test(action)) {
                if(action === 'v') {
                    y += point;
                } else if(action === 'h') {
                    x += point;
                } else {
                    x += point[0];
                    y += point[1];
                }
            } else {
                if(action === 'V') {
                    y = point;
                } else if(action === 'H') {
                    x = point;
                } else {
                    x = point[0];
                    y = point[1];
                }
            }
        }
        this.x = x;
        this.y = y;
        return this;
    },
    refreshXY:function(){
        var points = this.getAbsolutePoints();
        var lastPoint = points[points.length - 1];
        if(lastPoint) {
            this.x =  lastPoint.x;
            this.y = lastPoint.y;
        }
        
        return this;
    },
    MoveTo:function(x,y){
        return this.pushStack("M",[[x,y]]);
    },
    moveTo:function(dx,dy) {
        return this.pushStack("m",[[dx,dy]]);
    },
    ArcTo:function(rx,ry,rotateX,isLargeArc,isClockwise,endX,endY){
        return this.pushStack("A",[[rx,ry],
                                rotateX,
                                isLargeArc,
                                isClockwise,
                                [endX,endY]
                            ]
        )
    },
    arcTo:function(rx,ry,rotateX,isLargeArc,isClockwise,endX,endY){
        return this.pushStack("a",[ [rx,ry],
                                rotateX,
                                isLargeArc,
                                isClockwise,
                                [endX,endY]
                            ]
        )
    },
    LineTo:function(x,y){
        return this.pushStack("L",[[x,y]]);
    },
    lineTo:function(dx,dy) {
        return this.pushStack("l",[[dx,dy]]);
    },
    HorizontalLineTo:function(x){
        return this.pushStack("H",[x]);
    },
    horizontalLineTo:function(dx){
        return this.pushStack('h',[dx]);
    },
    VerticalLineTo:function(dy){
        return this.pushStack('V',[dy]);
    },
    verticalLineTo:function(dy){
        return this.pushStack('v',[dy]);
    },
    SmoothCureveTo:function(x2,y2,endX,endY) {
         return this.pushStack('S',[
                    [x2,y2],
                    [endX,endY]
                ]);
    },
    smoothCurveTo:function(x2,y2,endX,endY) {
         return this.pushStack('s',[
                    [x2,y2],
                    [endX,endY]
                ]);
    },
    CurveTo:function(x1,y1,x2,y2,endX,endY){
        return this.pushStack('C',[
                   [x1,y1],
                   [x2,y2],
                   [endX,endY]
                ]);
    },
   curveTo:function(x1,y1,x2,y2,endX,endY){
        return this.pushStack('c',
                [
                   [x1,y1],
                   [x2,y2],
                   [endX,endY]
                ]);
    },
    QuadraticBelzierCurveTo:function(x,y,endX,endY){
        return this.pushStack('Q',[
                    [x,y],
                    [endX,endY]
                ]);
    },
    quadraticBelzierCurveTo:function(x,y,endX,endY){
        return this.pushStack('q',[
                    [x,y],
                    [endX,endY]
                ]);
    },
    SmoothQuadraticBezierCurveto :function(endX,endY) {
        return this.pushStack('T',[
                    [endX,endY]
                ]);
    },
    smoothQuadraticBezierCurveto:function(endx,endy){
        return this.pushStack('t',[
                    [endX,endY]
                ]);
    },
    closePath:function(){
        return this.pushStack("Z",[]);
    },
    get:function(index){
        return this.pathStack[index];
    },
    getPath:function(){
        return this.toString();
    },
    getReac:function(){

    },
    clone:function(){
        var str = this.toString();
        return new this.constructor(str);
    },
    connectPath:function(path,noRefresh){
        var pathStack = this.pathStack;
        if(typeof path === 'string') {
            var ret = Path.parse(path);
            if(ret) {
                this.pathStack = pathStack.concat(ret.pathStack);
            }
        } else {
            if(path instanceof Path) {
                this.pathStack = pathStack.concat(path.pathStack);
            } else if(path instanceof Array) {
                path.map(function(subPath){
                    if(typeof subPath === 'string') {
                        pathStack.concat(Path.parse(subPath).pathStack);  
                    } else {
                        pathStack.concat(subPath.pathStack);
                    }
                    this.pathStack = pathStack;
                })
            }
        }
        if(!noRefresh) {
            return this.refreshXY();
        } else {
            return this;
        }
    },
    toString:function(){
        //最好在出口处取整一下;
       return this.pathStack.map(function(path,index){
            return  path.action + " " + path.params.map(function(val){
                if(Array.isArray(val)) {
                    return val.map(function(num){
                        return  num;
                    }).join(',');
                } else {
                    return val;
                }
            }).join(' ');
        }).join(" ");
    }
}
Path.extend = Path.prototype.extend = utils.extend;
Path.parse = function(str){
    str =utils.trim(str);
    var actions = str.match(/[a-zA-Z][^a-zA-Z]*/gi);
    if(!actions) {
        return;
    }
    var path = new Path();
     actions.forEach(action => {
        var type = action.match(/[a-zA-Z]/gi)[0];
        var data = utils.trim(action.replace(/[a-zA-Z]/gi,''));
        var params = data.split(/[\s,]+/gi).map(function(val){
            return parseFloat(val);
        });
        if(Path.prototype[type]) {
            Path.prototype[type].apply(path,params);
        } 
    });
    return path;

}
var shortName = {
    m:"moveTo",
    M:"MoveTo",
    l:"lineTo",
    L:"LineTo",
    a:"arcTo",
    A:"ArcTo",
    v:"verticalLineTo",
    V:"VerticalLineTo",
    h:"horizontalLineTo",
    H:"HorizontalLineTo",
    c:"curveTo",
    C:"CurveTo",
    s:"smoothCurveTo",
    S:"SmoothCureveTo",
    q:"quadraticBelzierCurveTo",
    Q:"QuadraticBelzierCurveTo",
    t:"smoothQuadraticBezierCurveto",
    T:"SmoothQuadraticBezierCurveto",
    z:"closePath",
    Z:"closePath"
}
for(let key in shortName) {
    Path.prototype[key] = Path.prototype[shortName[key]];
}


/*更多功能*/
function __lineToAll(points,isAboslute){
    for(var i = 0; i <points.length;i++) {
        var p = points[i];
        if(isAboslute) {
            this.LineTo(p.x,p.y);
        } else {
            this.lineTo(p.x,p.y);
        }
    }
    return this;
}
function getControlPoints(arr,smooth_value) {
    var x0 = arr[0].x, y0 = arr[0].y;
    var x1 = arr[1].x, y1 = arr[1].y;
    var x2 = arr[2].x, y2 = arr[2].y;
    var x3 = arr[3].x, y3 = arr[3].y;
    // Assume we need to calculate the control
    // points between (x1,y1) and (x2,y2).
    // Then x0,y0 - the previous vertex,
    //      x3,y3 - the next one.
    // 1.假设控制点在(x1,y1)和(x2,y2)之间，第一个点和最后一个点分别是曲线路径上的上一个点和下一个点
    // 2.求中点
    var xc1 = (x0 + x1) / 2.0;
    var yc1 = (y0 + y1) / 2.0;
    var xc2 = (x1 + x2) / 2.0;
    var yc2 = (y1 + y2) / 2.0;
    var xc3 = (x2 + x3) / 2.0;
    var yc3 = (y2 + y3) / 2.0;
    // 3.求各中点连线长度
    var len1 = Math.sqrt((x1-x0) * (x1-x0) + (y1-y0) * (y1-y0));
    var len2 = Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
    var len3 = Math.sqrt((x3-x2) * (x3-x2) + (y3-y2) * (y3-y2));
    // 4.求中点连线长度比例（用来确定平移前p2, p3的位置）
    var k1 = len1 / (len1 + len2);
    var k2 = len2 / (len2 + len3);
    // 5.平移p2
    var xm1 = xc1 + (xc2 - xc1) * k1;
    var ym1 = yc1 + (yc2 - yc1) * k1;
    // 6.平移p3
    var xm2 = xc2 + (xc3 - xc2) * k2;
    var ym2 = yc2 + (yc3 - yc2) * k2;
    // Resulting control points. Here smooth_value is mentioned
    // above coefficient K whose value should be in range [0...1].
    // 7.微调控制点与顶点之间的距离，越大曲线越平直
    var ctrl1_x = xm1 + (xc2 - xm1) * smooth_value + x1 - xm1;
    var ctrl1_y = ym1 + (yc2 - ym1) * smooth_value + y1 - ym1;
    var ctrl2_x = xm2 + (xc2 - xm2) * smooth_value + x2 - xm2;
    var ctrl2_y = ym2 + (yc2 - ym2) * smooth_value + y2 - ym2;
    return [{x: ctrl1_x, y: ctrl1_y}, {x: ctrl2_x, y: ctrl2_y}];
}
function __curveToAll(points,isAboslute,isClosed)  {
    var {x,y,pathStack} = this;
    if(points.length ===  0) {
        return this;
    } else if(points.length === 1) {
        let p0 = points[0];
        return isAboslute ? this.M(p0.x,p0.y) : this.m(p0.x,p0.y);
    } else if(points.length === 2) {
        let p0 = points[0];
        let p1 = points[1];
        return isAboslute ? this.M(p0.x,p0.y).L(p1.x,p1.y): this.m(p0.x,p0.y).l(p1.x,p1.y);
    } 
    var smooth_value = 0.6;
    var p0,p1,p2,p3,controls;
    for(var i = 0; i < points.length - 1;i++) {
        if(i === 0) {
             p0 = points[0];
        } else {
            p0 = points[i - 1];
        }
        p1 = points[i];
        p2 = points[i+1];
        p3 = points[i+2];
        if(i === points.length - 2) {
            p3 = points[i+1];
        }
        controls = getControlPoints([p0,p1,p2,p3],smooth_value);
        if(i === 0 && !pathStack.length) {
            isAboslute ? this.M(p1.x,p1.y) : this.m(p1.x,p1.y);
        }
        if(isAboslute) {
            this.CurveTo(controls[0].x,controls[0].y,controls[1].x,controls[1].y,p2.x,p2.y)
        } else {
            this.curveTo(controls[0].x,controls[0].y,controls[1].x,controls[1].y,p2.x,p2.y)
        }
   }
   return this;
}
Path.prototype.extend({
    getAbsolutePoints:function(){
        var actions  = this.pathStack;
        var x = 0,y =0 ;
        var points = [];
        for(var i = 0; i < actions.length;i++) {
            var action = actions[i].action;
            var params = actions[i].params;
            var point = params[params.length - 1];
            if(action === 'z' || action === 'Z') {
                continue;
            }
            if(/^[a-z]$/g.test(action)) {
                if(action === 'v') {
                    y += point;
                } else if(action === 'h') {
                    x += point;
                } else {
                    x += point[0];
                    y += point[1];
                }
            } else {
                if(action === 'V') {
                    y = point;
                } else if(action === 'H') {
                    x = point;
                } else {
                     x = point[0];
                     y = point[1];
                }
            }
            points.push({x,y});
        }
        return points;
    },
    arc:function(cx,cy,r,startAngle,endAngle,counterClockWise) {
        var pCenter =  Point(cx,cy);
        var pStart = pCenter.clone().angleMoveTo(startAngle,r);
        var pEnd = pCenter.clone().angleMoveTo(endAngle,r);
        var counterLargeArc = (pEnd - pStart) > 180 ? 1: 0;
        return  this.M(pStart.x,pStart.y).A(r,r,0,counterLargeArc,counterClockWise?0:1,pEnd.x,pEnd.y);
    },
    angleLineTo:function(angle,len) {
        len = Math.abs(len);
        var dx = len*Math.cos(angle*Math.PI/180);
        var dy = len*Math.sin(angle*Math.PI/180);
        return this.lineTo(dx,dy);
    }, 
    angleMoveTo:function(angle,len){
        var dx = len*Math.cos(angle*Math.PI/180);
        var dy = len*Math.sin(angle*Math.PI/180);
        return this.moveTo(dx,dy);
    },
    angleArcTo:function(angle,cx,cy,r){
        var flagClockWise,flagLargeArc,endX,endY;
        var {x,y} = this;
        if(angle === 0) {
            return this;
        }
        if(typeof r === 'undefined') {
            r = Point(x,y).getLenTo(cx,cy);
        }
        flagLargeArc = Math.abs(angle) > 180 ? 1 : 0;
        flagClockWise = angle>0?1:0;
        var endPoint = Point(x,y).rotate(angle,cx,cy);
        endX = endPoint.x;
        endY = endPoint.y;
        if(x === endX && endY === y) {
            endX = x - 0.001; 
        }
        return this.ArcTo(r,r,0,flagLargeArc,flagClockWise,endX,endY);
    },
    clockWiseArcTo:function(cx,cy,endx,endy,r){

    },
    antiClockArcTo:function(cx,cy,endx,endy,r){

    },
    curveToAll:function(points,isClosed) {
        return __curveToAll.call(this,points,false,isClosed);
    },
    CurveToAll:function(points,isClosed){
        return __curveToAll.call(this,points,true,isClosed);
    },
    lineToAll:function(points){
        return __lineToAll.call(this,points,false);
    },
    LineToAll:function(points){
        if(!points.length) return this;
        if(!this.pathStack.length) {
            var p = points.slice(0,1)[0];
            this.M(p.x,p.y);
            points = points.slice(1);
        }
        return __lineToAll.call(this,points,true);
    }
});