import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
                <h1>颜色</h1>         
                <h2>颜色生成</h2>
                <p>提供快捷的rgb,hsl颜色生成</p>
                <pre>
                    {
`cad.rgb(33,33,33);
cad.hsl(100,0.5,0.5);
`
                    }
                </pre>
                <h2>颜色处理</h2>
                <p>提供颜色亮暗处理</p>
                <pre>
{`var color = new cad.Color("#333");
//变暗20%
color.darken(0.2);
//提亮30%
color.brighten(0.3);
`}
                </pre>
            </div>   
		)
	}
})