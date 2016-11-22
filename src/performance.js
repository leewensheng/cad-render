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
                width:"1000",
                height:window.innerHeight
            });
        paper.configLayer({
            fill:"#ff0",
            stroke:"#fff",
            "stroke-width":5
        })
        paper.svg.on("click",function(){
            paper.cleanLayer();
        })
        paper.sector(200,50,0,180,100,0)
    }
})
module.exports = Performance;