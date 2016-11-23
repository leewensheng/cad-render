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
                width:160,
                height:160
            });
        paper.configLayer({
            stroke:"#fff",
            fill:"none",
            "stroke-width":2
        })
        paper.viewBox(0,0,16,16);
        var path = new cad.Path();
        paper.circle(8,8,7);
        path.M(8,8).v(-4).M(8,8).h(4);
        paper.path(path);
    }
})
module.exports = Performance;