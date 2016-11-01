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

window.React = React;
window.ReactDOM = ReactDOM;
var Button = React.createClass({
    render(){
       var  style = {};
        return <button>3</button>
    },
    componentDidMount(){
        var me = this;
        Animation.init(React.findDOMNode(this),0,500,1000,function(val){
            ReactDOM.findDOMNode(me).style.marginLeft = val+"px";
        },'bounce')
        Animation.init(React.findDOMNode(this),500,0,1500,function(val){
            ReactDOM.findDOMNode(me).style.marginLeft = val+"px";
        },'bounce')
        Animation.init(React.findDOMNode(this),0,500,1000,function(val){
            ReactDOM.findDOMNode(me).style.marginLeft = val+"px";
        },'bounce')
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
