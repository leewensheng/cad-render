import $ from 'jquery'
import Animation from './animation'

$.fn.transition = function(){
    var attr,during,ease,callback;
    if(arguments.length==0) {
        return $(this);
    }
    if(arguments.length==1) {
        if(typeof arguments[0] == 'string') {
            var action = arguments[0];
            $(this).each(function(index,dom){
                if(action === 'stop') {
                    animation.stopAnimation(dom);
                } else if(action == 'pause') {

                }
            })
            return this;
        }
    }
    attr = arguments[0];
    during = arguments[1]||400;
    ease = arguments[2]||'easeOut';
    callback = arguments[3];
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
            if(['stroke','fill'].indexOf(name) == -1) {
                from[key] = parseFloat($(dom).attr(name)||defaultAttr[name]||0);
            } else {
                //对颜色的处理
            }
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