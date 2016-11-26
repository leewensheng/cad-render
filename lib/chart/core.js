import cad from '../svg'

function Chart(option){
	return this.init(option);
}
Chart.prototype = {
	option:null,
	paper:null,
	init:function(option) {
		this.option = option;
		this.initPaper();
		this.pie(this);
		return this;
	},
	initPaper:function(){
		var option = this.option;
		var el = option.el;
		this.paper = cad.init({
			el:el,
			width:window.innerWidth,
			height:window.innerHeight
		})
	},
	getPaper:function(){
		return this.paper;
	}
}
module.exports = Chart;
