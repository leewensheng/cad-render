import $ from 'jquery'
import Animation from './animation'

$.fn.transition = function(attr,during,ease,callback){
    $(this).each(function(index,dom){
        var option = {

        };
        var from = {};
        var defaultAttr = {
            "stroke-opacity":1,
            "fill-opacity":1
        }
        for(var key in  attr) {
            name = key﻿.replace(/([A-Z])/g,'-$1').toLowerCase();
            //todo color transform的过渡 delay
            from[key] = parseFloat($(dom).attr(name)||defaultAttr[name]||0);
        }
        option.from = from;
        option.to = attr;
        option.target = dom;
        option.ease = ease;
        option.callback = callback;
        option.during = during;
        option.exefunc = function(r){
            for(var key in r) {
                name = key﻿.replace(/([A-Z])/g,'-$1').toLowerCase();
                $(this).attr(name,r[key]);
            }
        }
        Animation.init(option);
    })
    return $(this);
}

$.fn.arrayCopy = function(){
    if(arguments.length==0) {
        return $(this);
    }
    var xcopy,ycopy,callback;
    if(arguments.length==1) {
        xcopy = arguments[0];
    }
   if(arguments.length==2) {
        xcopy = arguments[0];
        ycopy = 1;
        callback = arguments[1];
   }
   if(arguments.length==3) {
        xcopy = arguments[0];
        ycopy = arguments[1];
        callback = arguments[2];
   }
    xcopy = parseInt(xcopy);
    ycopy = parseInt(ycopy);
    if(xcopy<1||ycopy<1) {
        return $(this);
    }
    var me = $(this);
    var allNodes = [];
    $(this).each(function(index,dom){
        var parent = dom.parentNode;
        var nodes = [];
        for(var i = 0; i < xcopy; i++) {
            for(var j = 0;j <ycopy;j++) {
                if(i==0&&j==0) {
                    if(typeof callback == 'function') {
                        callback.call(dom,i,j);
                    }
                    nodes.push(dom);
                } else {
                    var clone = dom.cloneNode(true);
                    if(typeof callback == 'function') {
                        callback.call(clone,i,j);
                    }
                    nodes.push(clone);
                    parent&&parent.appendChild(clone);
                }
            }
        }
        allNodes = allNodes.concat(nodes)
    })
   return this.pushStack(allNodes);
}

$.fn.rotate  = function(angle,cx,cy){
    cx = cx||0;
    cy = cy||0;
    $(this).each(function(index,dom){
        $(dom).attr("transform","rotate(" + angle + ',' + cx + ',' + cy + ')');
    })
    return $(this);
}
$.fn.stroke = function(color,width,opacity){
    if(arguments.length == 0 ) {
        return this;
    }
    $(this).attr("stroke",color);
    if(typeof width!= "undefined") {
        $(this).attr("stroke-width",width);
    }
    if(typeof opacity!="undefined") {
        $(this).attr("stroke-opacity","opacity");
    }
    return this;
}
$.fn.fill = function(color,opacity,rule) {
    if(arguments.length==0) {
        return this;
    }
    this.attr("fill",color);
    if(typeof opacity != 'undefined') {
        this.attr('fill-opacity',opacity);
    }
    if(typeof rule != 'undefined') {
        this.attr("fill-rule",rule);
    }
    return this;
}
$.fn.dash = function(dashAarray,offset) {
    if(arguments.length==0) {
        return this;
    }
    this.attr("stroke-dasharray",dashAarray);
    this.attr("stroke-dashoffset",offset);
    return this;
}
$.fn.animateMotion = function(option){
    option = option||{};
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    $(this).each(function(index,dom){
        var el = document.createElementNS(SVG_NAMESPACE,"animateMotion");
        for(var attr in option) {
            el.setAttribute(attr,option[attr]);
        }
        $(dom).append(el);
    })
    return this;
}
$.fn.animateTransform = function(option) {
    option = option||{};
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    $(this).each(function(index,dom){
        var el = document.createElementNS(SVG_NAMESPACE,"animateTransform");
        for(var attr in option) {
            el.setAttribute(attr,option[attr]);
        }
        $(dom).append(el);
    })
    return this;    
}

$.fn.animateAttribute = function(){
    option = option||{};
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    $(this).each(function(index,dom){
        var el = document.createElementNS(SVG_NAMESPACE,"animate");
        for(var attr in option) {
            el.setAttribute(attr,option[attr]);
        }
        $(dom).append(el);
    })
    return this;    
}
$.fn.upperZIndex = function(z) {
    if(this.length>1 || this.length == 0 ||z == 0) {
        return this;
    }
    var me = this;
    var copy = me.get(0).cloneNode(true);
    var preSibling = [];
    var nextSibing = [];
    var cur_prev,cur_next;
    cur_prev = cur_next = me.get(0);
    while(cur_prev.previousSibling) {
        preSibling.push(cur_prev.previousSibling);
        cur_prev = cur_prev.previousSibling;
    }
    while(cur_next.nextSibling) {
        nextSibing.push(cur_next.nextSibling);
        cur_next = cur_next.nextSibling;
    }
    me.remove();
    if(z > 0) {
        for(var i = 0; i < nextSibing.length;i++) {
            if(z == i) {
                $(nextSibing[i]).after(copy);
            } else {
                if(z>=nextSibing.length&&i==nextSibing.length-1) {
                    $(nextSibing[i]).after(copy);
                } 
            }
        }
    } else {
        var z = Math.abs(z);
        for(var i = preSibling.length-1; i >= 0;i--) {
            if(z == i) {
                $(preSibling[i]).before(copy);
            } else {
                if(z>=preSibling.length&&i==preSibling.length-1) {
                    $(preSibling[i]).before(copy);
                } 
            }
        }

    }
    return $(copy);
}










































































