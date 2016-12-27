import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>介绍</h1>
				<h2>关于cad render</h2>
				<p>
					cad render是一个svg绘图图，它参考了cad中的图层概念和一些绘图技巧。
					<br/>除了支持普通的图形
					如 线、矩形、圆、椭圆、折线、多边形、路径外，还内置了扇形、心形、正多边形等常用图形。
					<br/>并且可以方便地自定义可重复使用的图形。
					<br/>内置了模糊、阴影滤镜，
					<br/>提供颜色处理、数学，插值，采样函数。
					<br/>jquery式的链式操作和动画。
					<br/>强大的path模块和point模块
				</p>
			</div>
		)
	}
})