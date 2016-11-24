import $ from 'jquery'
import Animation from './animation'
window.$ = $;
$.parseTransform = function(transform){
    transform = transform || '';
    var scale = transform.match(/scale\s*\([^\)]*\)/gi);
    var translate = transform.match(/translate\s*\([^\)]*\)/gi);
    var rotate = transform.match(/rotate\s*\([^\)]*\)/gi);
    var ret = {
        scale:1,
        rotate:0,
        rotateX:0,
        rotateY:0,
        transX:0,
        transY:0
        };
    var args;

    if(scale) {
        args = getArgs(scale[0]);
        ret.scale = args[0]||1;
    } 
    if(translate) {
        args = getArgs(translate[0]);
        ret.transX = args[0]||0;
        ret.transY = args[1]||0;
    }
    if(rotate) {
        args = getArgs(rotate[0]);
        ret.rotate = args[0]||0;
        ret.rotateX = args[1]||0;
        ret.rotateY = args[2] || 0;
    }
    function getArgs(str){
        var str = str.match(/\([^\)]*\)/gi)[0].replace('(','').replace(')','');
        str = $.trim(str);
        return str.split(/[\s,]+/gi).map(function(val){
            return parseFloat(val);
        })
    }
    return ret;
}
$.getTransform = function(obj){
    var transX,transY,scale,scaleX,scaleY,rotate,rotateX,rotateY;
    transX = obj.transX || 0;
    transY = obj.transY || 0;
    scale = obj.scale || 1;
    rotate = obj.rotate||0;
    rotateX  = obj.rotateX || 0;
    rotateY = obj.rotateY || 0;
    return 'translate(' + [transX,transY].join(',') +')'
            + 'scale(' + scale +')'
            + 'rotate(' +[rotate,rotateX,rotateY].join(',') + ')';
}
$.fn.transition = function(attr,during,ease,callback){
    //注意color,transform的支持;
    if(arguments.length > 1) {
        $(this).each(function(index,dom){
            var option = {

            };
            var defaultAttr = {
                "stroke-opacity":1,
                "fill-opacity":1
            }
            var from = {};
            var to = attr;
            for(var key in  attr) {
                name = key﻿.replace(/([A-Z])/g,'-$1').toLowerCase();
                //todo color transform的过渡 delay
                if(name === 'transform') {
                    from[key] = $.parseTransform($(dom).attr(name));
                    to[key]= $.parseTransform(attr[key]);
                } else if(name == 'fill' || name == 'stroke') {
                    from[key] = {r:1,g:1,b:1,a:1};
                    to[key] =  {r:1,g:1,b:1,a:1}
                } else {
                    from[key] = parseFloat($(dom).attr(name)||defaultAttr[name]||0);
                    to[key] = attr[key];
                }
            }
            option.target = dom;
            option.from = from;
            option.to = to;
            option.ease = ease;
            option.callback = callback;
            option.during = during;
            option.exefunc = function(tickValue){
                for(var key in tickValue) {
                    name = key﻿.replace(/([A-Z])/g,'-$1').toLowerCase();
                    if(name == 'transform') {
                        $(this).attr('transform',$.getTransform(tickValue.transform));
                    }else if(name == 'fill' || name == 'stroke') {
                        $(this).attr('color',"red");
                    } else {
                        $(this).attr(name,tickValue[key]);
                    }
                }
            }
            Animation.init(option);
        })
    } else {
        $(this).each(function(index,dom){
            var option  = arguments[0];
            if(typeof option == 'string') {
                if(option === 'stop') {
                    Animation.stopAnimation(dom);
                } else if(option == 'pause') {

                } else if(option == 'pop') {
                    
                }
                //支持暂停，取消动画，或出栈
            } else if(typeof option == 'object') {
                option.target = dom;
                Animation.init(dom,option);
            }
        })
    }
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
$.fn.scale = function(scale,cx,cy){
    scale = scale || 0;
    cx = cx || 0;
    cy = cy || 0;
    this.each(function(index,dom){
        var transform = $(dom).attr('transform')||'';
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
        var transform = $(dom).attr('transform')||'';
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
        var transform = $(dom).attr('transform')||'';
        var obj = $.parseTransform(transform);
        obj.rotate = angle;
        obj.rotateX = cx;
        obj.rotateY = cy;
        var str = $.getTransform(obj);
        $(dom).attr('transform',str);
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
    if(z>0&&nextSibling.length==0) {
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










































































