//https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
var attrs  =["accent-height","alignment-baseline","arabic-form","baseline-shift","cap-height","clip-path","clip-rule","color-interpolation","interpolation-filters","color-profile","color-rendering","dominant-baseline","enable-background","fill-opacity","fill-rule","flood-color","flood-opacity","font-family","font-size","size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-name","orientation-horizontal","orientation-vertical","adv-x","origin-x","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","overline-position","overline-thickness","panose-1","paint-order","pointer-events","rendering-intent","shape-rendering","stop-color","stop-opacity","strikethrough-position","strikethrough-thickness","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","underline-position","underline-thickness","unicode-bidi","unicode-range","per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","adv-y","origin-x","origin-y","word-spacing","writing-mode","x-height"];
var obj = {};
attrs.forEach(function(val){
    var key = val.replace(/-(\w)/gi,function($0,$1){
        return $1.toUpperCase();
    })
    obj[key] = val;
})
module.exports = obj;