import React from 'react'

module.exports = React.createClass({
	render(){
		return (
			<div className="content">
				<h1>内置图形</h1>
                <p>内置了一些常用的图形如 正多边形、心形、正弦曲线，带箭头的直线。并且提供了自定义图形的接口方便扩展</p>
                <p>引入内置图形<code>addShape(name,x,y,...)</code>，需要指定图形的名称，插入点坐标，及需要的参数</p>
                <p>例如给出中心点和边数、外接圆半径就可以画出一个正多边形了</p>
                <pre>
{
`<script>
    paper.addShape("regularPolygon",190,100,{num:5,size:33});
    paper.addShape("regularPolygon",260,100,{num:6,size:33});
</script>`
}               </pre>
                <div ref="polygon" style={{height:500}}></div> 
                <h2>更多图形</h2>
			</div>
		)
	},
    componentDidMount(){
        this.polygon();
    },
    polygon(){
        var el = this.refs.polygon;
        var paper = new cad.Paper({el:el});
        paper.configLayer({stroke:"#fff"});
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        //外接圆半径为50的正多边形
        paper.addShape("regularPolygon",60,100,{num:5,size:50});
        paper.addShape("regularPolygon",180,100,{num:6,size:50});
        //心形
        paper.addShape("heart",320,100,50);
        //正弦曲线
        paper.addShape("sinCurve",20,250,{width:200,height:50})
        //扇形、环扇
        paper.addShape("sector",260,250,{startAngle:-45,endAngle:45,radius:100});
        paper.addShape("sector",260,400,{startAngle:-45,endAngle:45,radius:100,innerRadius:50});
        //箭头
        paper.addShape("markLine",20,400,200,400)

        paper.text(280,320,'扇形').fill("#fff");
        paper.text(100,320,'正弦曲线').fill("#fff");
        paper.text(30,160,'正五形边').fill("#fff");
        paper.text(130,160,'正六形边').fill("#fff");
        paper.text(310,160,'心形').fill("#fff");
        paper.text(310,480,'环扇').fill("#fff");
        paper.text(100,420,'箭头').fill("#fff");
    }
})