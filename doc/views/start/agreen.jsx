import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>约定</h1>
				<h2>坐标系</h2>
				<p>和网页的坐标系相同，画布左上角是坐标轴原点，水平向右方向是X轴正向，垂直向下方向是Y轴正向。</p>
				<p>一个点相对于原点的位置叫<code>绝对坐标</code></p>
				<p>一个点相对于参考点的位置叫<code>相对坐标</code></p>
				<div ref="axis" style={{height:300}}></div>
				<h2>角度</h2>
				<p>以X轴为起始边，顺时针旋转为正向角度，逆时针旋转为负向角度。所有角度单位都是<code>°(度)</code>。</p>
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
		paper.circle(5,5,3);
		paper.addShape("markLine",5,5,200,5).fill("#fff").stroke("#fff");
		paper.addShape("markLine",5,5,5,200).fill("#fff").stroke("#fff");
		paper.text(210,5,"x").attr("font-size",20);
		paper.text(12,190,"y").attr("font-size",20);
		paper.text(30,150,"绝对坐标").attr("font-size",20);

		paper.circle(150,150,3).fill("#fff");
		paper.addShape("markLine",150,150,230,150).fill("#fff").stroke("#fff");
		paper.addShape("markLine",150,150,150,200).fill("#fff").stroke("#fff");
		paper.text(210,5,"x").attr("font-size",20);
		paper.text(12,190,"y").attr("font-size",20);
		paper.text(30,150,"绝对坐标").attr("font-size",20);
		paper.line(150,150,230,200).dash(5);
		paper.circle(227,198,3);
		paper.text(230,150,"dx");
		paper.text(150,200,"dy");
		paper.text(240,200,"相对坐标");
		//画角度
		var angle = this.refs.angle;
		var paper = new cad.Paper({el:angle});
		paper.configLayer({
			stroke:"#fff",
			fill:"#fff"
		});
		paper.importDefs("triangle",{fill:"#fff"});
		var cx = paper.width()*0.2,cy = paper.height()/2;
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		paper.line(cx-100,cy,cx+100,cy);
		paper.line(cx,cy+100,cx,cy-100);
		paper.addShape("markLine",cx,cy,cx+100,cy+100);
		paper.addShape("markLine",cx,cy,cx+100,cy-100);
		paper.arc(cx,cy,45,0,38).fill("none").attr("marker-end","url(#triangle)");
		var pwise = cad.Point(cx,cy).angleMoveTo(22.5,50);
		var punwise = cad.Point(cx,cy).angleMoveTo(-25.5,42);
		paper.text(pwise.x,pwise.y,"45°");
		paper.text(punwise.x,punwise.y,"-45°");
		paper.text(cx+80,cy+30,"顺时针");
		paper.text(cx+80,cy-30,"逆时针");
		paper.arc(cx,cy,33,0,-38).fill("none").attr("marker-end","url(#triangle)");
	}
})