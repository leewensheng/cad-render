import React from './react'
import cad from '../index'

var paper = cad.init("#root",{width:600,height:400});

var com = React.createClass({
    render(){
        var path = paper.createVirtualDOM("rect").attr({x:0,y:0,width:100,height:100}).fill(this.props.color)
        return path;
    }
})
var test = React.createClass({
    getDefaultProps(){
        return {};
    },
    getInitialState(){
        return {
            color:"blue"
        }
    },
    render(){
        var that = this;
        var color = this.state.color;
        var g = paper.createVirtualDOM("g");
        paper.switchLayer(g);
        paper.line(0,0,1000,1000).attr("stroke",this.state.color).attr("stroke-width",50)
             .on("click",that.handleClick.bind(that))
        paper.append(com,{color:color});
        return g;
    },
    handleClick(){
        this.setState({color:"yellow"})
    },
    componentDidUpdate(prevProps, prevState) {
      console.log("componentDidUpdate")  
    },
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate");
        return true;
    },
    componentWillUpdate(){
        console.log('componentWillUpdate')
    },
    componentDidMount(){
        console.log("componentDidMount");
    }
})
var vdom = React.createElement(test);
window.vdom = vdom;
React.render(vdom,document.getElementById("default_layer"));
