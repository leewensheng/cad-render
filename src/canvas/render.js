var eventTarget = null;
function render(vnode,canvas,event) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(canvas.width,canvas.height);
    renderToCanvas(vnode,ctx,event);
}
function renderToCanvas(vnode,ctx,event) {
    if(typeof vnode.nodeName === "string") {
        renderElement(vnode.nodeName,ctx,event);
    } else if(typeof vnode.nodeName === "function") {

    }
}
function renderElement(type,ctx,event){
    ctx.beginPa
}