import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1 className="content-title">安装</h1>
				<h2>兼容性</h2>
				<p>cad render不支持IE8及其以下版本，因为cad render使用了ie8不支持的svg。</p>
				<h2>版本</h2>
				<button className="btn btn-primary">压缩版本</button><span className="text-muted" style={{marginLeft:5}}>(16kb min+gzip)</span>
				<h2>引入方式</h2>
				<h3>使用script标签引入</h3>
				<p>cad render的dom操作使用了jquery，故先引入<code>jQuery</code>或<code>Zepto</code>，再引入cad.js</p>
				<pre>
					{'<script src="./jquery.js"></script>\n<script src="./cad.js"></script>'}
				</pre>
			</div>
		)
	}
})