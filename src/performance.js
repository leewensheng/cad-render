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
                width:"100%",
                height:window.innerHeight-10
            });
        paper.configLayer({
            stroke:"none",
            fill:"none",
            "stroke-width":2
        })
        paper.importBlock("chrome",100);
        paper.importSymbol('chrome2');
        var p = paper.use("chrome",0,0);
        paper.use("chrome2",50,50,400,400).linkURL("http://www.baidu.com");
        paper.title("chrome")
        paper.on("click",function(){
            p.upperZIndex(1);
        })
    }
})
module.exports = Performance;