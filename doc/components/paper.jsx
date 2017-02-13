import React from 'react'
import ReactDOM from 'react-dom'

module.exports = React.createClass({
    render(){
        var height = this.props.height;
        return (
            <div style={{height:height}}>
            </div>
        )
    },
    componentDidMount(){
        var el = ReactDOM.findDOMNode(this);
        var paper = cad.init(el);
        if(typeof this.props.onInit=='function') {
            this.props.onInit.call(null,paper);
        }
    },
    componentWillUnMount(){

    }
})