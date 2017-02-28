import $ from 'jquery'
//$ to trim
var utils = {

};
function isPlainObject(obj) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well

    var class2type = {};

    var hasOwn = class2type.hasOwnProperty;

    if (!obj || typeof obj !== 'object' || obj.nodeType || (obj!=null&&obj == obj.window)) {
        return false;
    }

    try {
        // Not own constructor property must be Object
        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
    } catch(e) {
        // IE8,9 Will throw exceptions on certain host objects #9897
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    var key;
    for (key in obj) {}

    return key === undefined || hasOwn.call(obj, key);
}
utils.parseTransform = function(transform){
    transform = transform || '';
    var scale = transform.match(/scale\s*\([^\)]*\)/gi);
    var translate = transform.match(/translate\s*\([^\)]*\)/gi);
    var rotate = transform.match(/rotate\s*\([^\)]*\)/gi);
    var skewX = transform.match(/skewX\s*\([^\)]*\)/gi);
    var skewY = transform.match(/skewY\s*\([^\)]*\)/gi);
    var ret = {
        scaleX:1,
        scaleY:1,
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
        if(args.length<=1) {
            ret.scaleX = args[0] || 1;
            ret.scaleY = args[0] || 1;
        }
        if(args.length==2) {
            ret.scaleX = args[0];
            ret.scaleY = args[1];
        }
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
    scaleX = obj.scaleX || 1;
    scaleY = obj.scaleY || 1;
    rotate = obj.rotate||0;
    rotateX  = obj.rotateX || 0;
    rotateY = obj.rotateY || 0;
    skewX = obj.skewX ||0;
    skewY = obj.skewY || 0;
    var scale = scaleX;
    if(scaleX!=scaleY) {
        scale  = scaleX + ',' + scaleY;
    }
    var ret = 'translate(' + [transX,transY].join(',') +')'
                + 'scale(' + scale +')'
                + 'rotate(' +[rotate,rotateX,rotateY].join(',') + ')'
                + 'skewX(' +skewX+')'
                + 'skewY(' + skewY + ')';
    return ret;
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
utils.dataUrlToBlob = function (dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
};
utils.blobToDataURL = function(blob,callback){
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob); 
};
utils.trim = function(str) {
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    return str&&str.replace( rtrim, "" );
}
utils.extend = function(){
    var isArray = Array.isArray;
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;

        // Skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && typeof target!== 'function') {
        target = {};
    }

    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && isArray(src) ? src : [];
                        var len = copy.length;
                        clone.splice(len);
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = this.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};
module.exports = utils;