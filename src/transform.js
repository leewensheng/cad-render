import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
var Transform = React.createClass({
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
            "stroke":"#fff",
            "stroke-width":0.1
        });
        paper.rect(0,0,20,20).arrayCopy(48,25,function(x,y){
            var color = cad.hsl(x/48*360,100,y/25*100);
            $(this).translate(x*20,y*20).fill(color).rotate(0,0,0);
        }).on("mouseover",mouseover);
        function mouseover(e){
            this.parentNode.appendChild(this);
            $(this).css("pointer-events","none").transition({transform:"translate(480,480)scale(23)rotate(180)"},750,'easeout',function(){
                var me = this;
                setTimeout(function(){
                    $(me).transition({
                            transform:"translate(240,240)scale(0)",
                            "fill-opacity":0
                        },750,'linear',function(){
                        me.remove();
                    })
                },750);
                
            })
        }
    }
})
module.exports = Transform;