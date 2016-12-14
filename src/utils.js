import $ from 'jquery'
import browser from './browser.js'
//$ to trim
var utils = {

};
utils.parseTransform = function(transform){
    transform = transform || '';
    var scale = transform.match(/scale\s*\([^\)]*\)/gi);
    var translate = transform.match(/translate\s*\([^\)]*\)/gi);
    var rotate = transform.match(/rotate\s*\([^\)]*\)/gi);
    var skewX = transform.match(/skewX\s*\([^\)]*\)/gi);
    var skewY = transform.match(/skewY\s*\([^\)]*\)/gi);
    var ret = {
        scale:1,
        rotate:0,
        rotateX:0,
        rotateY:0,
        transX:0,
        transY:0,
        skewX:0,
        skewY:0
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
    if(skewX) {
        args = getArgs(skewX[0]);
        ret.skewX = args[0];
    }
    if(skewY) {
        args = getArgs(skewY[0]);
        ret.skewY = args[0];
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
utils.getTransform = function(obj){
    var transX,transY,scale,scaleX,scaleY,rotate,rotateX,rotateY,skewX,skewY;
    transX = obj.transX || 0;
    transY = obj.transY || 0;
    scale = obj.scale || 1;
    rotate = obj.rotate||0;
    if(Math.abs(rotate)<0.81024&&browser.msie) {
        if(rotate>=0) {
            rotate = 0.81024;
        } else {
            rotate = -0.81024;
        }
    }
    rotateX  = obj.rotateX || 0;
    rotateY = obj.rotateY || 0;
    skewX = obj.skewX ||0;
    skewY = obj.skewY || 0;
    return 'translate(' + [transX,transY].join(',') +')'
            + 'scale(' + scale +')'
            + 'rotate(' +[rotate,rotateX,rotateY].join(',') + ')' 
            + 'skewX(' +skewX+')'
            + 'skewY(' + skewY + ')';
}
utils.isTransform = function(transform) {
    if(transform === '') {
        return true;
    }
    var scale = transform.match(/scale\s*\([^\)]*\)/gi);
    var translate = transform.match(/translate\s*\([^\)]*\)/gi);
    var rotate = transform.match(/rotate\s*\([^\)]*\)/gi);
    var skewX = transform.match(/skewX\s*\([^\)]*\)/gi);
    var skewY = transform.match(/skewY\s*\([^\)]*\)/gi);
    if(scale ||translate||rotate ||skewX||skewY) {
        return true;
    }
}
module.exports = utils;