import React from 'react'
import Paper from '../../components/paper'
module.exports = React.createClass({
    render(){
        var demoURL = require("../../../demo/candy.demo.html");
        var style = {width:"100%",height:"400px"};
        return (
            <div className="content">
                <h1>糖果缤纷</h1>
                <Paper height={300} onInit={this.candy}></Paper>
                <pre>
                {
`
//相关代码
`   
                }
                </pre>
            </div>
        )
    },
    candy(paper){
        console.log(paper)
        paper.configLayer({
            "stroke":"none"
        });
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        var maxX = paper.width(),
            maxY = paper.height(),
            radius = 40,
            shake = 50;
        var candy = function(width,height,paper){
            var cx = Math.random()*width;
            var cy = Math.random()*height;
            var color = cad.hsl(Math.ceil(Math.random()*360),1,0.5);
            var points = [];
            var num = 5;
            for(var i = 0; i < num; i++) {
                var p = cad.Point(cx,cy).angleMoveTo(360/num*i,radius+shake*Math.random());
                points.push(p);
            }
            var el = paper.path(new cad.Path().CurveToAll(points,true)).fill(color);
            this.el = el;
            this.points = points;
            this.move();
        };
        candy.prototype = {
            move:function(){
                var angle = Math.random()*Math.PI*2;
                this.el.transition({
                    transform:"translate("+ [Math.cos(angle)*maxY,Math.sin(angle)*maxY].join(",") +")"
                },600,'ease',function(){
                    $(this).remove();
                })
            }
        };
        setInterval(function(){
            new candy(maxX,maxY,paper);
        },100)
    }
})