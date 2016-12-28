import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div>
				<h1>约定</h1>
				<h2>坐标系</h2>
				<p>和网页的坐标系相同，画布左上角是坐标轴原点，水平向右方向是X轴正向，垂直向下方向是Y轴正向。</p>
				<div ref="axis" style={{height:300}}></div>
				<h2>角度</h2>
				<p>以与X轴同方向为起始边，顺时针旋转为正角度，逆时针旋转为负角度</p>
				<div ref="angle" style={{height:300}}></div>
			</div>
		)
	},
	componentDidMount(){
		//坐标系绘图
		var el = this.refs.axis;
		var paper = new cad.Paper({el:el});
		paper.configLayer({
			stroke:"#fff",
			fill:"#fff"
		})
		paper.rect(0,0,paper.width(),paper.height()).fill("black");
		paper.addShape("markLine",5,5,200,5).fill("#fff").stroke("#fff");
		paper.addShape("markLine",5,5,5,200).fill("#fff").stroke("#fff");
		paper.text(210,5,"x").attr("font-size",20);
		paper.text(12,190,"y").attr("font-size",20);
		paper.text(paper.width()/2,paper.height()/2,"绘图坐标系",{align:"middle"}).attr("font-size",40);
		//画角度
		var angle = this.refs.angle;
		var paper = new cad.Paper({el:angle});
		paper.configLayer({
			stroke:"#fff",
			fill:"#fff"
		});
		var cx = paper.width()/2,cy = paper.height()/2;
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		paper.line(cx-100,cy,cx+100,cy);
		paper.line(cx,cy+100,cx,cy-100);
		paper.addShape("markLine",cx,cy,cx+100,cy+100);
		paper.addShape("markLine",cx,cy,cx+100,cy-100);
		paper.arc(cx,cy,45,0,45).fill("none");
		paper.arc(cx,cy,33,0,-45).fill("none");
	}
})