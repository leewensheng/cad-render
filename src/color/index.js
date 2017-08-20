import Color from './core'
module.exports = 
{
   rgb:function(r,g,b){
        var arr = [r,g,b];
        return "rgb(" + arr.join(",") +")";
   },
   hsl:function(h,s,l){
    var color =  new Color({h:h,s:s,l:l}).toHex();
    return color;
   },
   darken:function(color,ration) {
        if(!Color.parse(color)) {
          return color;
        }
        return  new Color(color).darken(ration);
   },
   brighten:function(color,ration) {
       if(!Color.parse(color)) {
          return color;
      }
        return  new Color(color).brighten(ration);
   },
   Color:Color
}