import React from 'react'
module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>图层</h1>
				<h2>概念</h2>
				<p> 如果你用过PS的话，应该知道最终图像的效果是由一层一层的图层叠加而成的,
					cad中也有类似的设计。
					使用图层的目的在于将拥有共同特征的元素放在一起，
					通过图层的属性控制所有该图层上的元素属性，
					同时起到归类和分而治之的目的
				</p>
				<p>svg中的图层使用<code>{'<g></g>'}</code>,有点类似于CSS中的类，
					g元素的属性会应用到所有的子元素上。
					cad render参考了ps和cad的做法，将图层操作抽象出来。
					绘制时，永远只处于一个工作图层，所有添加的图形都只会绘制到工作图层上。
					想要绘制到别的图层上，必须先切换到那个图层。
					<br/>
					cad render初始化时就创建了一个默认图层，默认会将图形绘制到那个图层上
				</p>

				<h2>图层管理</h2>
				<p>cad render提供以下操作</p>
				<ul className="dot-list">
					<li>添加图层<code>paper.addLayer(layer)</code></li>
					<li>删除图层<code>paper.removeLayer(layer)</code></li>
					<li>切换图层<code>paper.switchLayer(layer)</code></li>
					<li>临时切换图层<code>paper.temporarySwitchLayer(layer,callback)</code></li>
					<li>清空图层内元素<code>paper.clearLayer(layer)</code></li>
					<li>获取当前图层<code>paper.currentLayer</code></li>
				</ul>
				<pre>
				{
`<script>
 //当前图层(绿色)
  var greenLayer = paper.currentLayer;
  greenLayer.attr("fill",'blue');

  paper.rect(0,0,paper.width(),paper.height()).fill("#000");
  greenLayer.attr("fill","blue");
  paper.circle(50,50,40);
  paper.rect(100,10,100,80);

  //红色图层
  var redLayer = paper.addLayer('red').attr("fill","red");
  paper.switchLayer(redLayer);
  paper.circle(50,150,40);
  paper.rect(100,110,100,80);

  //按钮图层和事件
  paper.addLayer("btn");
  paper.switchLayer("btn");
  paper.addBlock("button",200,50,'点击蓝色图层换成绿色').on("click",function(){
  	 greenLayer.attr("fill",'green');
  })
  paper.addBlock("button",200,150,'点击清空红色图层').on("click",function(){
  	paper.clearLayer(redLayer);
  })
</script>`
				}
				</pre>
				<div ref="layer" style={{height:300}}></div>
			</div>
		)
	},
	componentDidMount(){
		var el = this.refs.layer;
		var paper = cad.init({el:el});
		var greenLayer = paper.currentLayer;
		paper.configLayer(greenLayer,{fill:"blue"});
		paper.rect(0,0,paper.width(),paper.height()).fill("#000");
		greenLayer.attr("fill","blue");
		paper.circle(50,50,40);
		paper.rect(100,10,100,80);
		var redLayer = paper.addLayer('red').attr("fill","red");
		paper.switchLayer(redLayer);
		paper.circle(50,150,40);
		paper.rect(100,110,100,80);
		paper.addLayer("btn");
		paper.switchLayer("btn");
		paper.addBlock("button",220,50,'点击蓝色图层换成绿色').on("click",function(){
			paper.configLayer(greenLayer,{fill:"green"})
		})
		paper.addBlock("button",220,150,'点击清空红色图层').on("click",function(){
			paper.clearLayer(redLayer);
		})
	}
})