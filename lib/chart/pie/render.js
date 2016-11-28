import  default_options from './options'
import cad from '../svg'

function Pie(paper,layer,data,options) {
	return this.init(paper,layer,data,options);
}
Pie.prototype = {
	paper:null,
	layer:null,
	data:null,
	options:null,
	sectors:null,
	hasInited:false,
	init:function(paper,layer,series,options){
		this.paper = paper;
		this.layer = layer;
		this.data = data;
		this.options =options;
		this.renderPie();
		this.attachEvents();
	},
	renderPie:function(){
		var {paper,layer,data,options} = this;
		var colors = options.colors;
		var width = paper.width();
		var height = paper.height();
		var percents = this.getPercents(data);
	},
	drawDataLabels:function(){

	},
	getPercents:function(data){
		var sum = cad.sum(data);
		return data.map(function(val){
			return val/sum;
		})
	},
	attachEvents:function(){

	},
	update:function(data,options){

	},
}