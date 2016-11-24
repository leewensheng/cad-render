import React from 'react'
import ReactDOM from 'react-dom'

var Arrow = React.createClass({
	render(){
		var url  = "http://dx.sc.chinaz.com/Files/DownLoad/sound1/201503/5618.mp3";
		var url2 = "http://xunlei.sc.chinaz.com/Files/DownLoad/sound1/201504/5751.mp3";
		return <div>
		<audio ref="mp3" preload src={url}></audio>
		<audio ref="mp2" preload src={url2}>
		</audio>
		</div>;
	},
	componentDidMount(){
		var mp3 = this.refs.mp3;
		var mp2 = this.refs.mp2;
		var el = ReactDOM.findDOMNode(this);
        var width = window.innerWidth;
        var height = window.innerHeight;
        var paper = cad.init({
                el:el,
                width:"100%",
                height:window.innerHeight
        });
        paper.configLayer({
        	stroke:"#fff",
        	fill:"none"
        })
        paper.importDefs("linearGradient",{
    		x1:'0%',
    		y1:"0%",
    		x2:"100%",
    		y2:"100%",
        	stops:[{
        		offset:"0%",
        		color:"red"
        	},{
        		offset:"100%",
        		color:"#fff"
        	}]
        })
        paper.importDefs('gray');
        var width = paper.width();
        var height = paper.height();
        var c = paper.getCenterPoint();
        var cx = c.x,cy = c.y+50;
        var url = "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1479912943&di=8606a07092618bdfeb7661ed447da4a0&src=http://f1.diyitui.com/b9/bb/f6/99/84/1a/a8/9b/27/14/60/4c/99/43/90/59.jpg";
        var image = paper.image(cx-50,10,100,100,url);
        /*paper.addShape("heart",cx,cy-200,{
        	size:50
        }).attr("fill","url(#linearGradient)");;
        paper.addShape("heart",cx,cy-220,{
        	size:50
        }).attr("fill","url(#linearGradient)");*/
        var arrow = paper.addShape("markLine",cx,cy,cx,cy-150).fill("#fff")
        var len = 250;
        var Point = cad.Point;
        var p1 ,p2,p3,p4;
        p1 = Point(cx-len/2,cy);
        p2 = Point(cx,cy-50);
        p3 = Point(cx+len/2,cy);
        p4 = Point(cx,cy);
        paper.spline([p1,p2,p3]);
        var bow = paper.spline([p1,p4,p3]);
        paper.on("touchstart mousedown",dragstart);
        paper.on("touchmove mousemove",dragmove);
        paper.on("touchend mouseup",dragend);
        var startX , startY ,endX ,endY ,dx,dy,status;
        var hasArrow = true;;
        startX = startY = endX = endY = status = 0;
        var arrows = [arrow]
        function dragstart(e){
  			if(arrows.length==0) {
  				var new_arrow = paper.addShape("markLine",cx,cy,cx,cy-150).fill("#fff");
  				arrows.push(new_arrow);
  			}
        	var m = paper.mouse(e);
			status = 1;
			startX = m.x;
			startY = m.y;
        }
        function dragmove(e){
        	e.preventDefault();
     		e.stopPropagation();
			if(!status) {
				return;
			}
			var m = paper.mouse(e);
			endX = m.x;
			endY = m.y;
			dx = endX - startX;
			dy = endY- startY;
			refreshBow(dy);
        }
        function dragend(e){
        	if(!status) {
        		return;
        	}
        	hasArrow = false;;
        	var animated = arrows.pop();
			animateBow(dy);
			moveArrow(dy,animated);
			startX = startY = endX = endY= status = 0;
        }
        function refreshBow(d) {
        	var dy = Math.min(d,80);
			p4 = Point(cx,cy+dy);
			var path = new cad.Path().SplineTo([p1,p4,p3]);
			bow.attr('d',path);
			arrows[0].attr("transform",'translate(0,'+dy+')')
        }
        function animateBow(dy) {
        		mp3.currentTime = 1;
        		mp3.play();
        		setTimeout(function(){
        			mp3.pause();
        			mp2.currentTime = 1;
        			mp2.play();
        			setTimeout(function(){
        				mp2.pause();
        			},800)
        		},600)
        	cad.animation.stopAnimation(bow);
			cad.animation.init({
				from:Math.min(dy,80),
				to:0,
				during:300*80/(dy+30),
				target:bow,
				ease:'easeOut',
				exefunc:function(v){
					var p = Point(cx,cy);
					var path = new cad.Path().SplineTo([p1,p.moveBy(0,-1*v/2),p3]);
					this.attr("d",path);
				},
				callback:function(){
					image.atr("filter","url(#gray)");
				}
			})
        }
        function moveArrow(dy,elem){
        	cad.animation.init({
				from:Math.min(dy,80),
				to:-800,
				during:1000*80/(dy+20),
				target:elem,
				ease:'linear',
				exefunc:function(v){
					this.attr("transform",'translate(0,'+ v +')');
				},
				callback:function(){
					setTimeout(function(){
						image.removeAttr('filter');
						if(arrows.length==0) {
			  				var new_arrow = paper.addShape("markLine",cx,cy,cx,cy-150).fill("#fff");
			  				arrows.push(new_arrow);
			  			}
					},200);

					this.remove();
				}
			})
        }
	}
})
module.exports = Arrow;