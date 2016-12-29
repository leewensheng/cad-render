import React from 'react'

var Menu = React.createClass({
    getInitialState(){
        var height = document.documentElement.clientHeight;
        return {
            height:height - 60
        }
    },
    resize(){
         var height = document.documentElement.clientHeight;
         this.setState({height: height-60});
    },
    render(){
        var {width} = this.props;
        var height  = this.state.height;
        var style = {width,height};
        return(
            <div className="doc-nav" style={style}>
                {this.props.children}
            </div>
        )
    },
    componentDidMount(){
        var that = this;
        window.addEventListener("resize",this.resize);
    },
    componentWillUnmount(){
        window.removeEventListener("resize",this.resize);
    }
})
module.exports = Menu;