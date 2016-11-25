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
                width:window.innerWidth,
                height:window.innerHeight
            });
        paper.configLayer({
            "stroke-width":2.5
        })
         var count = 0;
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
            circle.transition({
                                r:100,
                                strokeOpacity:1e-6
                                },
                                2000,
                                Math.sqrt,function(){
                $(this).remove();
            })
        })
    }
})
module.exports = Disappear;