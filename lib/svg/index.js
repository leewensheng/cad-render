import cad from './core.js'
import Path from './path'
import Point from './point'
import Paper from './paper'
import './path_extend'
import './shape'
import './filter'

cad.extend({
    Point:Point,
    Path:Path,
    Paper:Paper,
    init:function(option){
        return new Paper(option);
    }
})
cad.extend({
   rgb:function(r,g,b){
        var arr = [r,g,b];
        return "rgb(" + arr.join(",") +")";
   },
   hsl:function(h,s,l){
         var arr = [h,s+"%",l+"%"];
        return "hsl(" + arr.join(",") +")";
   }
})
module.exports = cad;