import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>点</h1>
                <p>
                    绘图过程中，经常需要计算坐标的位置，<code>point</code>模块提供了强大的点操作
                    <br/>
                </p>
                <div>初始化</div>
                <pre>
{
 `var p = cad.Point(0,0);
`}              </pre>
                <div className="scroll">
                    <table className="table table-default">
                        <thead>
                            <tr>
                                <td>操作</td>
                                <td>参数</td>
                                <td>说明</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>angleMoveTo</td>
                                <td>angle,length</td>
                                <td>沿着某一角度移动一定距离</td>
                            </tr>
                            <tr>
                                <td>getAngleFrom</td>
                                <td>x,y</td>
                                <td>求取从另一点到该点的矢量角度</td>
                            </tr>
                            <tr>
                                <td>getAngleTo</td>
                                <td>x,y</td>
                                <td>从该点到另一点的矢量角度</td>
                            </tr>
                            <tr>
                                <td>getLenTo</td>
                                <td>x,y</td>
                                <td>从该点到另一点的距离</td>
                            </tr>
                            <tr>
                                <td>getMidPointTo</td>
                                <td>x,y</td>
                                <td>到另一点的连线中点</td>
                            </tr>
                            <tr>
                                <td>getVerticalPoint</td>
                                <td>x1,y1,x2,y2</td>
                                <td>从该点到某直线的垂点</td>
                            </tr>
                            <tr>
                                <td>mirror</td>
                                <td>x1,y1,x2,y2</td>
                                <td>从该点到某直线的对称点</td>
                            </tr>
                            <tr>
                                <td>moveBy</td>
                                <td>dx,dy</td>
                                <td>相对移动</td>
                            </tr>
                            <tr>
                                <td>moveTo</td>
                                <td>x,y</td>
                                <td>移动到另一点</td>
                            </tr>
                            <tr>
                                <td>rotate</td>
                                <td>angle,cx,cy</td>
                                <td>绕某点旋转</td>
                            </tr>
                            <tr>
                                <td>scale</td>
                                <td>scale,cx,cy</td>
                                <td>以某点为中心缩放移动</td>
                            </tr>
                            <tr>
                                <td>clone</td>
                                <td>无</td>
                                <td>获取一个拷贝</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
			</div>
		)
	}
})