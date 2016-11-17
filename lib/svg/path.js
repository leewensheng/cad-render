import $ from 'jquery'
module.exports = Path;
function Path(initialPath){
    this.pathStack = [];
};
Path.fn = Path.prototype = {
    MoveTo:function(x,y){
        return this.pushStack("M",[x + " " + y]);
    },
    moveTo:function(dx,dy) {
        return this.pushStack("m",[dx + " " + dy]);
    },
    ArcTo:function(rx,ry,rotateX,isLargeArc,isClockwise,endX,endY){
        return this.pushStack("A",[    rx + " " + ry,
                                rotateX,
                                isLargeArc,
                                isClockwise,
                                endX +" " +endY
                            ]
        )
    },
    arcTo:function(rx,ry,rotateX,isLargeArc,isClockwise,endX,endY){
        return this.pushStack("a",[    rx + " " + ry,
                                rotateX,
                                isLargeArc,
                                isClockwise,
                                endX +" " +endY
                            ]
        )
    },
    LineTo:function(x,y){
        return this.pushStack("L",[x + " " + y]);
    },
    lineTo:function(dx,dy) {
        return this.pushStack("l",[dx + " " + dy]);
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
    SplineTo:function(x2,y2,endx,endy) {
         return this.pushStack('S',[
                    x2 + " " + y2,
                    endx + " " + endy
                ]);
    },
    splineTo:function(x2,y2,endx,endy) {
         return this.pushStack('s',[
                    x2 + " " + y2,
                    endx + " " + endy
                ]);
    },
    CurveTo:function(x1,y1,x2,y2,endx,endy){
        /*  
            x1 y1控制杆1
            x2,y2控制杆2
            x,y终点
        */
        return this.pushStack('C',[
                    x1 + " " + y1,
                    x2 + " " + y2,
                    endx + " " + endy
                ]);

    },
   curveTo:function(x1,y1,x2,y2,endx,endy){
        return this.pushStack('c',[
                    x1 + " " + y1,
                    x2 + " " + y2,
                    x3 + " " + y3
                ]);

    },
    QuadraticBelzierCurveTo:function(x,y,endx,endy){
        return this.pushStack('c',[
                    x + " " + y,
                    endx + " " + endy
                ]);
    },
    quadraticBelzierCurveTo:function(x,y,endx,endy){
        return this.pushStack('c',[
                    x + " " + y,
                    endx + " " + endy
                ]);
    },
    SmoothQuadraticBezierCurveto :function(endx,endy) {
        return this.pushStack('T',[
                    endx + " " + endy
                ]);
    },
    smoothQuadraticBezierCurveto:function(endx,endy){
        return this.pushStack('t',[
                    endx + " " + endy
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
    get:function(index){
        return this.pathStack[index];
    },
    getPath:function(){
        return this.toString();
    },
    toString:function(){
        var ret = [],pathStack = this.pathStack;
        ret = pathStack.map(function(path,index){
            return  path.action + " " + path.params.join(",");
        })
        return ret.join(" ");
    }
}
Path.extend = Path.fn.extend = $.extend;
