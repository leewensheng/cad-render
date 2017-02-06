import React from 'react'
import Paper from '../../components/paper'

module.exports = React.createClass({
	render(){
		return (
            <div className="content">
			     <h1>渐变和填充</h1>
                 <p>svg除了纯色填充，还有线性渐变、径向渐变、图案填充</p>
                 <h2>线性渐变</h2>
                 <Paper height="300" onInit={this.linearGradient}></Paper>
                 <h2>径向渐变</h2>
                 <Paper height="300" onInit={this.radialGradient}></Paper>
                 <h2>patter填充</h2>
                 <Paper height="300" onInit={this.pattern}></Paper>
            </div>  
		)
	},
    linearGradient(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        paper.rect(0,0,300,300).fill("red");
    },
    radialGradient(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        paper.circle(150,150,100).fill("red");
    },
    pattern(paper){
        paper.importDefs("block",50);
        paper.rect(0,0,"100%","100%").fill("url(#block)");
    }
})