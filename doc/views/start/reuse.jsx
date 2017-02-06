import React from 'react'
import Paper from '../../components/paper'

module.exports = React.createClass({
	render(){
		return (
            <div className="content">
                <h1>复用</h1>
                <p>提供三种复用方式</p>
                <ul className="dot-list">
                    <li><code>shape</code>纯粹的形状，本质是一个path路径，不具有填充、描边等属性</li>
                    <li><code>block</code>,块，由多个基本图元组成的图块，通常用于固定大小的图形</li>
                    <li><code>symbol</code>，和block类似，但是大小可自适应</li>
                </ul>
                <h2>shape</h2>
                <p>使用<code>defineShape</code>自定义形状，将定义好的形状绘制到画布上时用<code>addShape</code></p>
                <p>通常shape定义和绘制时都要指明参考点坐标和其他需要的参数</p>
                <Paper onInit={this.drawShape} height="300" />
                <h2>block</h2>
                <Paper onInit={this.drawBlock} height="300" />
                <h2>symbol</h2>
                <Paper onInit={this.drawSymbol} height="300" />
            </div> 
		)
	},
    drawShape(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        paper.configLayer({stroke:"#fff"});
        cad.defineShape("cross",function(cx,cy,length){
            var path = new cad.Path();
            path.M(cx,cy);
            path.m(0,-1*length/2);
            path.lineTo(0,length);
            path.m(-1*length/2,-1*length/2);
            path.lineTo(length,0);
            return path;
        });
        paper.addShape("cross",100,100,50);
        paper.on("click",function(event){
            var point = paper.mouse(event);
            var length = 30 + Math.random()*50;
            paper.addShape("cross",point.x,point.y,length);
        })
        paper.text(150,150,'点击插入十字').fill("#fff");
    },
    drawBlock(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        paper.configLayer({stroke:"#fff"});
        cad.defineBlock("shape",function(){
            var paper = this;
            paper.line(0,0,100,100).stroke("red");
            paper.circle(100,100,50).fill("blue");
        });
        paper.importBlock("shape");
        paper.use("shape",100,100);
        paper.use("shape",0,0);
    },
    drawSymbol(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        paper.configLayer({stroke:"#fff"});
        cad.defineSymbol("symbol",function(){
            var paper = this;
            paper.circle(100,100,100).fill("red");
            paper.currentLayer.attr("viewBox","0 0 200 200")
        });
        paper.importSymbol("symbol");
        paper.use("symbol",100,100,200,200);
        paper.use("symbol",0,0,50,50);
    }
})