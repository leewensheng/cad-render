import React from 'react'

module.exports = React.createClass({
    render(){
        return (
            <div className="content">
                <h1 className="content-title">基本图形</h1>
                <h2>直线</h2>
                <p>绘制一条直线的方法有两种</p>
                <ul className="dot-list">
                    <li>两点决定一条直线</li>
                    <li>以一个点为起始点，向一定的方向延伸一定长度到达另一点</li>
                </ul>
                <pre>
{
`<script>
//过(50,150),(300,150)画线
paper.line(50,150,300,150);
//过(50,150)，画一个角度为-45°，长度为150的直线
paper.angleLine(50,150,-45,150)
</script>`
}               </pre>
                <div ref="line" style={{height:200}}></div>
                <h2>矩形</h2>
                <p>绘制矩形的方法有两种</p>
                <ul className="dot-list">
                    <li>由矩形的左上角顶点坐标和矩形的宽度，长度确定</li>
                    <li>由矩形的任一对角线的两端点坐标确定</li>
                </ul>
                <pre>
{
`<script>
//顶点坐标、宽度、长度绘制的矩形
paper.rect(20,20,100,100);
//由对角线确定的矩形
paper.diagonalRect(220,20,320,120)
</script>`
}               </pre>
                <div ref="rect" style={{height:200}}></div>



                <h2>圆形</h2>
                <p>圆形由圆心坐标和半径确定</p>
                <pre>
{
`<script>
//圆心(130,130),半径80
paper.circle(130,130,80);
</script>`
}               </pre>
                <div ref="circle" style={{height:200}}></div>

                <h2>椭圆</h2>
                <p>椭圆有两种画法</p>
                <ul className="dot-list">
                    <li>椭圆中心坐标和水平轴、垂直轴的半径</li>
                    <li>椭圆的外接矩形的对角线两端点坐标</li>
                </ul>
                <pre>
{
`<script>
//中心点和两轴半径确定的圆
paper.ellipse(130,130,80,40);
//外接矩形确定的椭圆
paper.diagonalellipse(30,30,230,320);
</script>`
}               </pre>
                <div ref="ellipse" style={{height:200}}></div>


                <h2>多边形</h2>
                <p>多边形由至少3个不在同一直线上的点确定</p>
                <pre>
{
`<script>
    //经过点(100,100),(150,150),(170,80)的多边形
    var points = [];
    points.push({x:100,y:100});
    points.push({x:150,y:150});
    points.push({x:170,y:80});
    paper.polygon(points);
</script>`
}               </pre>
                <div ref="polygon" style={{height:200}}></div>



                <h2>折线</h2>
                <p>由直线经过一系列点连起来的折线</p>
                <pre>
{
`<script>
    var points = [];
    points.push({x:30,y:40});
    points.push({x:50,y:150});
    points.push({x:130,y:130});
    points.push({x:180,y:150});
    paper.polyline(points);
</script>`
}               </pre>
                <div ref="polyline" style={{height:200}}></div> 


                <h2>路径</h2>
                <p>路径(path)是svg中最强大最灵活的元素，各种复杂的图形都是由path绘制的。
                    <br/>路径相当于一支画笔，时而放下，时而拿起，可以用弧线、直线、曲线，
                    组合起来就形成了各种复杂的图形.
                </p>
                <p>cad render有专门的<code>path</code>模块用来生成你想要的路径</p>
                <p>路径的指令详细见链接 <a href="">svg中的path</a> </p>
                <pre>
{
`<script>
    /**绘制一条路径
    1.移动到点(0,0)
    2.绘制直线到(100,100)
    3.垂直线到 y = 50的地方
    4.水平线到 x = 200 的地方
    5.绘制顺时针圆弧到相对点50,50，半径是30
    */
    paper.path("M 0,0 L 100,100 V50 H200 a30 30 1 0 1 50 50")
</script>`
}               </pre>
                <div ref="path" style={{height:200}}></div> 


                 <h2>文本</h2>
                <p>文本位置由一个参考点和对齐方式确定（左，中，右），cad render同时提供了垂直方向的对齐方式</p>
                <pre>
{
`<script>
    paper.path("M 0,0 L 100,100 V50 H200 a30 30 1 0 1 50 50")
</script>`
}               </pre>
                <div ref="text" style={{height:200}}></div>     


                 <h2>图片</h2>
                <p>图片引入需要指定引入的左顶点坐标，和插入的宽度、高度，以及图片的地址.
                <br/>图片会自动适应区域保持宽度比</p>
                <pre>
{
`<script>
    paper.image(10,10,270,129.5,"https://www.baidu.com/img/bd_logo1.png");
</script>`
}               </pre>
                <div ref="image" style={{height:200}}></div> 


                <h2>内置图形</h2>
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
                <div ref="shape" style={{height:500}}></div>                
            </div>
        )
    },
    componentDidMount(){
        this.setState({})
        this.line();
        this.rect();
        this.circle();
        this.ellipse();
        this.polygon();
        this.polyline();
        this.path();
        this.text();
        this.image();
        this.shape();
    },
    line(){
        var el = this.refs.line;
        var paper = new cad.Paper({el:el});
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        paper.configLayer({
            fill:"#fff",
            stroke:"#fff"
        });
        var cx = 50,cy=150;
        paper.line(cx,cy,300,cy);
        paper.angleLine(cx,cy,-45,150);
        paper.circle(cx,cy,4);
        paper.circle(300,cy,4);
        paper.arc(cx,cy,40,0,-45).fill("none");
        paper.text(cx+50,cy-23,'45°');
        paper.text(cx+100,cy+20,'两点画线');
        paper.text(60,80,'角度线')
    },
    rect(){
        var el = this.refs.rect;
        var paper = new cad.Paper({el:el});
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        paper.configLayer({
            fill:"#fff",
            stroke:"#fff"
        });
        paper.rect(20,20,100,100).fill("none");
        paper.diagonalRect(220,20,320,120).fill("none");
        paper.text(20,140,"顶点、宽度、长度");
        paper.text(240,140,"对角线两点");
        paper.text(70,30,"width",{align:'middle'});
        paper.text(40,70,"height",{align:'middle'});
        paper.circle(20,20,3);
        paper.circle(220,20,3);
        paper.circle(320,120,3);
        paper.line(220,20,320,120).dash(5);
    },
    circle(){
        var el = this.refs.circle;
        var paper = new cad.Paper({el:el});
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        paper.circle(100,100,80).stroke("#fff");
        paper.circle(100,100,3).fill("#fff");
    },
    ellipse(){
        var el = this.refs.ellipse;
        var paper = new cad.Paper({el:el});
        paper.configLayer({
        stroke:"#fff"
        })
        var cx = 120,cy = 100,r1= 100,r2= 50;
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        paper.ellipse(cx,cy,r1,r2).stroke("#fff"); 
        paper.circle(cx,cy,4).fill("#fff"); 
        paper.line(cx-r1,cy,cx+r1,cy).dash(5);
        paper.line(cx,cy-r2,cx,cy+r2).dash(5);

        paper.diagonalEllipse(270,50,470,150).stroke("#fff");
        paper.diagonalRect(270,50,470,150).dash(4).stroke("#fff");
        paper.circle(270,50,4).fill("#fff");
        paper.circle(470,150,4).fill("#fff");
        paper.line(270,50,470,150).dash(5).stroke("#fff");
    },
    polygon(){
        var el = this.refs.polygon;
        var paper = new cad.Paper({el:el});
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        var points = [];
        points.push({x:100,y:100});
        points.push({x:150,y:150});
        points.push({x:170,y:80});
        paper.polygon(points).stroke("#fff");
        paper.text(30,90,'(100,100)').fill("lightblue");
        paper.text(120,160,'(150,150)').fill("lightblue");
        paper.text(170,60,'(170,80)').fill("lightblue");
    },
    polyline(){
        var el = this.refs.polyline;
        var paper = new cad.Paper({el:el});
        paper.configLayer({
        stroke:"#fff"
        })
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        var points = [];
        points.push({x:30,y:40});
        points.push({x:50,y:150});
        points.push({x:130,y:130});
        points.push({x:180,y:150});
        paper.polyline(points);
        points.map(function(p,n){
            paper.text(p.x,p.y-20,'p'+n).fill("#fff")
        })
    },
    path(){
        var el = this.refs.path;
        var paper = new cad.Paper({el:el});
        paper.configLayer({
        stroke:"#fff"
        })
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        paper.path("M 0,0 L 100,100 V50 H200 a30 30 1 0 1 50 50")
    },
    text(){
        var el = this.refs.text;
        var paper = new cad.Paper({el:el});
        paper.configLayer({fill:"#fff"})
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        paper.line(0,100,300,100).stroke("#fff");
        paper.line(100,0,100,200).stroke("#fff");
        paper.text(100,100,'A',{
            fontSize:80,
            align:"middle"
        });
         paper.text(100,100,'A',{
            fontSize:80,
            align:"left"
        }).fill("red");
        paper.text(100,100,'A',{
            fontSize:80,
            align:"right"
        }).fill("green");
    },
    image(){
        var el = this.refs.image;
        var paper = new cad.Paper({el:el});
        paper.rect(0,0,paper.width(),paper.height()).fill("#000");
        paper.image(10,10,270,129.5,"https://www.baidu.com/img/bd_logo1.png");
    },
    shape(){
        var el = this.refs.shape;
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