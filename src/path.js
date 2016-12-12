import $ from 'jquery'
module.exports = Path;
function Path(initialPath){
    if(initialPath instanceof Path) {
        this.pathStack = initialPath;
    } else if(typeof initialPath === 'string') {
        if(!Path.parse(initialPath)) {
            this.pathStack = [];
        } else {
            this.pathStack = Path.parse(initialPath).pathStack;
        }
    } else {
        this.pathStack = [];
    }
     
};
Path.fn = Path.prototype = {
    constructor:Path,
    MoveTo:function(x,y){
        return this.pushStack("M",[x + "," + y]);
    },
    moveTo:function(dx,dy) {
        return this.pushStack("m",[dx + "," + dy]);
    },
    ArcTo:function(rx,ry,rotateX,isLargeArc,isClockwise,endX,endY){
        return this.pushStack("A",[    rx + " " + ry,
                                rotateX,
                                isLargeArc,
                                isClockwise,
                                endX +"," +endY
                            ]
        )
    },
    arcTo:function(rx,ry,rotateX,isLargeArc,isClockwise,endX,endY){
        return this.pushStack("a",[    rx + " " + ry,
                                rotateX,
                                isLargeArc,
                                isClockwise,
                                endX +"," +endY
                            ]
        )
    },
    LineTo:function(x,y){
        return this.pushStack("L",[x + "," + y]);
    },
    lineTo:function(dx,dy) {
        return this.pushStack("l",[dx + "," + dy]);
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
    SmoothCureveTo:function(x2,y2,endx,endy) {
         return this.pushStack('S',[
                    x2 + "," + y2,
                    endx + "," + endy
                ]);
    },
    smoothCurveTo:function(x2,y2,endx,endy) {
         return this.pushStack('s',[
                    x2 + "," + y2,
                    endx + "," + endy
                ]);
    },
    CurveTo:function(x1,y1,x2,y2,endx,endy){
        return this.pushStack('C',[
                    x1 + "," + y1,
                    x2 + "," + y2,
                    endx + "," + endy
                ]);
    },
   curveTo:function(x1,y1,x2,y2,endx,endy){
        return this.pushStack('c',[
                    x1 + "," + y1,
                    x2 + "," + y2,
                    x3 + "," + y3
                ]);
    },
    QuadraticBelzierCurveTo:function(x,y,endx,endy){
        return this.pushStack('Q',[
                    x + "," + y,
                    endx + "," + endy
                ]);
    },
    quadraticBelzierCurveTo:function(x,y,endx,endy){
        return this.pushStack('q',[
                    x + "," + y,
                    endx + "," + endy
                ]);
    },
    SmoothQuadraticBezierCurveto :function(endx,endy) {
        return this.pushStack('T',[
                    endx + "," + endy
                ]);
    },
    smoothQuadraticBezierCurveto:function(endx,endy){
        return this.pushStack('t',[
                    endx + "," + endy
                ]);
    },
    closePath:function(){
        return this.pushStack("Z",[]);
    },
    pushStack:function(action,params){
        this.pathStack.push({
            action:action,
            params:params
        });
        return this;
    },
    getAbsolutePoints:function(){
        var actions  = this.pathStack;
        var x = 0,y =0 ;
        var points = [];
        for(var i = 0; i <actions.length;i++) {
            var action = actions[i];
            var name = action.action;
            var baseName = name.toLowerCase();
            var params = action.params;
            if(baseName!=='z') {
                var point = params[params.length - 1].split(',').map(function(val){
                    return parseFloat(val);
                })
                var x_new ,y_new;
                if(baseName == 'v'){
                    x_new = 0;
                    y_new = point[0];
                } else if(baseName =='h') {
                    x_new = point[0];
                    y_new = 0;
                } else {
                    x_new = point[0];
                    y_new = point[1];
                }
                if(/[A-Z]/g.test(name)) {
                    x=x_new;
                    y=y_new;
                } else {
                    x+=x_new;
                    y+=y_new;
                }
                points.push({x:x,y:y});
            }
        }
        return points;
    },
    getCurPoint:function(){
        var actions  = this.pathStack;
        var x = 0,y =0 ;
        var points = this.getAbsolutePoints();
        if(points.length>0) {
            var p = points[points.length-1];
            x = p.x;
            y = p.y;
        }
        return {x:x,y:y};
    },
    get:function(index){
        return this.pathStack[index];
    },
    getPath:function(){
        return this.toString();
    },
    clone:function(){
        var str = this.toString();
        return new this.constructor(str);
    },
    connectToPath:function(path){
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
        return this;

    },
    toString:function(){
        //最好在出口处取整一下;
        var ret = [],pathStack = this.pathStack;
        ret = pathStack.map(function(path,index){
            return  path.action + " " + path.params.join(",");
        })
        return ret.join(" ");
    }
}
Path.extend = Path.fn.extend = $.extend;
Path.parse = function(str){
    str = $.trim(str);
    var actions = str.match(/[a-zA-Z][^a-zA-Z]*/gi);
    var path = new Path();
    if(!actions) {
        return;
    }
    for(var i = 0; i < actions.length;i++) {
        var action = actions[i];
        var type = action.match(/[a-zA-Z]/gi)[0];
        var data = $.trim(action.replace(/[a-zA-Z]/gi,''));
        var params = data.split(/[\s,]+/gi).map(function(val){
            return parseFloat(val);
        })
        if(typeof path[type] == 'undefined') {
            return false;
        }
        path[type].apply(path,params);
    }
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
for(var key in shortName) {
    Path.fn[key] = Path.fn[shortName[key]];
}