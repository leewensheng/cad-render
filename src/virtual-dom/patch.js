function patch(node,patches) {
    var walker = {index: 0}
    dfsWalk(node, walker, patches)
}
function dfsWalk(node,walker,patches) {
  var currentPatch = patches[walker.index]||[];
  if(!node) {
    return;
  }
  var childNodes = (node && node.childNodes)||[];
  var len = childNodes.length;
  for(var i = 0; i < currentPatch.length;i++) {
    var type = currentPatch[i].type;
    var newNode = currentPatch[i].node;
    var props = currentPatch[i].props;
    var index = currentPatch[i].index;
    var react_id = currentPatch[i].react_id;
    var oldNode = currentPatch[i].oldNode;
    //remove 和 replace之前需删去事件
    //注意挂载勾子
    switch(type) {
      case "props" :
        updateProps(node,props)
        break;
      case "appendChild" :
        newNode.mount(node,react_id);
        break;
      case "removeChild" ://移除旧的node
        oldNode.unmount();
        node.removeChild(childNodes[index]);
        break;
      case "replace":
        oldNode.unmount();
        var el = newNode.mount(node.parentNode,react_id);
        node.parentNode.replaceChild(el,node);
        break;
      default:;
    }
  }
  for(var i = 0; i < len;i++) {
    walker.index++;
    dfsWalk(childNodes[i],walker,patches)
  }
}
function updateProps(node,props) {
  var newProps = {};
  for(var key in props) {
    newProps[key] = props[key]["next"];
    if(/^on.*/gi.test(key) && key in document) {
        var eventName = key.replace(/^on/gi,"");
        node.removeEventListener(eventName,props[key]["prev"]);
    }
  }
  setProps(node,newProps);
}
function setProps(el,props) {
  var xlink = /^xlink/gi;
  for (var propName in props) { // 设置节点的DOM属性
      var propValue = props[propName]
      if(propValue !== undefined || propValue !== "") {
        if(typeof propValue!== 'function') {
          if(!xlink.test(propName)) {
            if(propName!=='className') {
              if(el.nodeType!==3) {
                el.setAttribute(propName, propValue)
              } else {
                if(propName ==="textContent") {
                  el.parentNode.textContent = propValue;
                }
              }
            } else {
              el.setAttribute("class",propValue);
            }
          } else {
                el.setAttributeNS(namespace.xlink,propName,propValue);
            }
         } else {
          if(/^on.*/gi.test(propName) && propName in document) {
            var eventName = propName.replace(/^on/gi,"");
            el.addEventListener(eventName,propValue);
          }
         }      
      } else {
        el.removeAttribute("propName");
      }

   }
}
module.exports = patch;