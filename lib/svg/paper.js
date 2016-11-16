import $ from 'jquery'

var Paper = function(option){
    return new Paper.prototype.init(option);
}
Paper.prototype = {
    mouse:function(e){
        var doc = this.doc;
        var clientRect  = doc.getBoundingClientRect();
        return {x:e.clientX - clientRect.left,y:e.clientY- clientRect.top};
    },
    createSVGElement:function(tagName,attributes) {
        var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        var el = document.createElementNS(SVG_NAMESPACE,tagName);
        if(typeof attributes === 'object') {
            for(var key in attributes) {
                el.setAttribute(key,attributes[key]);
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
            this.initPaper();
            return this;
    },
    initDefaultLayer:function(){

    },
    initPaper:function(){
        var width = this.width;
        var height = this.height;
        var el = this.el;
        var svg = this.createSVGElement('svg',{width:width,height:height});
        var default_layer = this.createSVGElement('g',{id:"default_layer",stroke:"#fff",fill:"none"});
        $(el).append(svg);
        $(svg).append(default_layer);
        this.doc = svg;
        this.currentLayer = default_layer;
    },
    append:function(tagName,attributes){
        var SVG_NAMESPACE = 'http://www.w3.org/2000/svg',layer = this.currentLayer,el = document.createElementNS(SVG_NAMESPACE,tagName);
        if(typeof attributes === 'object') {
            for(var key in attributes) {
                el.setAttribute(key,attributes[key]);
            }
        }
        layer.appendChild(el);
        return $(el);
    },
    addShape:function(id,cx,cy) {

    },
    select:function(selector){
        return $(selector,this.doc.ownerDocument);
    }
}
Paper.prototype.init.prototype = Paper.fn = Paper.prototype;
Paper.extend = Paper.fn.extend = $.extend;
module.exports = Paper;