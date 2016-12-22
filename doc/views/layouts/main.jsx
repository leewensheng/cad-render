import React from 'react'
import Header from '../../components/header'
import '../../statics/css/normalize.css'
import '../../statics/css/main.css'
import '../../statics/css/ui.css'
import cad from '../../../src/index'
var Main = React.createClass({
	render(){
		var {children} = this.props;
		return (
			<div>
				<Header/>
				<div className="page-main">
					{children}
				</div>
			</div>
		)
	}
})

module.exports = Main;