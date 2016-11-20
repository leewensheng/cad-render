import $ from 'jquery'
import "./dom"
var Paper = function(option){
    return new Paper.prototype.init(option);
}
Paper.prototype = {
    mouse:function(e,mutiple){
        var svg = this.svg.get(0);
        var clientRect  = svg.getBoundingClientRect();
        if(!mutiple) {
            if(!/touch/gi.test(e.type)) {
                return {x:e.clientX - clientRect.left,y:e.clientY- clientRect.top};   
            } else {
                return {
                    x:e.touches[0].clientX  - clientRect.left,
                    y:e.touches[0].clientY - clientRect.top
                };
            }
        } else {
            var ret = [];
            if(/touch/gi.test(e.type)) {
                for(var i = 0; i < e.touches.length;i++) {
                    ret.push({
                        x:e.touches[i].clientX - clientRect.left,
                        y:e.touches[i].clientY - clientRect.top
                    })
                }
            }
            return ret;
        }
    },
    createSVGElement:function(tagName,attributes) {
        tagName = $.trim(tagName);
        var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        var el = document.createElementNS(SVG_NAMESPACE,tagName);
        if(typeof attributes === 'object') {
            for(var key in attributes) {
                el.setAttribute(key,attributes[key]);
            }
        }
        return $(el);
    },
    init:function(option){
            this.option = option;
            this.initPaper();
            return this;
    },
    initPaper:function(){
        var option = this.option;
        var width = option.width;
        var height = option.height;
        var el = option.el;
        var svg = this.createSVGElement('svg',{width:width,height:height});
        var default_layer = this.createSVGElement('g',{id:"default_layer",stroke:"#fff",fill:"none"});
        var defs = this.createSVGElement("defs");
        $(el).append(svg);
        $(svg).append(defs);
        $(svg).append(default_layer);
        this.svg = svg;
        this.currentLayer = default_layer;
    },
    append:function(tagName,attributes){
        var currentLayer = this.currentLayer;
        var el = this.createSVGElement(tagName,attributes);
        $(currentLayer).append(el);
        return el;
    },
    prepend:function(){
        var currentLayer = this.currentLayer;
        var el = this.createSVGElement(tagName,attributes);
        $(currentLayer).prepend(el);
        return el;
    },
    select:function(selector){
        return $(selector,this.svg.ownerDocument);
    }
}
Paper.prototype.init.prototype = Paper.fn = Paper.prototype;
Paper.extend = Paper.fn.extend = $.extend;
module.exports = Paper;