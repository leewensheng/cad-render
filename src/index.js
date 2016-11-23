import React from 'react'
import ReactDOM from 'react-dom'
import ClassName from '../lib/class-name'
import Draggable from  '../lib/draggable'
import "./test.css"
import Droppable from "../lib/droppable"
import "./index.css"
import $ from 'jquery'
import Sorttable from "../lib/sorttable"
import Animation from "../lib/svg/animation"
import CreateUrl from '../lib/url'
import cad from '../lib/svg'
import Performance from './performance'
window.cad = cad;
window.React = React;
window.ReactDOM = ReactDOM;
var Button = React.createClass({
    render(){
       var  style = {};
        return <button>3</button>
    },
    componentDidMount(){
        var me = ReactDOM.findDOMNode(this);
    }
})
var SVG = React.createClass({
    render() {
        return <div></div>
    },
    componentDidMount(){
        var el = ReactDOM.findDOMNode(this);
        var paper = cad.init({
                el:el,
                width:"100%",
                height:window.innerHeight
            });
        var bg = paper.append("rect",{
            x1:0,
            y1:0,
            width:"100%",
            height: "100%",
            fill:"#000"
        })
        paper.importDefs("shadow",{
            offsetX:0,
            offsetY:0
        }).importDefs("blur",10);
        paper.importDefs("linearGradient",{stops:[{
            offset:"0%",
            color:"red"
        },{offset:"100%",color:"blue"}]})
        .importDefs("radialGradient",{stops:[{
            offset:"0%",
            color:"red"
        },{offset:"100%",color:"blue"}]});
        var gear1 = paper.addShape("gear",380,380,{
            r1:200,
            r2:280,
            teeth:20
        }).rotate(9,380,380).useDefs("fill","linearGradient").dash("5,10",500)
            .animateMotion({
            path:new cad.Path().MoveTo(0,0)
                                .lineTo(100,100)
                                .angleArcTo(45,70,200,200,true)
                                .h(150)
                                .v(-83).toString(),
            dur:'2s',
            begein:'0s',
            repeatCount:"indefinite"
        })
        var mirrorPoint = cad.Point(380,380).mirror(620,50,620,70);
        paper.addShape("gear",mirrorPoint.x,mirrorPoint.y,{
            r1:200,
            r2:280,
            teeth:20
        }).attr("fill","yellow").attr("stroke-width",20).useDefs("filter","blur").useDefs("fill","radialGradient");
        paper.append("circle",{
            cx:mirrorPoint.x,
            cy:mirrorPoint.y,
            r:50
        })
        paper.addShape("bendLine",400,220,{
            h:20,
            len:400
        })

        //样条曲线
        var points = [{x:100,y:100},{x:150,y:150},{x:200,y:100},{x:250,y:150},{x:300,y:100},{x:350,y:150},{x:400,y:100},{
            x:300,
            y:150
        },{
            x:450,
            y:300
        }];
        paper.spline(points);



        paper.importDefs("linearGradient",{
            id:"pinkGradient",
            x1:"0%",
            y1:"0%",
            x2:"100%",
            y2:"100%",
            stops:[{
                offset:"0%",
                color:"#f00"
            },{
                offset:"100%",
                color:"pink"
            }]
        })
        paper.addShape("heart",380,380,{size:200}).useDefs("fill","pinkGradient");
        paper.append("circle",{
            cx:380,
            cy:380,
            r:50
        })
        paper.append("text").attr("x",50).attr("y",50).attr("font-size",50).text('test').attr("stroke","red")
        
        //阵列
        /*paper.append('circle').attr("r",20).arrayCopy(35,22,function(x,y){
            $(this).attr("cx",x*40+20).attr("cy",y*40+20).attr("fill",cad.hsl(x*y%360,50,50))
        }).attr("stroke","none")*/
        
        //箭头
        paper.addShape("markLine",200,200,300,500,{width:20,height:60}).fill("red").stroke("red")
        
        //文本
        paper.text("李文胜",0,0,{
            fontSize:450,
            baseline:"top",
            align:"middle"
        }).stroke("red").useDefs("fill","linearGradient")
        paper.line(100,100,200,300).stroke("blue",5);
        paper.spline([{x:1,y:1},{x:100,y:100},{x:250,y:200}]).stroke("pink",5).upperZIndex(-3)
        paper.rect(11,11,300,300).fill("red")
        paper.path(new cad.Path().MoveTo(33,33).LineTo(83,33)).stroke("blue",5);
        paper.polygon([{
            x:0,
            y:0
        },{x:150,y:150},{x:0,y:300}]).fill("#555");
        var p = cad.Point;
        paper.polyline([p(3,5),p(220,200),p(500,500)]).stroke("555",20);
        paper.diagonalRect(0,0,100,100,20).fill("#aaa").stroke("red",3)
        //扇形
        paper.addShape("sector",300,300,{
            startAngle:50,
            endAngle:180,
            radius:200,
            innerRadius:100
        }).fill("blue").fill("red")

        //正弦曲线
        paper.addShape("sinCurve",300,300).fill("blue");
        //扇形图
        paper.sector(200,200,-60,60,200).fill("blue");
        //图片
        paper.image(0,0,250,250,"http://ww1.sinaimg.cn/mw690/6cefc1a7jw1fa0of045e7j20zk0qogzo.jpg").useDefs("filter","blur")

        var count = 0;
        paper.addLayer("test",{
            fill:"none",
            "stroke-width":2.5
        })
        $(paper.svg).on("mousemove touchstart touchmove",function(e){
            e.preventDefault();
            e.stopPropagation();
            var point = paper.mouse(e);
            count++;
            var color = cad.hsl(count%360,100,50);
            var circle = paper.append("circle",{
                cx:point.x,
                cy:point.y,
                r:1e-6
            }).attr('stroke',color);
            circle.transition({
                                r:100,
                                strokeOpacity:1e-6
                                },
                                2000,
                                'SinusoidalOut',function(){
                $(this).remove();
            })
        })

    }
})
var Nav = React.createClass({
    getInitialState(){
      return {
        open:true
      }
    },
    render(){
      var c = ClassName('test').addClass("test").addClass('haha').toggleClass('haha');
      return  (
        <div>
        <SVG/>
        <Button/>
        <Draggable axis="" helper="clone">
            <table border="1px">
                <thead>
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
        </Draggable>
        <Draggable helper="clone">button</Draggable>
        <Draggable dragId="test" axis="y"  zIndex="10">
        <Droppable className="drop-wrap" drop={drop}><h1>drop</h1></Droppable>
        </Draggable>
        <Draggable helper="clone">
        <Sorttable axis="y"><ul><li>test</li><li>test2</li></ul></Sorttable>
        </Draggable>
        </div>
        )
    }
})
function drop(target){
    target.revert();
   var el = ReactDOM.findDOMNode(target)
   var me = ReactDOM.findDOMNode(this);
   $(me).append($(el).get(0).cloneNode(true));
}
ReactDOM.render(<Nav />,document.getElementById("root"))