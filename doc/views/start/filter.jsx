import React from 'react'
import Paper from '../../components/paper'

module.exports = React.createClass({
	render(){
		return (
    		<div className="content">
                <h1>滤镜</h1>
	            <p>svg的滤镜比较复杂，目前仅封装了一些常用的如阴影、模糊、灰度滤镜</p>
	            <p>延伸阅读&nbsp;<a href="http://www.w3cplus.com/svg/why-the-svg-filter-is-awesome.html">svg滤镜艺术</a></p>
	            <pre>
	            	{
`
  paper.importDefs("blur",10);
  paper.importDefs("gray");
  paper.importDefs("shadow",{offsetX:0,offsetY:0});
  paper.rect(0,0,"100%","100%").fill("#000");
  paper.image(50,150,100,100,'https://www.baidu.com/img/bd_logo1.png').attr("filter","url(#gray)");
  paper.circle(150,250,50).fill("red").attr("filter","url(#shadow)");
`}</pre>
	            <Paper onInit={this.onInit} height="300" />
           </div>
		)
	},
	onInit(paper) {
		paper.importDefs("blur",10);
		paper.importDefs("gray");
		paper.importDefs("shadow",{offsetX:0,offsetY:0});
		paper.rect(0,0,"100%","100%").fill("#000");
		paper.circle(100,100,50).fill("red").attr("filter","url(#blur)");
		paper.image(50,150,100,100,'https://www.baidu.com/img/bd_logo1.png').attr("filter","url(#gray)");
		paper.circle(150,250,50).fill("red").attr("filter","url(#shadow)");

	}
})