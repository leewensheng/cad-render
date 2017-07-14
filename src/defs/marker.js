module.exports = {
    triangle:function(option) {
        option = option ||{};
        var paper = this;
        var $defs = paper.$defs;
        var marker = paper.createSVGElement("marker",{
            id:"triangle",
            viewBox:"0,0,10,10",
            refX:1,
            refY:5,
            markerWidth:6,
            markerHeight:6,
            orient:"auto",
            fill:option.fill
        });
        var path = paper.createSVGElement("path").attr("d","M 0 0 L 10 5 L 0 10 z");
        path.appendTo(marker);
        marker.appendTo($defs);
        return marker;
    }
}