import React from 'react'
import Paper from '../../components/paper'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
                <h1>颜色</h1>         
                <h2>颜色生成</h2>
                <p>提供快捷的rgb,hsl颜色生成</p>
                <pre>
                    {
`cad.rgb(33,33,33);     //return 'rgb(33,33,33)'
cad.hsl(100,0.5,0.5); //return '#6abf40'
`
                    }
                </pre>
                <h2>颜色处理</h2>
                <p>提供颜色亮暗调整<code>cad.darken(color,0.2)</code><code>cad.brighten(color,0.2)</code></p>
                <pre>
{
`//鼠标hover时变暗50%
paper.circle(100,100,80).fill("#ff33aa").on("mouseover",function(){
    var hoverColor = cad.darken("#ff33aa",0.5);
    $(this).fill(hoverColor);
}).on("mouseout",function(){
    $(this).fill("#ff33aa");
})
`}
                </pre>
                <Paper onInit={this.init} height="300" />
            </div>   
		)
	},
    init(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        paper.circle(100,100,80).fill("#ff33aa").on("mouseover",function(){
            var hoverColor = cad.darken("#ff33aa",0.5);
            $(this).fill(hoverColor);
        }).on("mouseout",function(){
            $(this).fill("#ff33aa");
        })
    }
})