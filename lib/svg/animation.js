import ease from './tween.js'
import './requestAnimationFrame.js'
var 
Animation = {
    ease:ease,
    isTick:false,
    animations:[],
    timer_id:null,
    startTick:function(){
        if(this.isTick) {
            return;
        }
        this.isTick = true;
        this.timer_id = window.requestAnimationFrame(this.tick.bind(this));
    },
    isAnimating(target){
        return this.animations.some(function(value){
            return value.queue.length > 0;
        })
    },
    stopAnimation:function(){
        if(arguments.length === 0) {
            this.animations = [];
            if(this.isTick) {
                window.cancelAnimationFrame(this.timer_id);
            }
            this.isTick = false;
            this.timer_id = null;
            return;
        }
        var target = arguments[0];
        var animations = this.animations;
        for(var i = 0;i <animations.length;i++) {
            if(animations[i].target === target) {
                animations.splice(i,1);
                return;
            }
        }
    },
    getEaseByName(name){
        name = name.toLowerCase();
        /*http://blog.sina.com.cn/s/blog_70a3539f0102v8az.html*/
        var tween = this.ease;
        switch(name) {
            case 'linear':
                return tween.Linear;
            case 'ease' :
                return tween.Quad.easeInOut;
            case 'easein' : 
                return tween.Quad.easeIn;
            case 'easeout' : 
                return tween.Quad.easeOut;
            case 'elastic' :
                return tween.Elastic.easeOut;
            case 'elasticin' :
                return tween.Elastic.easeIn;
            case 'bounce' :
                return tween.Bounce.easeOut;
            default: return tween.Linear;
        }
    },
    tick:function(){
        var animations = this.animations,timestamp = new Date().getTime();
        var queue,callback,during,exefunc,easefun,from,to,value;
        for(var i = 0; i < animations.length;i++) {
            var me = animations[i];
            var target = me.target;
            queue = me.queue[0];
            callback = queue.callback;
            exefunc = queue.exefunc;
            during = queue.during;
            easefun = queue.easefun;
            if(typeof easefun !== "function") {
                easefun  = this.getEaseByName(easefun);
            }
            from = queue.from;
            to = queue.to;
            if(!queue.startTime) {
                queue.startTime = timestamp;
            }
            var dt = timestamp - queue.startTime;
            if(dt >= queue.during) {
                exefunc.call(target,to);
                if(typeof callback== "function") {
                    callback.call(target);
                }
                me.queue.splice(0,1);
            } else {
                var change = to - from;
                value = easefun(dt,from,change,during);
                exefunc.call(target,value);
            }
        }
        var new_anmations = animations.filter(function(val){
            return val.queue.length>0;
        })
        this.animations = new_anmations;
        if(new_anmations.length>0) {
            this.timer_id = window.requestAnimationFrame(this.tick.bind(this));
        } else {
            this.stopAnimation();
        }
    },
    init:function(target,from,to,during,exefunc,easefun,callback){
        if(typeof easefun == "undefined") {
            easefun = this.ease.Linear;
        }
        var  animations = this.animations;
        var index = -1;
        var isInside = animations.some(function(val,key){
            if( val.target === target) {
                index = key
            }
            return val.target === target;
        })
        if(isInside) {
            var cur_obj = animations[index];
            cur_obj.queue.push({
                from:from,
                to:to,
                during:during,
                exefunc:exefunc,
                callback:callback,
                easefun:easefun
            })
        } else {
            animations.push({
                target:target,
                queue:[{
                    from:from,
                    to:to,
                    during:during,
                    exefunc:exefunc,
                    callback:callback,
                    easefun:easefun
                }]
            })
        }
        this.startTick();
    }
}
window.Animation = Animation;
module.exports = Animation;
