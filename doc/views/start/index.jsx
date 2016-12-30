import React from 'react'
import SideMenu from '../../components/side-menu.jsx'
import {menus} from '../../data/start-menu.js'
import $ from 'jquery'
module.exports = React.createClass({
    render(){
       var sideWidth = 250;
       var path = this.props.location.pathname;
       return( 
        <div className="doc">
            <SideMenu width={sideWidth} path={path} menus={menus} />
            <div className="doc-content" style={{marginLeft:sideWidth}}>
                {this.props.children}
            </div>
        </div>
        )
    }
})