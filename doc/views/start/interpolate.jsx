import React from 'react'
import Paper from '../../components/paper'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>插值、采样</h1>
                <h2>插值函数</h2>
                <p>插值是指在两个值之间插，这个值可以是number Array object color tranform,通常有直线插补、二次插补、三次插补、正弦插补等。各种动画函数就是插补函数</p>
                <p>插补函数输入的参数在[0,1]之间</p>
                <p>cad render提供了简单的方式生成插补函数的接口</p>
                <pre>
{`
  //在两个颜色之间直线插补
  var ease = cad.interpolate("red","blue");
  paper.rect(0,0,20,20).arrayCopy(15,15,function(x,y){
      $(this).fill(ease(y/15)).translate(x*20,y*20)
  })
`}
                </pre>
                <Paper onInit={this.interpolate} height="300"></Paper>
                <h2>采样</h2>
                <p>采样是指获取函数中一系离散点的值，通常用来生成函数的曲线</p>
                <Paper onInit={this.sample} height="300"></Paper>
			</div>
		)
	},
    interpolate(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        var ease = cad.interpolate("red","blue");
        paper.rect(0,0,20,20).arrayCopy(15,15,function(x,y){
            $(this).fill(ease(y/15)).translate(x*20,y*20)
        })
    },
    sample(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        var sampleFunc = Math.sin;
        var points = cad.rangeSample(sampleFunc,0,100);
    }
})