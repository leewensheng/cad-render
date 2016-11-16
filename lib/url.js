(function(){
function Url(url){
return new Url.prototype.init(url);
}
Url.prototype = {
    init:function(url){
        var a = document.createElement('a');
        a.href = url;
        this.source = url||'';
        this.protocol =  a.protocol.replace(':','');
        this.host = a.hostname;
        this.query = a.search;
        this.params = (function(){  
                         var ret = {},  
                             seg = a.search.replace(/^\?/,'').split('&'),  
                             len = seg.length, i = 0, s;  
                         for (;i<len;i++) {  
                             if (!seg[i]) { continue; }  
                             s = seg[i].split('=');  
                             ret[s[0]] = s[1];  
                         }  
                         return ret;  
                     })();
        this.file = (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1];
        this.hash = a.hash.replace("#","");
        this.path =  a.pathname.replace(/^([^\/])/,'/$1');
        this.relative = (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1];
        this.segments = a.pathname.replace(/^\//,'').split('/');
        return this;
    },
    set:function(){
        var src  = this.source,
            baseUrl = src.replace(/\?.*/gi,''),
            params = this.params,
            hash = this.hash,
            arg1,arg2,
            paramsArr = [],
            new_url;
        if(arguments.length==1&&typeof arguments[0] === 'object') {
            arg1 = arguments[0];
            for(var key in arg1) {
                params[key] = arg1[key];
            }

        } else if(arguments.length==2) {
            arg1 = arguments[0];
            arg2 = arguments[1];
            params[arg1] = arg2
        }
        for(var name in params) {
           paramsArr.push(name+"="+params[name]);
        }
        new_url = baseUrl   + (paramsArr.length>0?'?':'') 
                            + paramsArr.join("&")
                            + (this.hash?'#'+this.hash:'');
        return this.init(new_url).toString();
    },
    get:function(name){
        return this.params[name];
    },
    toString:function(){
        var baseUrl = this.source.replace(/\?.*/gi,'');
        var params = this.params;
        var hash = this.hash;
        var paramsArr = [];
        for(var name in params) {
           paramsArr.push(name+"="+params[name]);
        }
        var new_url = baseUrl   + (paramsArr.length>0?'?':'') 
                            + paramsArr.join("&")
                            + (hash ? '#'+ hash : '');
        return new_url;
    }
}
Url.prototype.init.prototype = Url.prototype;
if(typeof define === "function") {
    define(function() {
        return Url;
    })
} else {
    if(typeof exports !== "undefined") {
        module.exports = Url;
    }
}
window.Url = Url
})();