import React from 'react'
import ReactDOM from 'react-dom'
var Performance = React.createClass({
    render:function(){
        return <div>
                </div>
    },
    componentDidMount:function(){
        var el = ReactDOM.findDOMNode(this);
        var width = window.innerWidth;
        var height = window.innerHeight;
        var paper = cad.init({
                el:el,
                width:window.innerWidth,
                height:window.innerHeight
            });
        paper.configLayer({
            stroke:"#fff",
            fill:"none",
            "stroke-width":2
        })
        paper.ellipse(360,200,300,100).fill('red');
        paper.diagonalEllipses(100,100,250,500).fill("blue").stroke("pink",30);
        paper.addShape('markLine',0,0,500,500,{width:50,height:80}).rotate(15,80,80).fill('red').stroke("red")
    }
})
module.exports = Performance;