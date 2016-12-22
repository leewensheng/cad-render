import React from 'react'
import './index.css'
import SVG1 from '../../components/svg-1.jsx'
import {Link} from 'react-router'
module.exports = React.createClass({
	render(){
		return (
            <div>
                <div className="section-wrap">
                    <div className="section-page">
                        <SVG1 id="svg-1"></SVG1>
                        <div className="section-text">
                            <h1 style={{marginTop:0}}>基于svg的绘图引擎</h1>
                            <h2>全新的绘图理念</h2>
                            <button className="btn btn-primary">立体体验</button>
                            <p className="text-muted">支持ie9,firefox,chrome</p>
                        </div>
                    </div>
                </div>
            </div>
        )
	}
})
