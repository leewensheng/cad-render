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
                width:50,
                height:50
            });
        paper.svg.attr("viewBox","0 0 20 20")
        paper.circle(10,10,8).stroke("#ddd",1)
        paper.angleLine(9,11,-90,6).stroke('#ddd',1)
        paper.angleLine(9,11,0,6).stroke('#ddd',1)
    }
})
module.exports = Performance;