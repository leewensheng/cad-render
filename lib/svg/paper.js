import $ from 'jquery'
import "./dom"
var Paper = function(option){
    return new Paper.prototype.init(option);
}
Paper.prototype = {
    mouse:function(e){
        var svg = this.svg;
        var clientRect  = svg.getBoundingClientRect();
        return {x:e.clientX - clientRect.left,y:e.clientY- clientRect.top};
    },
    createSVGElement:function(tagName,attributes) {
        var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        var el = document.createElementNS(SVG_NAMESPACE,tagName);
        if(typeof attributes === 'object') {
            for(var key in attributes) {
                name = key﻿.replace(/([A-Z])/g,'-$1').toLowerCase();
                el.setAttribute(name,attributes[key]);
            }
        }
        return el;
        
    },
    init:function(option){
        var el = option.el,
            width = option.width,
            height = option.height;
            this.el = el;
            this.width = width;
            this.height = height;
            this.option = option;
            this.initPaper();
            return this;
    },
    initPaper:function(){
        var width = this.width;
        var height = this.height;
        var el = this.el;
        var svg = this.createSVGElement('svg',{width:width,height:height});
        $(el).append(svg);
        this.svg = svg;
        this.initDefaultLayer();
        return this;
    },
    append:function(tagName,attributes){
        var currentLayer = this.currentLayer;
        var el = this.createSVGElement(tagName,attributes);
        $(currentLayer).append(el);
        return $(el);
    },
    addShape:function(id,cx,cy) {

    },
    select:function(selector){
        return $(selector,this.svg.ownerDocument);
    }
}
Paper.prototype.init.prototype = Paper.fn = Paper.prototype;
Paper.extend = Paper.fn.extend = $.extend;

//  图层管理
Paper.fn.extend({
    default_layer:{
        id:"default_layer",
        fill:"none",
        stroke:"#000",
        strokeWidth: "1"
    },
    layers:{},
    initDefaultLayer:function(){
        var svg = $(this.svg);
        var default_layer = this.default_layer;
        var g = this.createSVGElement("g",default_layer);
        svg.append(g);
        this.currentLayer = g;
    },
    configLayer:function(){
        var layer_id,option;
        if(arguments.length==1) {
            option = arguments[0];
            layer_id = "default_layer"
        } else {
            layer_id =arguments[0];
            option = arguments[1];
        }
        var elem = this.select("#" + layer_id);
        if(elem.length) {
            elem.attr(option);
        }
        return this;
    },
    addLayer:function(id,config){
        if(!config) {
            config = $.extend(true,{},this.default_layer);
        }
         var svg = $(this.svg);
        this.layers[id] = config;
        config.id = id;
        var g = this.createSVGElement("g",config);
        svg.append(g);
        this.currentLayer = g;
        return this;
    },
    removeLayer:function(id){
        if(id=="default_layer") {
            return this;
        }
        delete this.layers[id];
        this.select('#' + id).remove();
        this.currentLayer = this.select("#default_layer").get(0);
        return this;
    },
    clearLayer:function(id){
        if(!id) {
            id ="default_layer";
        }
        $("#" + id).find("*").remove();
        return this;
    },
    hideLayer:function(id){

    },
    showLayer:function(id) {

    },
    toggleLayer:function(id,isShow){

    },
    switchLayer:function(id){
        if(!id) {
            id = 'default_layer';
        }
        var elem = his.select('#' + id);
        if(elem.length) {
            this.currentLayer = elem.get(0);
        }
        return this;
    },
    switchToDefaultLayer:function() {
        return this.switchLayer("default_layer");
    }
});

//图层管理end//
module.exports = Paper;