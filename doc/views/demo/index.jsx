import React from 'react'
import {Link,IndexLink} from 'react-router'
import SideMenu from '../../components/side-menu.jsx'
module.exports = React.createClass({
	render(){
       	var sideWidth = 200;
		return (
			<div className="doc">
            	<SideMenu width={sideWidth}>
            		<div className="side-nav">
                    <p className="title">图形</p>
                    <ul className="nav-list">
                        <li><IndexLink  activeClassName="active" to="/demo">时钟</IndexLink></li>
                        <li><Link  activeClassName="active" to="/demo/animate">圆环</Link></li>
                        <li><Link  activeClassName="active" to="/demo/transform">transorm动画</Link></li>
                        <li><Link  activeClassName="active" to="/demo/pie">饼图</Link></li>
                    </ul>
                </div>
            	</SideMenu>
            	<div className="doc-content" style={{marginLeft:sideWidth}}>
	                {this.props.children}
	            </div>
            </div>

		)
	}
})