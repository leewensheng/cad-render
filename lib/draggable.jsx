import React from 'react'
import ReactDOM from 'react-dom'
import $ from "jquery"
import "../lib/draggable.css"
import bowser from "bowser"
import dndSys from "./drag_drop_sort_center"

var Draggable = React.createClass({
    getDefaultProps(){
        return {
            helper:"original",
            appendTo:'parent',
            position:"relative",
            zIndex:"11",
            axis:false,
            disabled:false,
            start:false,
            drag:false,
            stop:false,
            opacity:1,
            handle:false,
            distance: 1,
            cursor:"auto",
            delay:0,
            dragId:"default_draggable_id",
            connectToSorttable:false
        }
    },
    getInitialState(){
        return {
            isDragging:false,
            startX:0,
            startY:0,
            left:0,
            top:0,
            startLeft:0,
            startTop:0,
            helper:false
        }
    },
    render(){
        
        var style = this.getStyle();
        if(this.props.helper!="clone") {
            return <div style={style} className="ui-draggable-handle">{this.props.children}</div>
        } else {
            return <div className="ui-draggable-handle">{this.props.children}</div>
        }
    },
    getStyle() {
        var left = this.state.left;
        var top = this.state.top;
        var style ;
        if(!(bowser.msie&&bowser.version<9)) {
            style = {
            "transform":"translate("+left+"px,"+top+"px" + ")",
            "mStransform":"translate("+left+"px,"+top+"px" + ")",
            "zIndex":this.props.zIndex
            }
        } else {
            style = {
                "left":left + "px",
                "top" :top +"px",
                "zIndex":this.props.zIndex
            }
        }
        if(this.state.isDragging) {
            style.opacity = this.props.opacity;
        }
        return style;
    },
    componentDidMount(){
        var el = ReactDOM.findDOMNode(this);
        var position = $(el).css("position");
        if(position) {
            $(el).css("position",this.props.position);
        }
        $(el).on("mousedown",this.dragStart);
    },
    dragStart(e){
        e.preventDefault();
        var x = e.pageX;
        var y = e.pageY;
        dndSys.draggingObj = {
            target:this,
            id:this.props.dragId,
            clientX:e.clientX,
            clientY:e.clientY
        }
        if(this.props.helper=="clone") {
            //需要考虑helper动态的情况
            var el = ReactDOM.findDOMNode(this);
            var helper = el.cloneNode(true);
            this.state.helper = helper;
            //to 去掉id属性
            el.parentNode.appendChild(helper);
            var rect = el.getBoundingClientRect();
            var helperRect = helper.getBoundingClientRect();
            var dx = rect.left - helperRect.left;
            var dy = rect.top - helperRect.top;
            helper.style.position = this.props.position;
            helper.style.zIndex = 111111111111111111;
            helper.style.left = dx+"px";
            helper.style.top  = dy +"px";
        }
        this.setState({
            isDragging:true,
            startX:x,
            startY:y
        })
        $(document).on("mousemove",this.dragMove);
        $(document).on("mouseup",this.dragEnd);
    },
    dragMove(e){
        e.preventDefault();
        if(!this.state.isDragging) {
            return;
        }
        var x = e.pageX;
        var y = e.pageY;
        var dx = x - this.state.startX;
        var dy = y - this.state.startY;
        var left = this.state.startLeft + dx;
        var top =  this.state.startTop + dy;
        this.setState({
            left: this.props.axis == "y" ?this.state.startLeft:left,
            top:  this.props.axis == "x" ?this.state.startTop:top,
        })
        if(this.props.helper=="clone") {
            var helper = this.state.helper;
            var style = this.getStyle();
            $(helper).css(style);
        }

        dndSys.draggingObj.clientX = e.clientX;
        dndSys.draggingObj.clientY = e.clientY;
    },
    dragEnd(e) {
        this.setState({
            isDragging:false,
            startLeft:this.state.left,
            startTop:this.state.top
        })
        setTimeout(function(){
            dndSys.draggingObj = null;
        },10);
        if(this.props.helper == "clone") {
            this.setState({
                isDragging:false,
                startLeft:0,
                startTop:0
            })
        }
        $(this.state.helper).remove();
        this.state.helper = null;
        $(document).off("mouseup",this.dragEnd);
        $(document).off("mousemove",this.dragMove);
    },
    revert(){
        this.setState({
            isDragging:false,
            left: 0,
            top:0,
            startLeft:0,
            startTop:0
        })
    },
    componentWillUnmount(){
        var el = ReactDOM.findDOMNode(this);
        $(el).off("mousedown",this.dragStart);
        $(document).off("mouseup",this.dragEnd);
        $(document).off("mousemove",this.dragMove);
    }
})
module.exports = Draggable;