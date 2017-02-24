import paper from './paper'
import $ from 'jquery'
import Element from './virtual-dom/element'
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
	initDefaultLayer:function(){
		this.currentLayer = null;
		this.layers = {};
		this.addLayer("default_layer",paper.__DEFAULT_LAYER_CONFIG__);
		this.switchToDefaultLayer();
	},
	addLayer:function(id,config,type){
		var tag = 'g';
		if(typeof id=='string' && this.layers[id]) {
			return this;
		}

		if(type == 'symbol') {
			tag = 'symbol';
		}
		config = paper.extend({},config);
		if(arguments.length>0) {
			config.id = id;
			this.layers[id] = config;
		}
		var g = this.createSVGElement(tag,config);
		if(type=='block') {
			this.svg.find("defs").append(g);
		} else  {
			this.svg.append(g);
		}
		return g;
	},
	switchToDefaultLayer:function(){
		return this.switchLayer("default_layer");
	},
	temporarySwitchLayer:function(){
		var cur_layer = this.currentLayer;
		var id,el,callback;
		if(typeof arguments[0] === 'string') {
			id = arguments[0];
			el = this.svg.find("#"+id);
		} else if(arguments[0] instanceof $) {
			el = arguments[0];
		} else if(arguments[0] instanceof Element) {
			el = arguments[0];
		}
		callback = arguments[1];
		this.switchLayer(el);
		callback.call(this,el);
		this.switchLayer(cur_layer);
		return this;
	},
	switchLayer:function(){
		if(arguments.length==0) {
			return this;
		}
		var id,el;
		if(typeof arguments[0] == 'string') {
			id = arguments[0];
			if(this.layers[id]) {
				el = this.svg.find("#"+id);
			} else {
				return this;
			}
		} else if(arguments[0] instanceof SVGElement) {
			id = null,
			el = $(arguments[0]);
		} else if(arguments[0] instanceof $) {
			if(arguments[0].get(0) instanceof SVGElement) {
				id = null;
				el = arguments[0];
			}
		} else if(arguments[0] instanceof Element) {
			el = arguments[0];
		}
		this.currentLayer = el;
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
	clearLayer:function(id){
		if(typeof id == 'undefined') {
			return this;
		} else if(typeof id == 'string') {
			this.svg.find("#"+id).find("*").remove();
		} else if(id instanceof $) {
			id.find("*").remove();
		}
		return this;
	},
	configLayer:function(){
		if(arguments.length == 0) {
			return;
		}
		var id,el,option;
		if(arguments.length==1 &&typeof arguments[0] == 'object') {
			el = this.currentLayer;
			option  = arguments[0];
		} else if(arguments.length == 2) {
			if(arguments[0] instanceof $) {
				el = arguments[0];
				option = arguments[1];
			} else if(typeof arguments[0] == 'string') {
				id = arguments[0];
				el = this.svg.find("#"+id);
				option = arguments[1];
			}
		}
		for(var key in option) {
			el.attr(key,option[key]);
		}
		if(id) {
			var old_config = this.layers[id];
			this.layers[id] = paper.extend(old_config,option);
		}
		return this;
	},
})