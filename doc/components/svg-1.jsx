import React from 'react'
import ReactDOM from 'react-dom'

module.exports = React.createClass({
	getInitialState(){
		return {
			paper:null
		}
	},
	render(){
		return (
			<div {...this.props}>
			</div>
		)
	},
	componentDidMount(){
		var paper = cad.init({
			el:ReactDOM.findDOMNode(this)
		});
		this.setState({
			paper:paper
		})
		var width = paper.width();
		var height = paper.height();
		paper.circle(-220,-160,400).stroke('#333');
		paper.circle(-150,-130,300).stroke('#333');
		paper.circle(width+200,-150,400).stroke("#333");
		paper.circle(width+150,-130,300).stroke("#333");
		paper.circle(500,300,100).fill("darkred");
		paper.importSymbol("chrome");
		paper.use("chrome",200,300,100,100).stroke("none");
	},
	componentWillUnmount(){
		this.state.paper.destroy();
		this.setState({
			paper:null
		});
	}
})