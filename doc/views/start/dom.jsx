import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>DOM API</h1>
				<p>cad render采用了jquery来操作svg dom，并针对svg的特性扩展了一些常用的操作</p>
				<p>jquery的dom API和事件体系在这里可以继续使用</p>
				<h2>选择元素</h2>
				<p>选择当前画布内的元素<code>paper.select("selector")</code></p>
				<pre>{
`<script>
  //选中画布中的三个圆并填充蓝色
  paper.circle(80,80,70);
  paper.circle(250,100,70);
  paper.circle(150,220,70);
  paper.select('circle').fill("blue");
</script>
`
					}
				</pre>
				<div ref="select" style={{height:300}}></div>

				<h2>属性</h2>
				<p>设置或获取属性<code>$elem.attr</code></p>
				<p>注意：对于xlink:href属性，需要指定xlink命名空间，jquery目前尚不支持，需要自己用原生的
					<code>setAttributeNS</code>
				</p>
				<pre>{
`<script>
  //设置矩形的填充为red，描边为blue，描边宽度为5
  paper.rect(20,20,200,200)
       .attr("fill","red")
       .attr("stroke","blue")
       .attr("stroke-width",5);
</script>
`
					}
				</pre>
				<div ref="attr" style={{height:300}}></div>

				<h2>事件</h2>
				<p>采用了jquery的事件体系<code>$elem.on(event,callback)</code></p>
				<p>全局的画布事件用<code>paper.on(event,callback)</code>，绑定在svg根元素上</p>
				<p>如果需要获取相对于画布左上角的坐标，可以用<code>paper.mouse(event)</code>，移动端用<code>paper.touches(event)</code></p>
				<p>注意：设置有填充的元素才能在填充区域捕获事件</p>
				<pre>{
`<script>
//点击矩形时获取指针相对于画布的坐标
var rect = paper.rect(20,20,100,100).fill("blue");
paper.text(40,60,'click here').fill("#fff").css("pointer-events","none")
var $x = paper.text(200,50,'x').fill("red").css("font-size","50px")
var $y = paper.text(200,100,'y').fill("red").css("font-size","50px")
rect.on("click",function(event){
	var point = paper.mouse(event);
	$x.text('x:' + point.x);
	$y.text('y:' + point.y);
})
</script>
`
					}
				</pre>
				<div ref="event" style={{height:300}}></div>
				<p>关于描边的详细介绍见  <a href="http://www.w3cplus.com/svg/svg-fill-stroke.html">svg基础--填充和描边</a></p>
				<h2>描边和填充</h2>
				<pre>{
`<script>
//点击矩形时获取指针相对于画布的坐标
var rect = paper.rect(20,20,100,100).fill("blue");
paper.text(40,60,'click here').fill("#fff").css("pointer-events","none")
var $x = paper.text(200,50,'x').fill("red").css("font-size","50px")
var $y = paper.text(200,100,'y').fill("red").css("font-size","50px")
rect.on("click",function(event){
	var point = paper.mouse(event);
	$x.text('x:' + point.x);
	$y.text('y:' + point.y);
})
</script>
`
					}
				</pre>
				<div ref="fill" style={{height:300}}></div>
			</div>
		)
	},
	componentDidMount(){
		this.select();
		this.attr();
		this.event();
	},
	select(){
		var el = this.refs.select;
		var paper = cad.init({el:el});
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		paper.circle(80,80,70);
		paper.circle(250,100,70);
		paper.circle(150,220,70);
		paper.select('circle').fill("blue");
	},
	attr(){
		var el = this.refs.attr;
		var paper = cad.init({el:el});
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		paper.rect(20,20,200,200).attr("fill","red").attr("stroke","blue").attr("stroke-width",5);
	},
	event(){
		var el = this.refs.event;
		var paper = cad.init({el:el});
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		var rect = paper.rect(20,20,100,100).fill("blue");
		paper.text(40,60,'click here').fill("#fff").css("pointer-events","none")
		var $x = paper.text(200,50,'x').fill("red").css("font-size","50px")
		var $y = paper.text(200,100,'y').fill("red").css("font-size","50px")
		rect.on("click",function(event){
			var point = paper.mouse(event);
			$x.text('x:' + point.x);
			$y.text('y:' + point.y);
		})
	}
})