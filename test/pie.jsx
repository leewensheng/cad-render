import React from 'react'
import cad from '../src/index'

module.exports = React.createClass({
	getInitialState(){
		return {
			data:[1,2,3]
		}
	},
	render(){
		var data = this.state.data;
		var points = [];
		var sum = cad.sum(data);
		data.reduce(function(start,end,index){
	        var startAngle = start;
	        var endAngle = startAngle + end/sum*360;
	        var cx = 150;
	        var cy = 150;
	        var radius = 100;
	        var d  = cad.getShapePath('sector',cx,cy,{radius,startAngle,endAngle});
	        points.push(d);
	        return endAngle;
	    },0)
		return (
			<svg width="600" height="400" onClick={this.onClick}>
				{
					points.map(function(d,index){
    					var colors = ['#00A1A1',"#28FFBB","#DB1774","#F20000"];
						return <path d={d} fill={colors[index%4]}/>
					})
				}
			</svg>
		)
	},
	onClick(){
		var data = this.state.data;
		data.push(Math.random()*3);
		this.setState({data:data})
	}
})