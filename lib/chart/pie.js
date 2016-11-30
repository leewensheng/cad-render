import Chart from './core'
import cad from '../svg'

Chart.prototype.pie = Pie;
function Pie(chart){
	return this.init(chart)
}
Pie.prototype = {
	paper:null,
	layer:null,
	option:null,
	data:[],
	sectors:[],
	hasInited:false,
	destroy:function(){
	},
	update:function(){

	},
	init:function(chart){
		var paper = chart.getPaper();
		var pie_layer = paper.addLayer().addClass("pie-class");
		paper.switchLayer(pie_layer);
		this.paper  = paper;
		var option = chart.option;
		var data = option.data;
		var percents = this.getPercents(data);
		var width = paper.width(),height = paper.height();
		var radius = Math.min(width,height)/2.5;
		var center = paper.getCenterPoint();
		var colors = ['#4285F4','#EA4335','#FBBC05','#34A853'];
		var me = this;
		this.cx = center.x;
		this.cy = center.y;
		this.radius = radius;
		this.paper = paper;
		this.hasInited = true;
		percents.reduce(function(prev,cur,index){
			var startAngle = prev;
			var endAngle = prev + cur*360;
			var sector = paper.sector(center.x,center.y,startAngle,endAngle,radius,radius*0.6).fill(colors[index%colors.length]).stroke("none",0);
			me.sectors.push({
				color:colors[index],
				startAngle:startAngle,
				endAngle:endAngle,
				el:sector,
			});
			return endAngle;
		},-90);
		this.attachEvents();
	},
	selectSector:function(val,self){
		var offset = 20;
		var angle = (val.startAngle + val.endAngle)/2;
		var offsetX = offset*Math.cos(angle*Math.PI/180);
		var offsetY = offset*Math.sin(angle*Math.PI/180);
		if(!val.selected) {
			val.selected = true;
			val.el.transition({
				transform:"translate("+offsetX +"," + offsetY +")"
			},400,'easeOut');
		} else {
			val.selected = false;
			val.el.transition({
			transform:"translate("+0 +"," + 0 +")"
			},400,'easeOut');
		}
		var {cx,cy} = this;
		if(!self) {
			return;
		}
		var angle = parseInt(val.endAngle - val.startAngle)+"°"
		if(!this.text) {
			this.text = this.paper.text(cx,cy,angle,{
				fontSize:100,
				align:"center",
				baseline:"middle",
				color:"red"
			}).attr('dx',50)
		} else {
			this.text.text(angle)
		}
	},
	attachEvents:function(){
		var pie = this;
		var sectors = this.sectors;
		sectors.map(function(val,index){
			val.el.on("click",function(){
				pie.selectSector(val,true);
				for(var i = 0; i <sectors.length;i++) {
					if(i!==index&&sectors[i].selected) {
						pie.selectSector(sectors[i]);
					}
				}
			}).on("mouseover",function(){
				var color = val.color;
				var hoverColor = cad.darken(color,0.8);
				val.el.transition({fill:hoverColor},300,'ease');
			}).on("mouseout",function(){
				val.el.transition({fill:val.color},300,'ease');
			})
		})
	},
	getPercents:function(data){
		var sum = cad.sum(data);
		return data.map(function(val){
			return val/sum;
		})
	},
}
Pie.prototype.init .prototype = Pie.prototype;