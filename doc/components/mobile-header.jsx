import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
module.exports = React.createClass({
	getInitialState(){
		return {open:false}
	},
	render(){
		return (
			<div className="mobile-nav">
				<span ref='btnSide' onClick={this.openSide} className="btn btn-primary">
				按钮
				</span>
				<div className={this.state.open?'dropdown open':'dropdown'} style={{float:'right'}}>
					<span className="btn"><i className="iconfont icon-menu" onClick={this.toggleNav}></i></span>
					<ul className='dropdown-menu  nav-list' onClick={this.toggleNav}>
                         <li>
                             <Link activeClassName="active" to="start">教程</Link>
                         </li>
                        <li>
                             <Link  activeClassName="active" to="api">API</Link>
                         </li>
                         <li>
                             <Link activeClassName="active"  to="demo">示例</Link>
                         </li>
             
                         <li>
                             <Link activeClassName="active"  to="download">下载</Link>
                         </li>
                         <li>
                             <Link activeClassName="active" to="about">关于</Link>
                         </li>
                         <li>
                             <a href="https://github.com/leewensheng/cad-render" target="_blank">
                                <svg aria-hidden="true" className="icon-github" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path  fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                                github
                            </a>
                         </li>
                     </ul>
				</div>
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
			this.setState({open: false});
		}
	},
	openSide(){
		$(".doc-nav").toggleClass("open");
	},
	toggleNav(){
		var open = this.state.open;
		this.setState({open:!open});
	}
})
