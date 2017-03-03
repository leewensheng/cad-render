function patch(node,patches) {
    var walker = {index: 0}
      dfsWalk(node, walker, patches)
}
function dfsWalk(node,walker,patches) {
  var currentPatch = patches[walker.index]||[];
  var childNodes = node.childNodes;
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
        if(newNode.isComponent) {
          node.appendChild(newNode.renderReal(react_id));
        } else {
          node.appendChild(newNode.render(react_id));
        }
        break;
      case "removeChild" :
        if(newNode.isComponent) {
          newNode.unmount();
        } else {
          node.removeChild(childNodes[index]);
        }
        break;
      case "replace":
        node.parentNode.replaceChild(node.render(),node);
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
              el.setAttribute(propName, propValue)
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