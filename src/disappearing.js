import React from 'react'
import ReactDOM from 'react-dom'
import cad from '../lib/svg'

var Disappear = React.createClass({
    render(){
        return <div></div>
    },
    componentDidMount:function() {
        var el = ReactDOM.findDOMNode(this);
        var paper = cad.init({
                el:el,
                width:"100%",
                height:window.innerHeight-3
        });
        paper.configLayer({
            'stroke-width':2.5
        })
         var count = 0;
         paper.importSymbol("chrome2");
         paper.importBlock("chrome",200);
         //paper.use("chrome2",0,0,300,300);
        // paper.use("chrome",0,0,500,500);
         paper.importDefs("line",60,10).attr("id","line").attr("stroke",'yellow')
         paper.importDefs("block",50).attr("id","block").attr("stroke","blue").attr("stroke-width",5)
         paper.rect(20,20,100,100).fill("url(#line)").stroke("#fff");
         paper.circle(200,200,150).fill("url(#block)").stroke("#fff")
         .transition({transform:"rotate(360,200,200)"},60000,'linear')
         paper.on("mousemove  touchstart touchmove",function(e){
            e.preventDefault();
            e.stopPropagation();
            var point = paper.mouse(e);
            count++;
            var color = cad.hsl(count%360,100,50);
            var circle = paper.append("circle",{
                cx:point.x,
                cy:point.y,
                r:1e-6
            }).attr('stroke',color);
            var ease = Math.sqrt;
            circle.transition({
                                r:100,
                                "stroke-opacity":1e-6
                                },
                                2000,
                               ease,function(){
                $(this).remove();
            })
        })
    }
})
module.exports = Disappear;