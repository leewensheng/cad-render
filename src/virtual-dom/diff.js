function diff (oldTree, newTree) {
  var patches = [];
  var id = "";
  dfsWalk(oldTree, newTree, patches,id)
  return patches
}

function dfsWalk (oldNode, newNode, patches,id) {
  if(oldNode && !newNode) {
    patches.push({
      type:"remove",
      id:id
    })
  } else if(!oldNode && newNode) {
    patches.push({
      type:"add",
      id:id,
      node:newNode
    });
  } else {
     if(oldNode.tagName === newNode.tagName) {
        var propPatch = diffProps(oldNode,newNode);
        if(propPatch) {
            patches.push({
              type:"props",
              props:propPatch,
              id:id,
            });
        }
        var oldLen = oldNode.children.length;
        var newLen = newNode.children.length;
        var maxLen = Math.max(oldLen,newLen);
        for(var i = 0; i < maxLen; i++) {
            dfsWalk(oldNode.children[i],newNode.children[i],patches,id+"."+i);
        }
     } else {
        patches.push({
          type:"replace",
          node:newNode,
          id:id
        })
     }
  };
  return patches;
}
function diffProps (oldNode, newNode) {
  var count = 0
  var oldProps = oldNode.props
  var newProps = newNode.props
  var key, value
  var propsPatches = {}

  // 旧的属性
  for (key in oldProps) {
    value = oldProps[key];
    if (newProps[key] !== value) {
      count++;
      propsPatches[key] = newProps[key];
      if(/^on.*/gi.test(key) && key in document) {
        var eventName = key.replace(/^on/gi,"");
        //移除旧的事件
        oldNode.findDOMNode().removeEventListener(eventName,value);
      }
    }
  }

  // 新增的属性
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = newProps[key]
    }
  }

  // If properties all are identical
  if (count === 0) {
    return null
  }

  return propsPatches
}

function isIgnoreChildren (node) {
  return (node.props && node.props.hasOwnProperty('ignore'))
}
module.exports = diff
