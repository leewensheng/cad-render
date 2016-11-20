import React from 'react'
import ReactDOM from 'react-dom'
import ClassName from '../lib/class-name'
import Draggable from  '../lib/draggable'
import "./test.css"
import Droppable from "../lib/droppable"
import "./index.css"
import $ from 'jquery'
import Sorttable from "../lib/sorttable"
import Animation from "../lib/svg/animation"
import CreateUrl from '../lib/url'
import cad from '../lib/svg'
window.cad = cad;
window.React = React;
window.ReactDOM = ReactDOM;
var Button = React.createClass({
    render(){
       var  style = {};
        return <button>3</button>
    },
    componentDidMount(){
        var me = ReactDOM.findDOMNode(this);
    }
})
var SVG = React.createClass({
    render() {
        return <div></div>
    },
    componentDidMount(){
        var el = ReactDOM.findDOMNode(this);
        var paper = cad.init({
                el:el,
                width:"100%",
                height:window.innerHeight
            });
        var bg = paper.append("rect",{
            x1:0,
            y1:0,
            width:"100%",
            height: "100%",
            fill:"#000"
        })
        paper.importDefs("shadow",{
            offsetX:0,
            offsetY:0
        }).importDefs("blur");
        paper.importDefs("linearGradient",{stops:[{
            offset:"0%",
            color:"red"
        },{offset:"100%",color:"blue"}]})
        .importDefs("radialGradient",{stops:[{
            offset:"0%",
            color:"red"
        },{offset:"100%",color:"blue"}]});
        paper.addShape("gear",380,380,{
            r1:200,
            r2:280,
            teeth:20
        }).rotate(9,380,380).useDefs("fill","linearGradient").dash("5,10",500)
            .animateMotion({
            path:new cad.Path().MoveTo(0,0).lineTo(100,100).angleArcTo(45,70,200,200,true).h(83).v(-33).toString(),
            dur:'2s',
            begein:'0s',
            repeatCount:"indefinite"
        })
        var mirrorPoint = cad.Point(380,380).mirror(620,50,620,70);
        paper.addShape("gear",mirrorPoint.x,mirrorPoint.y,{
            r1:200,
            r2:280,
            teeth:20
        }).attr("fill","yellow").attr("stroke-width",20).useDefs("filter","blur").useDefs("fill","radialGradient");
        paper.append("circle",{
            cx:mirrorPoint.x,
            cy:mirrorPoint.y,
            r:50
        })
        paper.importDefs("linearGradient",{
            id:"pinkGradient",
            x1:"0%",
            y1:"0%",
            x2:"100%",
            y2:"100%",
            stops:[{
                offset:"0%",
                color:"#f00"
            },{
                offset:"100%",
                color:"pink"
            }]
        })
        paper.addShape("heart",380,380,{size:150}).useDefs("fill","pinkGradient");
        paper.append("circle",{
            cx:380,
            cy:380,
            r:50
        })
        paper.append("text").attr("x",50).attr("y",50).attr("font-size",50).text('test').attr("stroke","red")
        /*paper.append('circle').attr("r",20).arrayCopy(35,22,function(x,y){
            $(this).attr("cx",x*40+20).attr("cy",y*40+20).attr("fill",cad.hsl(x*y%360,50,50))
        }).attr("stroke","none")*/
        var count = 0;
        $(paper.svg).on("mousemove touchstart touchmove",function(e){
            return;
            e.preventDefault();
            e.stopPropagation();
            var point = paper.mouse(e);
            count++;
            var color = cad.hsl(count%360,100,50);
            var circle = paper.append("circle",{
                cx:point.x,
                cy:point.y,
                r:1e-6
            }).attr('stroke',color);
            circle.transition({
                                r:100,
                                strokeOpacity:1e-6
                                },
                                2000,
                                'easeout',function(){
                $(this).remove();
            })
        })

    }
})
var Nav = React.createClass({
    getInitialState(){
      return {
        open:true
      }
    },
    render(){
      var c = ClassName('test').addClass("test").addClass('haha').toggleClass('haha');
      return  (
        <div>
        <SVG/>
        <Button/>
        <Draggable axis="" helper="clone">
            <table border="1px">
                <thead>
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
        </Draggable>
        <Draggable helper="clone">button</Draggable>
        <Draggable dragId="test" axis="y"  zIndex="10">
        <Droppable className="drop-wrap" drop={drop}><h1>drop</h1></Droppable>
        </Draggable>
        <Draggable helper="clone">
        <Sorttable axis="y"><ul><li>test</li><li>test2</li></ul></Sorttable>
        </Draggable>
        </div>
        )
    }
})
function drop(target){
    target.revert();
   var el = ReactDOM.findDOMNode(target)
   var me = ReactDOM.findDOMNode(this);
   $(me).append($(el).get(0).cloneNode(true));
}
ReactDOM.render(<Nav a="3"/>,document.getElementById("root"))