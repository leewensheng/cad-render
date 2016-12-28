import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
module.exports = React.createClass({
	render(){
		return (
			<div className="mobile-nav">
				<span ref='btnSide' onClick={this.openSide} className="btn btn-primary">
				按钮
				</span>
			</div>		
		)
	},
	openSide(){
		$(".doc-nav").toggleClass("open");
	}
})
