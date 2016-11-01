import React from 'react'
import ReactDOM from 'react-dom'
import dndSys from "./drag_drop_sort_center"
import $ from "jquery"

var Droppable = React.createClass({
    getDefaultProps(){
        return {
            accept:"default_draggable_id",
            drop:false,
            out:false,
            over:false,
            disabled:false,
            greedy:false,
            hoverClass:false,
            addClass:"ui-droppable"
        }
    },
    getInitialState(){
        return {
            drag_over:false
        }
    },
    render(){
        var style = {};
        if(this.state.drag_over) {
            style.background = "gray";
        }
        return <div style={style} {...this.props}>
                    {this.props.children}
                </div>
    },
    componentDidMount(){
        $(document).on("mousedown",this.handleMouseDown);
    },
    handleMouseDown(){
        $(document).on("mousemove",this.handleMouseMove);
        $(document).on("mouseup",this.handleMouseUp);
    },
    handleMouseMove(){
        var draggingObj = dndSys.draggingObj;
        if(!draggingObj) {
            return;
        }
        var id = draggingObj.id;
        if(this.props.accept!==id) {
            return;
        }
        var clientX = draggingObj.clientX;
        var clientY = draggingObj.clientY;
        var me = ReactDOM.findDOMNode(this);
        var dropClient = me.getBoundingClientRect();
        if(clientX > dropClient.left && clientX < dropClient.right&&clientY>dropClient.top&&clientY < dropClient.bottom) {
            this.setState({
                drag_over:true
            })
        } else {
            this.setState({
                drag_over: false
            })
        }

    },
    handleMouseUp(event){
        if(this.state.drag_over) {
            if(typeof this.props.drop == "function") {
                var draggingObj = dndSys.draggingObj;
                this.props.drop.call(this,draggingObj.target);
            }
        }
        this.setState({
            drag_over:false
        })
        $(document).off("mousemove",this.handleMouseMove);
        $(document).off("mouseup",this.handleMouseUp);
    },
    componentWillUnmount(){
        $(document).off("down",this.handleMouseDown);
        $(document).off("mousemove",this.handleMouseMove);
        $(document).off("mouseup",this.handleMouseUp);
    }
})
module.exports = Droppable;