var helper = function(option){
    return new ClassName.prototype.init(option);
}
var  ClassName = function (){

}
ClassName.prototype = {
    constructor:ClassName,
    init:function() {
        var className = [];
        if(arguments.length>1) {
            for(var i =0; i < arguments.length; i++) {
                className.push(arguments[i]);
            }
        } else if(arguments.length == 1) {
            var obj = arguments[0];
            if(typeof obj == "string") {
                var name = obj.split(/\s*/gi);
                for(var i = 0; i <name.length;i++) {
                    className.push(name[i]);
                }
            } else if(typeof obj == "object" ) {
                if(obj instanceof Array) {
                    for(var i = 0; i < obj.length;i++) {
                        className.push(obj[i]);
                    }                
                } else {
                    for(key in obj) {
                        if(obj[key]==true) {
                            className.push(key);
                        } 
                    }
                }
                
            } 
        }
        this.className = [];
        return this;
    },
    addClass(name){
        if(!this.hasClass(name)) {
            this.className.push(name);
        }
        return this;
    },
    removeClass(name){
        var className = this.className;
        var index = className.indexOf(name);
        if(name!=-1) {
            className.splice(index,1);
        }
        this.className = className;
        return this;
    },
    hasClass(name) {
        return this.className.indexOf(name)!=-1
    },
    toggleClass(name){
        if(this.hasClass(name)) {
            this.removeClass(name);
        } else {
            this.addClass(name);
        }
        return this;
    },
    toString(){
        return this.className.join(" ");
    }
}
ClassName.prototype.init.prototype  = ClassName.prototype;
module.exports = helper;