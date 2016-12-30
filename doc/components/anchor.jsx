import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
module.exports = React.createClass({
    getInitialState(){
        return {
            active:false
        }
    },
    render(){
        var className = '';
        if(this.props.isActive) {
            className = 'active';
        }
        return (
        <span onClick={this.handleClick}><a href="javascript:;" className={className}>{this.props.children}</a></span>
        )
    },
    handleClick(){
        var index = this.props.index;
        this.props.onClick(index);
    }
})