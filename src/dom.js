import $ from 'jquery'
import Animation from './animation'
import namespace from './namespace'
import Color from './color/core'
import utils from './utils'
import Line from './line'
import Path from './path'
/*
 *@problem  插值过程中，一些值不允许负值，比如circle的r,rect的width,height
 */
$.parseTransform = utils.parseTransform;
$.getTransform = utils.getTransform;
$.fn.stopTransition = function(goEnd,callback){
    this.each(function(index,dom){
        Animation.stopAnimation(dom,goEnd,callback);
    })
    return this;
}
$.mouse = function(event){
    var clientX,clientY;
    if(/touch/gi.test(event.type)) {
        let touch  = event.touches[0];
        if(!touch) {
            return null;
        }
        clientX = touch.clientX;
        clientY = touch.clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    return {clientX,clientY};
}
$.fn.transition = function(attr,during,ease,callback,group){
    //注意fill,stroke,transform的支持;
    if(arguments.length > 1) {
        this.each(function(index,dom){
            var option = {

            };
            var defaultAttr = {
                "stroke-opacity":1,
                "fill-opacity":1
            }
            var noNegativeAttr = {
                "stroke-opacity":true,
                "fill-opacity":true,
                "r":true,
                "width":true,
                "height":true
            }
            /*var is_busy = Animation.isAnimating(dom);
            if(is_busy) {
                Animation.stopAnimation(dom);
            }*/
            var from = {};
            var to = attr;
            var interpolate;
            if(typeof to === 'object') {
                group = option.group || group;
                for(var key in  attr) {
                   var  name = key;
                    if(name === 'transform') {
                        from[key] = $.parseTransform(dom.getAttribute(name));
                        to[key]= $.parseTransform(attr[key]);
                    } else if(name == 'fill' || name == 'stroke') {
                        from[key] = new Color($(dom).attr(name)).toRgbObj();
                        to[key] =  new Color(attr[key]).toRgbObj();
                    } else if(name === 'd'){
                        from[key] = new Path(dom.getAttribute('d')).pathStack;
                        to[key] = new Path(to[key]).pathStack;
                    } else {
                        from[key] = parseFloat($(dom).attr(name)||defaultAttr[name]||0);
                        to[key] = attr[key];
                    }
                }
            } 
            option.target = dom;
            option.from = from;
            option.to = to;
            option.ease = ease;
            option.callback = callback;
            option.during = during;
            option.group = group;
            option.onUpdate = function(tickValue,option){
                for(var key in tickValue) {
                    var name = key;
                    if(noNegativeAttr[name] && tickValue[name] < 0) {
                        tickValue[name] = 0;
                    }
                    if(name == 'transform') {
                        this.setAttribute('transform',$.getTransform(tickValue.transform));
                    }else if(name == 'fill' || name == 'stroke') {
                        this.setAttribute(name,new Color(tickValue[name]).toRgb());
                    } else if(name == 'd'){
                        var path = new Path();
                        path.pathStack = tickValue[name];
                        path.refreshXY();
                        this.setAttribute('d',path.toString());
                    }else {
                       this.setAttribute(name,tickValue[key]);
                    }
                }
            }
            Animation.init(option);
        })
    } else {
        var option  = arguments[0];
        $(this).each(function(index,dom){
            if(typeof option == 'string') {
                if(option === 'stop') {
                    Animation.stopAnimation(dom);
                } else if(option == 'pause') {

                } else if(option == 'pop') {
                    
                }
                //支持暂停，取消动画，或出栈
            } else if(typeof option == 'object') {
                option.target = dom;
                Animation.init(option);
            }
        })
    }
    return this;
}
$.fn.interpolateTransition = function(interpolate,during,ease,callback){
    this.each(function(index,dom){
        var from = 0,to = 1;
        var option = {from,to,during,ease,callback};
        option.target = dom;
        option.onUpdate = function(tickValue){
            for(var key in tickValue) {
                    var name = key﻿;
                    if(name == 'transform') {
                        this.setAttribute('transform',$.getTransform(tickValue.transform));
                    }else if(name == 'fill' || name == 'stroke') {
                        this.setAttribute(name,new Color(tickValue[name]).toRgb());
                    } else if(name == 'd'){
                        var path = new Path();
                        path.pathStack = tickValue[name];
                        path.refreshXY();
                        this.setAttribute('d',path.toString());
                    }else {
                       this.setAttribute(name,tickValue[key]);
                    }
                }
       }
       Animation.init(option);
    });
    return this;
}
$.fn.getComputedTextLength = function(){
    if(this.length) {
        return this[0].getComputedTextLength();
    }
}
$.fn.arrayCopy = function(){
    if(arguments.length==0) {
        return $(this);
    }
    var xcopy,ycopy,callback;
    xcopy = arguments[0];
    var type = 1;
    if(arguments.length == 1 &&typeof arguments[0] == 'number') {
        type = 1;
    } else if(arguments.length==2) {
        if(typeof arguments[1] == 'function') {
            type = 2;
            callback = arguments[1]
        }
        if(typeof arguments[1] == 'number') {
            type = 3;
            ycopy = arguments[1];
        }
    } else if(arguments.length>=3) {
        type = 4;
        ycopy = arguments[1];
        callback = arguments[2];
    }
    xcopy = parseInt(xcopy);
    ycopy = parseInt(ycopy);
    if(isNaN(xcopy)) {
        xcopy = 1;
    }
    if(isNaN(ycopy)) {
        ycopy = 1;
    }
    if(xcopy < 1 || ycopy < 1) {
        return this;
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
                        if(type == 2) {
                            callback.call(dom,i,dom);
                        } else if(type ==4) {
                            callback.call(dom,i,j,dom);
                        }
                    }
                    nodes.push(dom);
                } else {
                    var clone = dom.cloneNode(true);
                    if(typeof callback == 'function') {
                        if(type == 2) {
                            callback.call(clone,i,clone);
                        } else if(type == 4) {
                            callback.call(clone,i,j,clone);
                        }
                    }
                    nodes.push(clone);
                    parent&&parent.appendChild(clone);
                }
            }
        }
        allNodes = allNodes.concat(nodes)
    })
    for(var i = 0; i <allNodes.length;i++) {
        this[i] = allNodes[i];
    }
    this.length = allNodes.length;
    return this;
}
$.fn.scale = function(scale,cx,cy){
    scale = scale || 0;
    cx = cx || 0;
    cy = cy || 0;
    this.each(function(index,dom){
        var transform = dom.getAttribute('transform')||'';
        var obj = $.parseTransform(transform);
        obj.scale = scale;
        obj.rotateX = cx;
        obj.rotateY = cy;
        var str = $.getTransform(obj);
        $(dom).attr('transform',str);
    })
    return this;
}
$.fn.translate = function(dx,dy){
    dx = dx || 0;
    dy = dy || 0;
    this.each(function(index,dom){
        var transform = dom.getAttribute('transform')||'';
        var obj = $.parseTransform(transform);
        obj.transX = dx;
        obj.transY = dy;
        var str = $.getTransform(obj);
        $(dom).attr('transform',str);
    })
    return this;
}
$.fn.rotate  = function(angle,cx,cy){
    angle = angle || 0;
    cx = cx || 0;
    cy = cy || 0;
    this.each(function(index,dom){
        var transform = dom.getAttribute('transform')||'';
        var obj = $.parseTransform(transform);
        obj.rotate = angle;
        obj.rotateX = cx;
        obj.rotateY = cy;
        var str = $.getTransform(obj);
        $(dom).attr('transform',str);
    });
    return this;
}
$.fn.addSVGNamespace = function(){
    this.each(function(index,dom){
        if(dom.tagName === 'svg') {
            $(dom).attr("xmlns","http://www.w3.org/2000/svg")
                  .attr("xmlns:xlink",namespace.xlink)
        }

    })
    return this;
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
    $(this).each(function(index,dom){
        var el = document.createElementNS(namespace.svg,"animateMotion");
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
    if(z>0&&nextSibing.length==0) {
        return this;
    }
    if(z<0&&preSibling.length==0) {
        return this;
    }
    me.remove();
    if(z > 0) {
        for(var i = 0; i < nextSibing.length;i++) {
            if(z == i) {
                $(nextSibing[i]).after(copy);
                break;
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
                break;
            } else {
                if(z>=preSibling.length&&i==preSibling.length-1) {
                    $(preSibling[i]).before(copy);
                } 
            }
        }

    }
    return $(copy);
}
$.fn.xlink = function(val){
 this.each(function(index,dom){
    dom.setAttributeNS(namespace.xlink,'xlink:href',val);
 })
 return this;
}
$.fn.title = function(text){
    this.each(function(index,dom){
        var titleElem = document.createElementNS(namespace.svg,"title");
        titleElem.textContent = text||"";
        dom.appendChild(titleElem);
    })
    return this;
}
$.fn.linkURL = function(url,target){
    this.each(function(index,dom){
        var el = document.createElementNS(namespace.svg,"a");
        $(el).xlink(url);
        if(target) {
            $(el).attr("target",target);
        }
        $(dom).wrap(el);
    })
    return this;
}
$.fn.mirror = function(x1,y1,x2,y2,deleteOriginal) {
    var line = new Line(x1,y1,x2,y2);
    var matrix = line.getMirrorMatrix();
    this.each(function(index,dom){
        if(deleteOriginal) {
            $(dom).attr("transform",matrix);
        } else {
            var cloneNode = $(dom).clone(true);
            cloneNode.attr("transform",matrix);
            $(dom).after(cloneNode)
        }
    })
    return this;
}
$.fn.getOffsetMouse = function(e,target){
    var clientX,clientY;
    if(this.length === 0 ) return;
    if(typeof targe === 'undefined') {
        target = this.closest('svg');
    }
    target = $(target)[0];
    var rect = target.getBoundingClientRect();
    var {top,left} = rect;
    if(/touch/gi.test(e.type)) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    return {
        x:clientX - left,
        y:clientY - top
    }
}







































































