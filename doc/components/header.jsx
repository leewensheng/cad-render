import React from 'react'
import {Link} from 'react-router'
module.exports = React.createClass({
	render(){
		return (
			<div className="nav">
                 <div className="header">
                     <Link to="/" className="logo-wrap">
                         <span className="logo"></span>CADRender
                     </Link>
                     <span className="sub-title">better</span>
                     <ul className="nav-tabs clearfix">
                         <li>
                             <Link to="start">快速上手</Link>
                         </li>
                         <li>
                             <Link to="demo">示例</Link>
                         </li>
                         <li>
                             <Link to="api">API</Link>
                         </li>
                         <li>
                             <Link to="download">下载</Link>
                         </li>
                         <li>
                             <Link to="about">关于</Link>
                         </li>
                         <li>
                             <Link to="start">
                                <i className="icon icon-git"></i>github
                            </Link>
                         </li>
                     </ul>
                 </div>        
            </div>
		)
	}
})