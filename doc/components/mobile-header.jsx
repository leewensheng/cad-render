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
	componentDidMount(){
		window.addEventListener("resize",this.handleResize);
	},
	componentWillUnmount(){
		window.removeEventListener("resize",this.handleResize);
	},
	handleResize(){
		if(window.innerWidth > 640) {
			$(".doc-nav").removeClass("open");
		}
	},
	openSide(){
		$(".doc-nav").toggleClass("open");
	}
})
