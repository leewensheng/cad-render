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
    }
})
module.exports = Performance;