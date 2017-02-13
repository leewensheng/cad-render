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
        var paper = cad.init(el,{
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
        var chrome = paper.use("chrome2",-200,-200,400,400).linkURL("http://www.baidu.com/s?wd=chrome").title("chrome");
        chrome.translate(200,200).transition({transform:'translate(200,200)rotate(3600)'},50000,'linear')
    }
})
module.exports = Performance;