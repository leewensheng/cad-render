import Chart from './core'
import cad from '../svg'

Chart.prototype.pie = Pie;
function Pie(chart){
	return new Pie.prototype.init(chart);
}
Pie.prototype = {
	needAxis:false,
	sectors:[],
	radius:null,
	destroy:function(){
	},
	update:function(){

	},
	init:function(chart){
		var paper = chart.getPaper();
		var option = chart.option;
		var data = option.data;
		var percents = this.getPercents(data);
		var width = paper.width(),height = paper.height();
		var radius = Math.min(width,height)/2.5;
		this.radius = radius;
		var center = paper.getCenterPoint();
		var colors = ['#4285F4','#EA4335','#FBBC05','#34A853'];
		var me = this;
		percents.reduce(function(prev,cur,index){
			var startAngle = prev;
			var endAngle = prev + cur*360;
			var sector = paper.sector(center.x,center.y,startAngle,endAngle,radius).fill(colors[index%colors.length]).stroke("none",0);
			me.sectors.push({
				startAngle:startAngle,
				endAngle:endAngle,
				el:sector,
			});
			return endAngle;
		},-90);
		this.attachEvents();
	},
	selectSector:function(val){
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
	},
	attachEvents:function(){
		var pie = this;
		var sectors = this.sectors;
		sectors.map(function(val,index){
			val.el.on("click",function(){
				pie.selectSector(val);
				for(var i = 0; i <sectors.length;i++) {
					if(i!==index&&sectors[i].selected) {
						pie.selectSector(sectors[i]);
					}
				}
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