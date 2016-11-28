import paper from './paper'

paper.extend({
__DEFAULT_LAYER_CONFIG__:{
		"stroke":"#000",
		"stroke-width":1,
		"fill":"none",
		"stroke-linejoin":"round",
		"stroke-linecap":"square"
}
})
paper.fn.extend({
	currentLayer:{},
	layers:{

	},
	initDefaultLayer:function(){
		this.addLayer("default_layer",paper.__DEFAULT_LAYER_CONFIG__);
		this.switchToDefaultLayer();
	},
	addLayer:function(id,config,type){
		if(this.layers[id]) {
			return this;
		}
		config = paper.extend({},config);
		config.id = id;
		var tag = 'g';
		if(type == 'symbol') {
			tag = 'symbol';
		}
		var g = this.createSVGElement(tag,config).addClass("cad-layer")
		this.layers[id] = config;
		if(type=='block') {
			this.svg.find("#global_defs").append(g);
		} else  {
			this.svg.append(g);
		}
		return g;
	},
	switchToDefaultLayer:function(){
		return this.switchLayer("default_layer");
	},
	temporarySwitchLayer:function(id,callback){
		if(!this.layers[id]) {
			return;
		}
		var cur_id = this.currentLayer.id;
		this.switchLayer(id);
		if(typeof callback == 'function') {
			callback.call(this,this.currentLayer);
		}
		this.switchLayer(cur_id);
		return this;
	},
	switchLayer:function(id){
		if(!this.layers[id]) {
			return this;
		}
		this.currentLayer = {
			id:id,
			el:this.svg.find("#"+id)
		}
		return this;
	},
	removeLayer:function(id){
		if(id=="default_layer") {
			return this;
		}
		delete this.layers[id];
		this.svg.find("#"+id).remove();
		return this.switchToDefaultLayer();
	},
	cleanLayer:function(id){
		id = id||this.currentLayer.id;
		this.svg.find("#"+id).find("*").remove();
		return this;
	},
	configLayer:function(){
		var id ,option;
		if(arguments.length==1&&typeof arguments[0] == 'object') {
			id = this.currentLayer.id;
			option = arguments[0];
		} else {
			id = arguments[0];
			option = arguments[1];
		}
		option = option ||{};
		id = id||"default_layer";
		var g = this.svg.find("#"+id);
		var config = this.layers[id];
		var new_config= paper.extend(config,option);
		this.layers[id] = new_config;
		if(typeof option == 'object') {
			for(var key in new_config) {
				g.attr(key,new_config[key]);
			}
		}
		return this;
	},
})