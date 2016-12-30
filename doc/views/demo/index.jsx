import React from 'react'
import {Link,IndexLink} from 'react-router'
import SideMenu from '../../components/side-menu.jsx'
import {menus} from '../../data/demo-menu'

module.exports = React.createClass({
	render(){
       	var sideWidth = 200;
        var path = this.props.location.pathname;
		return (
			<div className="doc">
            	<SideMenu width={sideWidth} path={path} menus={menus}>
            	</SideMenu>
            	<div className="doc-content" style={{marginLeft:sideWidth}}>
	                {this.props.children}
	            </div>
            </div>

		)
	}
})