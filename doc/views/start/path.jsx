import React from 'react'
import Paper from '../../components/paper'
module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>路径</h1>
				<h2>标准指令</h2>
				<p>注：大写为绝对坐标，小写为相对坐标</p>
				<p>曲线部分参见 <a href="http://www.zhangxinxu.com/wordpress/2014/06/deep-understand-svg-path-bezier-curves-command/">深度掌握SVG路径path的贝塞尔曲线指令</a></p>
				<table className="table table-default">
					<thead>
						<tr>
							<td>指令</td>
							<td>别名</td>
							<td>参数</td>
							<td>说明</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>M<br/>m</td>
							<td>MoveTo<br/>moveTo</td>
							<td>x,y</td>
							<td>移动坐标</td>
						</tr>
						<tr>
							<td>L<br/>l</td>
							<td>LineTo<br/>lineTo</td>
							<td>x,y</td>
							<td>直线</td>
						</tr>
						<tr>
							<td>V<br/>v</td>
							<td>VerticalLineTo<br/>verticalLineTo</td>
							<td>y</td>
							<td>垂直线</td>
						</tr>
						<tr>
							<td>H<br/>h</td>
							<td>HorizontalLineTo<br/>horizontalLineTo</td>
							<td>x</td>
							<td>水平线</td>
						</tr>
						<tr>
							<td>A<br/>a</td>
							<td>ArcTo<br/>arcTo</td>
							<td>rx,ry,rotateX,countLargeArc,countClockwise,endX,endY</td>
							<td>弧线</td>
						</tr>
						<tr>
							<td>C<br/>c</td>
							<td>CurveTo<br/>curveTo</td>
							<td>x1,y1,x2,y2,endx,endy</td>
							<td>三次贝塞尔曲线</td>
						</tr>
						<tr>
							<td>S<br/>s</td>
							<td>SmoothCurveTo<br/>smoothCurveTo</td>
							<td>x2,y2,endx,endy</td>
							<td style={{whiteSpace:'nowrap'}}>三次光滑贝塞尔曲线</td>
						</tr>
						<tr>
							<td>Q<br/>q</td>
							<td>QuadraticBelzierCurveTo<br/>quadraticBelzierCurveTo</td>
							<td>x,y,endx,endy</td>
							<td>二次贝塞尔曲线</td>
						</tr>
						<tr>
							<td>T<br/>t</td>
							<td>SmoothQuadraticBezierCurveto<br/>smoothQuadraticBezierCurveto</td>
							<td>endx,endy</td>
							<td>二次光滑贝塞尔曲线</td>
						</tr>
						<tr>
							<td>Z<br/>z</td>
							<td>closePath</td>
							<td>无</td>
							<td>封闭当前路径</td>
						</tr>
					</tbody>
				</table>
				<h2>扩展指令</h2>
				<p><code>points</code>为坐标数组，如<code>{'[{x:1,y:1},{x:2,y:2}]'}</code></p>
				<table className="table table-default">
					<thead>
						<tr>
							<td>指令</td>
							<td>参数</td>
							<td>说明</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>angleMoveTo</td>
							<td>angle,length</td>
							<td>沿某一方向移动一定距离</td>
						</tr>
						<tr>
							<td>angleLineTo</td>
							<td>angle,length</td>
							<td>一定方向和长度的直线</td>
						</tr>						<tr>
							<td>angleArcTo</td>
							<td>angle,cx,cy</td>
							<td>围绕圆心画弧，正角度为顺时针，负角度为逆时针</td>
						</tr>
						<tr>
							<td>LineToAll 、lineToAll</td>
							<td>points</td>
							<td>多段直线</td>
						</tr>
						<tr>
							<td>curveToAll、CurveToAll</td>
							<td>points , flagClosed</td>
							<td>穿过一系列点的光滑三次贝塞尔曲线</td>
						</tr>
					</tbody>				
				</table>
				<h2>用法</h2>
				<p><code>path</code>模块为了方便绘图，减少计算，采用了链式操作，扩展了标准指令</p>
				<pre>
{`  //链式操作
  var path = new cad.Path();
  path.MoveTo(0,0)
      .LineTo(30,30)
      .v(30).h(40)
      .angleLineTo(45,40)
      .angleArcTo(180,150,120,50);
  paper.path(path)
`}
				</pre>
				<Paper height={300} onInit={this.drawPath}/>
			</div>
		)
	},
	drawPath(paper){
	 	var path = new cad.Path();
	 	paper.rect(0,0,"100%","100%").fill("#000");
	 	var width = paper.width();
	 	var height = paper.height();
	  	path.MoveTo(0,0)
	  		.LineTo(30,30)
	  		.v(30).h(40)
	  		.angleLineTo(45,40)
	  		.angleArcTo(180,150,120,50);
	  		paper.circle(150,120,3).fill("#fff")
	  	paper.path(path.toString()).stroke("#fff");
	}
})