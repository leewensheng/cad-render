import paper from './paper'
import Point from './point'
import Path from './path'

paper.fn.extend({
    angleLine:function(){

    },
    line:function(){

    },
    circle:function(){

    },
    rect:function(){
        
    },
    path:function(){

    },
    polygon:function(){

    },
    spline:function(points){
        var path = new Path().SplineTo(points);
        return this.append("path").attr('d',path.toString())
    }
})