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
            color:"blue",
            num:[1,2,3]
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
        if(color === 'yellow') {
            paper.line(0,0,200,250).attr("stroke","black");
        }
        this.state.num.map(function(){
            paper.line(0,0,100,100).attr('stroke',"red");
        })
        return g;
    },
    handleClick(){
        var num = this.state.num;
        num.splice(1,1);
        this.setState({
            num:num
        })
    },
    componentDidUpdate(prevProps, prevState) {
    },
    shouldComponentUpdate(){
        return true;
    },
    componentWillUpdate(){
    },
    componentDidMount(){
    }
})
var vdom = React.createElement(test);
window.vdom = vdom;
React.render(vdom,document.getElementById("default_layer"));
