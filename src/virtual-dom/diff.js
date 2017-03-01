function diff (oldTree, newTree) {
  var patches = [];
  var deep = 0;
  dfsWalk(oldTree, newTree, patches,deep)
  return patches
}

function dfsWalk (oldNode, newNode, patches,deep) {
  if(oldNode && !newNode) {
    patches.push({
      type:"remove",
    })
  } else if(!oldNode && newNode) {
    patches.push({
      type:"add",
      node:newNode
    });
  } else {
     if(oldNode.tagName === newNode.tagName) {
        var propPatch = diffProps(oldNode,newNode);
        if(propPatch) {
            patches.push({
              type:"props",
              props:propPatch,
              prevProps:oldNode.props
            });
        }
        var oldLen = oldNode.children.length;
        var newLen = newNode.children.length;
        var maxLen = Math.max(oldLen,newLen);
        for(var i = 0; i < maxLen; i++) {
            dfsWalk(oldNode.children[i],newNode.children[i],patches,deep+1);
        }
     } else {
        patches.push({
          type:"replace",
          node:newNode
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

  // Find out different properties
  for (key in oldProps) {
    value = oldProps[key]
    if (newProps[key] !== value) {
      count++
      propsPatches[key] = newProps[key]
    }
  }

  // Find out new property
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
