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
        var n = 0;
        var timer = setTimeout(test,1000);
        function test() {
            for(var i =0 ;i<30;i++) {
                paper.circle(Math.random()*width,Math.random()*height,Math.random()*100);
            }
            n++;
            if(n<2000) {
                timer =  setTimeout(test,1000)
            } else {
                clearTimeout(timer);
            }
        }
    },

})
module.exports = Performance;