import colorName from './color-name'
import cad from '../core'
function Color(color){
	return this.init(color);
}
Color.hslToRgb = function(h, s, l) {
    var r, g, b;
    h /= 360;
    if(s == 0){
        r = g = b = l; 
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
Color.rgbToHsl = function(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; 
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h*360, s, l];
}
Color.getColorByStr = function(str){
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		str = str.replace( rtrim, "" );
		var r,g,b,a=1,color;
		var regHex = /\#([0-9a-f]{3})|([0-9a-f]{6})$/gi;
		var regRgb = /rgba?\(.*\)$/gi;
		var regHsl = /hsla?\(.*\)$/gi;
		if(colorName[str]) {
			color = colorName[str];
			r = color[0];
			g = color[1];
			b = color[2];
		} else if(regHex.test(str)) {
			var rgb = [];
			if(str.length==4) {
				var hex = str.replace("#","");
				for(var i =0;i < hex.length;i++) {
					rgb.push(parseInt(hex[i] + hex[i],16));
				}
			} else {
				var hex = str.replace("#","").match(/\w{2}/gi);
				rgb = hex.map(function(val){
					return parseInt(val,16);
				})
			}
			r = rgb[0];
			g = rgb[1];
			b = rgb[2];
		} else if(regRgb.test(str)) {
			var rgba = getArgs(str);
			r = rgba[0] || 0;
			g = rgba[1] || 0;
			b = rgba[2] || 0;
			a = rgba[3] || 1;

		} else if(regHsl.test(str)) {
			var hsla  = getArgs(str);
			var rgb =  Color.hslToRgb(hsla[0],hsla[1],hsla[2]);
			r = rgb[0];
			g = rgb[1];
			b = rgb[2];
			a = hsla[3] || 1;
		} else {
			return false;
		}
		function getArgs(str){
			var str = str.match(/\([^\)]*\)/gi)[0].replace('(','').replace(')','');
	        str = $.trim(str);
	        return str.split(/[\s,]+/gi).map(function(val){
	        	if(/%/gi.test(val)) {
	        		return parseFloat(val)/100;
	        	};
	            return parseFloat(val);
	        })
		}
		return {
			r:r,
			g:g,
			b:b,
			a:a
		}
}
Color.prototype = {
	constructor:Color,
	toRgbObj:function() {
		var r,g,b,a;
		r = this.r,g = this.g,b = this.b,a = this.a;
		return {
			r:r,
			g:g,
			b:b,
			a:a
		}
	},
	toHslObj:function(){
		var r,g,b,a;
		r = this.r,g = this.g,b = this.b,a = this.a;
		var hsl = this.constructor.rgbToHsl(r,g,b);
		return {
			h:hsl[0],
			s:hsl[1],
			l:hsl[2],
			a:a
		}
	},
	toRgbArray:function(){
		var r,g,b,a;
		r = this.r,g = this.g,b = this.b,a = this.a;
		return [r,g,b,a];
	},
	toHex:function(){
		var r,g,b,a;
		r = this.r,g = this.g,b = this.b,a = this.a;
		r = r.toString(16);
		g = g.toString(16);
		b = b.toString(16);
		var rgb  = [r,g,b].map(function(val){
			if(val.length == 1) {
				val = '0' + val;
			}
			return val;
		})
		return "#" + rgb.join("");
	},
	toRgb:function(){
		var r,g,b,a;
		r = this.r,g = this.g,b = this.b,a = this.a;
		if(a==1) {
			return 'rgb('+[r,g,b].join(',') + ')';
		} else {
			return 'rgba('+[r,g,b,a].join(',') + ')';
		}
	},
	toHsl:function(){
		var r,g,b,a;
		r = this.r,g = this.g,b = this.b,a = this.a;
		var hsl = this.constructor.rgbToHsl(r,g,b);
		var h = hsl[0];
		var s = hsl[1]*100 + '%';
		var l = hsl[2]*100 +'%';
		return 'hsl(' +[h,s,l].join(',') + ')';
	},
	init:function() {
		var color;
		if(arguments.length == 1) {
			color = arguments[0];
		}
		var r,g,b,a=1;
		if(typeof color == undefined) {
			r = g = b = 0;
		} else if(typeof color == 'string') {
			var rgba = this.constructor.getColorByStr(color);
			r = rgba.r || 0;
			g = rgba.g || 0;
			b = rgba.b || 0;
			a = rgba.a || 1;
		} else if(typeof color == 'object') {
			if(color instanceof Array) {
				var r = color[0]||0;
				var g = color[1]||0;
				var b = color[2]||0;
				var a = color[3]||1;
			} else {
				if(typeof color.r !== 'undefined') {
					r = color.r;
					g = color.g;
					b = color.b;
					a = color.a||1;
				} else if(typeof color.h !== 'undefined') {
					var h = color.h;
					var s = color.s;
					var l = color.l;
					var rgb = this.constructor.hslToRgb(h,s,l);
					r = rgb[0];
					g = rgb[1];
					b = rgb[2];
					a = color.a || 1;
				}
			}
		}
		this.r = Math.round(r);
		this.g = Math.round(g);
		this.b = Math.round(b);
		this.a = a;
		return this;
	},
	darken:function(ration) {
		var hsl = this.toHslObj();
		var h,s,l;
		h = hsl.h,s=hsl.s,l = hsl.l;
		l = (1-ration)*l;
		var rgb = this.constructor.hslToRgb(h,s,l);
		this.r = rgb[0];
		this.g = rgb[1];
		this.b = rgb[2];
		return this.toRgb();
	},
	brighten:function(ration) {
		var hsl = this.toHslObj();
		var h,s,l;
		h = hsl.h,s=hsl.s,l = hsl.l;
		l = (1+ration)*l;
		var rgb = this.constructor.hslToRgb(h,s,l);
		this.r = rgb[0];
		this.g = rgb[1];
		this.b = rgb[2];
		return this.toRgb();
	}
}
module.exports = Color;
