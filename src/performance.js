import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
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
            stroke:"none",
            fill:"none",
            "stroke-width":2
        })
        paper.addBlock("chrome",200,200,100);
    }
})
module.exports = Performance;