import React from 'react'
module.exports = React.createClass({
	render(){
       	var clockURL = require("../../../demo/clock.demo.html");
       	var style = {width:"100%",height:"400px"};
		return (
			<div className="content">
				<h1>时钟</h1>
				<iframe className="demo-iframe" src={clockURL} style={style} />
				<pre>
				{
`
//相关代码
`	
				}
				</pre>
			</div>
		)
	}
})