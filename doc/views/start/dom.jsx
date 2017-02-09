import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>图形操作</h1>
				<p>cad render采用了jquery(或zepto)来操作dom和事件，并针对svg的特性扩展了一些常用的操作</p>
				<p>绝大部分jquery(或zepto)的DOM API如remove()、attr()、css()、text()、hide()、wrap()、after()、append()等都可以继续使用，但是html(),append()这类解析和生成元素的操作不支持</p>
				<p>依然是你熟悉的链式操作</p>
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



				<h2>描边和填充</h2>
				<p>关于描边和填充的详细介绍见  <a target="_blank" href="http://www.w3cplus.com/svg/svg-fill-stroke.html">svg基础--填充和描边</a></p>
				<p>除了用<code>attr</code>的方式设置描边和填充，这里还提供了快捷的<code>fill</code>和<code>stroke</code></p>
				<pre>{
`<script>

</script>
`
					}
				</pre>
				<div ref="fill" style={{height:300}}></div>


				<h2>transform变换</h2>
				<p>图形变换包括平移<code>translate</code>、旋转<code>rotate</code>、斜切<code>skew</code>、缩放<code>scale</code></p>、 矩阵<code>matrix</code>
				<p>cad render提供了几个快捷的变换接口<code>translate</code>,<code>scale</code>,<code>rotate</code>,<code>mirror</code></p>
				<p>延伸阅读：<a target="_blank" href="http://www.w3cplus.com/html5/svg-transformations.html">理解SVG坐标系统和变换</a> 、<a href="http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/">理解transform中的矩阵(matrix)</a></p>
				<div>注意：</div>
				<ul className="dot-list">
					<li>变换是按在属性出现的顺序来的，换个顺序变换的结果可能不一样了</li>
					<li>IE中指定旋转中心旋转时，常出问题，可围绕原点旋转，再平移到旋转中心</li>
				</ul>
				<pre>{
`<script>
  //绕原点旋转30度
  paper.rect(50,20,100,50);
  paper.rect(50,20,100,50).attr("transform","rotate(30,50,20)").dash(5);
  //平移(25,25)
  paper.rect(180,20,100,50);
  paper.rect(180,20,100,50).attr("transform","translate(25,25)").dash(5);
  //X方向斜切10度
  paper.rect(180,200,100,50);
  paper.rect(180,200,100,50).attr("transform","skewX(10)").dash(5);
  //缩放0.5倍
  paper.rect(0,0,100,50).attr("transform","translate(20,200)");
  paper.rect(0,0,100,50).attr("transform","translate(20,200)scale(0.5)").dash(5);
  //直角三角形镜像
  paper.path('M150,100 L150,150 h-50 z').mirror(160,100,160,150);
</script>
`
					}
				</pre>
				<div ref="transform" style={{height:300}}></div>


				<h2>阵列拷贝</h2>
				<p>阵列，是指批量复制图形。可以根据拷贝的数量，在回调函数中可以根据索引改变当前拷贝的属性，如位置、颜色、旋转等</p>
				<pre>{
`<script>
  //一维矩形阵列，横向拷贝5个矩形，间距40
  paper.rect(5,5,30,30).arrayCopy(5,function(index){
  	$(this).translate(40*index,0);
  });
  //一维矩形阵列，纵向拷贝5个矩形，间距40
  paper.circle(20,80,15).arrayCopy(5,function(index){
  	$(this).translate(0,40*index)
  })
  //二维矩形阵列，正六边形，带颜色变化
  var count = 0;
  paper.addShape("regularPolygon",60,80,{size:15,num:6}).arrayCopy(4,4,function(x,y){
  	var color = cad.hsl(count/16*360,1,0.5);
  	$(this).translate(x*30,y*30+15*(x%2)).fill(color)
  	count++;
  });
  //一维旋转阵列，在360度的空间里，等角度绘制12条线
  paper.line(230,150,230,100).arrayCopy(12,function(index){
  	$(this).rotate(360/12*index,230,150);
  })
</script>
`
					}
				</pre>
				<div ref="array" style={{height:300}}></div>
			</div>
		)
	},
	componentDidMount(){
		this.select();
		this.attr();
		this.event();
		this.fill();
		this.transform();
		this.array();
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
		});
	},
	fill(){
		var el = this.refs.fill;
		var paper = cad.init({el:el});
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		paper.circle(150,150,120).fill("blue").stroke("red").attr("stroke-width",10);
	},
	transform(){
		var el = this.refs.transform;
		var paper = cad.init({el:el});
		paper.configLayer({
			"fill":'none',
			stroke:"#fff"
		})
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		paper.rect(50,20,100,50);
		paper.rect(50,20,100,50).attr("transform","rotate(30,50,20)").dash(5);
		paper.rect(180,20,100,50);
		paper.rect(180,20,100,50).attr("transform","translate(25,25)").dash(5);
		paper.rect(180,200,100,50);
		paper.rect(180,200,100,50).attr("transform","skewX(10)").dash(5);
		paper.rect(0,0,100,50).attr("transform","translate(20,200)");
		paper.rect(0,0,100,50).attr("transform","translate(20,200)scale(0.5)").dash(5);
        paper.path('M150,100 L150,150 h-50 z').mirror(160,100,160,150);
        paper.line(160,100,160,160).dash(5);
		paper.text(80,120,'旋转').fill("#fff");
		paper.text(240,120,'平移').fill("#fff");
		paper.text(240,270,'斜切').fill("#fff");
		paper.text(80,270,'缩放').fill("#fff");
		paper.text(150,170,'镜像').fill("#fff");
	},
	array(){
		var el = this.refs.array;
		var paper = cad.init({el:el});
		paper.configLayer({
			"fill":'none',
			stroke:"#fff"
		})
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		paper.rect(5,5,30,30).arrayCopy(5,function(index){
			$(this).translate(40*index,0);
		});
		paper.circle(20,80,15).arrayCopy(5,function(index){
			$(this).translate(0,40*index)
		})
		var count = 0;
		paper.addShape("regularPolygon",60,80,{size:15,num:6}).arrayCopy(4,4,function(x,y){
			var color = cad.hsl(count/16*360,1,0.5);
			$(this).translate(x*30,y*30+15*(x%2)).fill(color)
			count++;
		});
		paper.line(230,150,230,100).arrayCopy(12,function(index){
			$(this).rotate(360/12*index,230,150);
		})
		paper.text(210,20,'一维横向阵列').fill("#fff")
		paper.text(23,280,'一维纵向阵列').fill("#fff")
		paper.text(70,220,'二维阵列').fill("#fff")
		paper.text(210,230,'旋转阵列').fill("#fff")
	}
})