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
    connectPath:function(path){
        if(typeof path === 'string') {
            var ret = Path.parse(path);
            if(ret) {
                var pathStack = this.pathStack;
                this.pathStack = pathStack.concat(ret.pathStack);
            }
        } else {
            if(path instanceof Path) {
                 var pathStack = this.pathStack;
                this.pathStack = pathStack.concat(path.pathStack);
            }
        }
        return this.refreshXY();
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
function parsePath(path,actions) {
    if(actions.length === 0) {
        return path;
    }
    var action = actions.shift();
    var type = action.type;
    var params = action.params;
    return parsePath(Path.prototype[type].apply(path,params),actions);
}
Path.parse = function(str){
    str =utils.trim(str);
    var actions = str.match(/[a-zA-Z][^a-zA-Z]*/gi);
    if(!actions) {
        return;
    }
    actions = actions.map(action => {
        var type = action.match(/[a-zA-Z]/gi)[0];
        var data = utils.trim(action.replace(/[a-zA-Z]/gi,''));
        var params = data.split(/[\s,]+/gi).map(function(val){
            return parseFloat(val);
        })
        return {type,params};
    })
    return parsePath(new Path(),actions);
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
function __curveToAll(points,isAboslute,isClosed) {
    var data = [];
    var p0 = points[0];
    var p1 = points[1];
    var pnPrev = points[points.length-2];
    var pn = points[points.length-1];
    var angle = Point(p0).getAngleTo(p1.x,p1.y);
    var m1 = Point(p0).angleMoveTo(angle,1);
    var angle2 = Point(pn).getAngleTo(pnPrev.x,pnPrev.y);
    var mn = Point(pn).angleMoveTo(angle,1);
    if(!isClosed) {
        points.unshift({x:m1.x,y:m1.y});
        points.push({x:mn.x,y:mn.y});
    } else {
        points.unshift(pn);
        points.push(p0);
        points.push(p1);
    }
    for(var i = 1; i < points.length -2;i++) {
        var p = points[i];
        var p0 = points[i-1];
        var p1 = points[i+1];
        var p2 = points[i+2];
        var x = p.x, y = p.y;
        var param = {};
        var x1,y1,x2,y2;
        x1 = p.x+(p1.x-p0.x)/4;
        y1 = p.y + (p1.y-p0.y)/4;
        x2 = p1.x - (p2.x - p.x)/4;
        y2 = p1.y - (p2.y - p.y)/4;
        param = {x:x,y:y,x1:x1,y1:y1,x2:x2,y2:y2,endx:p1.x,endy:p1.y};
        data.push(param);
    }
    if(isAboslute) {
        this.MoveTo(points[1].x,points[1].y);
    } else {
        this.moveTo(points[1].x,points[1].y);
    }
    for(var i = 0;i < data.length; i++) {
        var d = data[i];
        if(isAboslute) {
            this.C(d.x1,d.y1,d.x2,d.y2,d.endx,d.endy);
        } else {
            this.c(d.x1,d.y1,d.x2,d.y2,d.endx,d.endy);
        }
    }
    return this;
}
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
        if(!points.length) return this;
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