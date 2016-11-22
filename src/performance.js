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
                width:"100%",
                height:window.innerHeight
            });

        var path = new cad.Path().M(100,0)
                    .angleArcTo(900,100,100,100).v(55);
        paper.path(path.toString())
    }
})
module.exports = Performance;