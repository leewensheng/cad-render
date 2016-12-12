import React from 'react'
import ReactDOM from 'react-dom'
import Chart from '../lib/chart'
var Pie = React.createClass({
	render(){
		return <div></div>
	},
	componentDidMount(){
		var el = ReactDOM.findDOMNode(this);
		var pie = new Chart({
			el:el,
			data:[1,1,0.56]
		});
	}
});
module.exports = Pie;