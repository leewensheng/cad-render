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
        paper.importBlock("chrome",100);
        paper.use("chrome",100,100).click(function(){
            
        })
    }
})
module.exports = Performance;