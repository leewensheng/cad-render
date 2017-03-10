import cad from './core.js'
import Path from './path'
import Point from './point'
import Line  from './line'
import Paper from './paper'
import namespace from './namespace'
import browser from './browser'
import transition from './animation'
import Color from './color'
import interpolate from './interpolate'

import './paper_extend'
import './layer'
import './path_extend'
import './shape'
import './def.js'
import './color/index'
import './sample'
import  './block'
import './math'
cad.extend({
	  transition:transition,
    Point:Point,
    Line:Line,
    Path:Path,
    Paper:Paper,
    namespace:namespace,
    browser:browser,
    init:function(el,option){
        return new this.Paper(el,option);
    }
})
cad.extend({
   rgb:function(r,g,b){
        var arr = [r,g,b];
        return "rgb(" + arr.join(",") +")";
   },
   hsl:function(h,s,l){
    var color =  new Color({h:h,s:s,l:l}).toHex();
    return color;
   },
   darken:function(color,ration) {
        return  new Color(color).darken(ration);
   },
   brighten:function(color,ration) {
        return  new Color(color).brighten(ration);
   },
   Color:Color
})
cad.extend(interpolate);
module.exports = cad;
window.cad = cad;