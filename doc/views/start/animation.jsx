import React from 'react'
import Paper from '../../components/paper'

module.exports = React.createClass({
	render(){
		return (
        <div className="content">
            <h1>动画</h1>
            <h2>svg动画</h2>
            <p>svg本身支持动画，详细见&nbsp;
                <a  target="_blank"
                    href="http://www.zhangxinxu.com/wordpress/2014/08/so-powerful-svg-smil-animation/"
                >超级强大的SVG SMIL animation动画详解</a></p>
            <h2>js动画</h2>
            <p>
                虽然有了svg动画，但是灵活性不足，故提供了jquery风格的过渡动画。
                <code>$(el).transition(attrs,during,ease,callback)</code>
            </p>
            <Paper height="300" onInit={this.init}></Paper>
            <h3>支持的动画属性</h3>
            <p>所有数字类型的属性，颜色属性fill,stroke,transform属性,未来考虑支持path的d属性</p>
            <h3>缓动函数</h3>
        </div>
		)
	},
    init(paper){
        paper.rect(0,0,"100%","100%").fill("#000");
        var circle = paper.circle(30,50,20).fill("blue");
        var elems = circle.arrayCopy(5,function(i){
            $(this).attr("cy",50+50*i);
        })
        var btn = paper.addBlock("button",300,35,'textmddin').arrayCopy(5,function(i){
            var ease = ['linear','easeInOut','elastic','bounceOut','elasticOut']
            $(this).find("text").text(ease[i]);
            $(this).translate(0,50*i);
            $(this).on("click",function(){
                elems.eq(i).transition({transform:'translate(200,0)'},400,ease[i]);
            })
        })
    }
})