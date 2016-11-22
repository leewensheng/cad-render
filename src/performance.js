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
                width:width,
                height:height,
            });
        paper.rect(0,0,width,height).fill("#000");
        paper.circle(50,50,50);
        paper.angleLine(50,50,-90,40);
        paper.angleLine(50,50,0,40);
        paper.path(new cad.Path().MoveTo(100,100).angleArcTo(350,200,200,200)).stroke("red")
        paper.path(new cad.Path().MoveTo(100,100).angleArcTo(370,200,200,200))
    }
})
module.exports = Performance;