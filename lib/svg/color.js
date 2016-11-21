import cad from './core'

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
