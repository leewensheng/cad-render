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
import CAD from '../lib/svg'

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
        var paper = CAD.init({
                el:el,
                width:"100%",
                height:500
            });
        paper.append("line",{
            x1:0,
            x2:5,
            y1:11,
            y2:55
        }).attr("stroke","red");
        var line = paper.append("line",{x1:0,x2:100,y1:270,y2:270})
        paper.append("circle",{
            cx:120,cy:120,r:120
        })
        var bg = paper.append("rect",{
            x1:0,
            y1:0,
            width:"100%",
            height: "100%",
            fill:"#000"
        })
        $(paper.doc).on("mousemove",function(e){
            var point = paper.mouse(e);
            var circle = paper.append("circle",{
                cx:point.x,
                cy:point.y,
                r:0,
                fill:"#ddd"
            })
            Animation.init({
                target:circle,
                from:0,
                to:50,
                during:5600,
                exefunc:function(r){
                    circle.attr("r",r)
                },
                callback:function(){
                    this.remove();
                }
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
//ReactDOM.render(<Nav a="3"/>,document.getElementById("root"))

        var paper = CAD.init({
                el:document.querySelector("#root"),
                width:"100%",
                height:800
            });
        paper.append("line",{
            x1:0,
            x2:5,
            y1:11,
            y2:55
        }).attr("stroke","red");
        var line = paper.append("line",{x1:0,x2:100,y1:270,y2:270})
        paper.append("circle",{
            cx:120,cy:120,r:120
        })
        var bg = paper.append("rect",{
            x1:0,
            y1:0,
            width:"100%",
            height: "100%",
            fill:"#000"
        })
        $(paper.doc).on("mousemove",move)
        function move(e){
            {
            var point = paper.mouse(e);
            var circle = paper.append("circle",{
                cx:point.x,
                cy:point.y,
                r:1e-6
            })
            Animation.init({
                target:circle,
                from:0,
                to:100,
                during:2000,
                exefunc:function(r){
                    circle.attr("r",r).attr("stroke-opacity",(100-r)/100);
                },
                callback:function(){
                    this.remove();
                }
            })
        }
        }