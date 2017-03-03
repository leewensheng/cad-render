function diff (oldTree, newTree) {
  debugger;
  var patches = {};
  var walker =  {index:0};
  dfsWalk(oldTree, newTree, patches,walker)
  return patches
}

function dfsWalk (oldNode, newNode, patches,walker) {
  var currentPatch = [];
  var index = walker.index;
 if(oldNode.tagName === newNode.tagName) {
    var propPatch = diffProps(oldNode,newNode);
    if(propPatch) {
        currentPatch.push({type:"props",props:propPatch});
    }
    var oldLen = oldNode.children.length;
    var newLen = newNode.children.length;
    var maxLen = Math.max(oldLen,newLen);
    for(var i = 0; i < maxLen; i++) {
       if(oldNode.children[i] && newNode.children[i]) {
          walker.index++;
          dfsWalk(oldNode.children[i],newNode.children[i],patches,walker);
       } else if(!oldNode.children[i] && newNode.children[i]) {
          currentPatch.push({
            type:"appendChild",
            node:newNode.children[i]
          })
       } else if(oldNode.children[i] && !newNode.children[i]) {
          currentPatch.push({
            type:"removeChild",
            index:i,
            node:oldNode.children[i]
          })
       }
    }
 } else {
    currentPatch.push({
      type:"replace",
      oldNode:oldNode,
      node:newNode
    })
 }
 if(currentPatch.length > 0) {
  patches[index] = currentPatch;
 }
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
      propsPatches[key] = {
        prev:oldProps[key],
        next:newProps[key]
      }
    }
  }

  // 新增的属性
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = {
        prev:undefined,
        next:newProps[key]
      }
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
