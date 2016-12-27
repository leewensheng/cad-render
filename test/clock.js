import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
var Clock = React.createClass({
    render:function(){
        return <div>
        </div>
    },
    componentDidMount:function(){
        var el = ReactDOM.findDOMNode(this);
        var paper = cad.init({
            el:el,
            width:this.props.width||window.innerWidth,
            height:this.props.height||window.innerHeight
        });
        var width = paper.width();
        var height = paper.height();
        var cx = width/2;
        var cy = height/2;
        var radius = Math.min(width,height)*0.8/2;
        var time = new Date();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();
        var angleH = h%12/12*360-90 + m/2 +s/60/60*2;
        var angleM = m%60/60*360 -90+s/60;
        var angleS = s%60/60*360 -90;
        paper.configLayer({"stroke-linecap":"round","stroke":"#9FA6AA"})
        paper.circle(cx,cy,radius).stroke("#929CAC",3);
        //时钟
        paper.angleLine(cx,cy,angleH,radius*0.6).stroke("#9FA6AA",5);
        //分钟
        paper.angleLine(cx,cy,angleM,radius*0.7).stroke("#9FA6AA",5);
        var p = cad.Point(cx,cy).angleMoveTo(angleS+180,radius*0.2);
        //秒钟
        var pointer = paper.angleLine(0,0,angleS,radius*0.8).stroke("#9FA6AA",3).rotate(0).translate(cx,cy);
        pointer.transition({
            transform:"rotate(360000)"
        },60000000,'linear');
        paper.circle(cx,cy,10).fill("#1F4955").stroke("none");
        var tick = paper.angleLine(cx,cy+radius-40,-90,20).stroke("#9FA6AA").arrayCopy(60,function(i){
            $(this).rotate(i*360/60,cx,cy);
            if(i%5==0) {
                $(this).attr('stroke-width',5);
                var t = i/5%12;
                if(t==0){
                    t = 12;
                }
                var point = new cad.Point(cx,cy);
                point.angleMoveTo(i*6,radius-80).rotate(-90,cx,cy);
                paper.text(point.x,point.y,t,{baseline:'middle'}).attr('text-anchor','middle');
            } else {
                $(this).attr('stroke-width',2);
            }
        })
        paper.circle(cx,cy,radius*0.9+10).attr('stroke-width',5);
        var color = cad.brighten("#9FA6AA",0.3);
        paper.circle(cx,cy,radius*0.9).stroke(color,20);
        paper.on("click",function(){
            //paper.downloadImage('test');
        })
    }
})
module.exports = Clock;