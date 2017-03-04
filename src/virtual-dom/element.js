import namespace from '../namespace'
import Style from './style'
function Element(tagName,props,children) {
	this.tagName = tagName;
	this.children = children||[];
	this.props = props||{};
	this.isMounted = false;
}
Element.getRootId  = function(){
	var rootId = Element.rootId;
	if(typeof rootId === 'undefined') {
		Element.rootId = 0;
		return 0;
	} else {
		rootId++;
		Element.rootId = rootId;
		return rootId;
	}
}
function setProps(el,props) {
	var xlink = /^xlink/gi;
	for (var propName in props) { // 设置节点的DOM属性
	    var propValue = props[propName]
	    if(propValue !== undefined && propValue !== "") {
	    	if(typeof propValue!== 'function') {
			    if(!xlink.test(propName)) {
			    	if(propName!=='className') {
			    		if(propName!=="textContent") {
			    	 		el.setAttribute(propName, propValue)
			    		} else {
                			el.parentNode.textContent = propValue;
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
Element.prototype = {
	constructor:Element,
	on(type,callback){
		var name = 'on'+type;
		this.props[name] = callback;
		return this;
	},
	attr(key,value){
		if(arguments.length === 1) {
			if(typeof key === 'string') {
				return this.props[key];
			} else if(typeof key === 'object') {
				for(var name in key) {
					this.props[name] = key[name];
				}
			}
		} 
		if(arguments.length === 2) {
			this.props[key] = value;
		}
		return this;
	},
	text(text){
		this.children = [new Element("#text",{textContent:text})];
		return this;
	},
	hide(){
		return this.css("display","none");
	},
	show(){
		return this.css("display","");
	},
	fill(color){
		this.props.fill = color;
		return this;
	},
	stroke(strokeColor){
		this.props.stroke = strokeColor;
		return this;
	},
	css(){
		var style = this.props.style || "";
		var css = new Style(style);
		var name,value,obj;
		if(arguments.length==2) {
			name = arguments[0];
			value = arguments[1];
			css.css(name,value);
		} else if(arguments.length==0) {
			if(typeof arguments[0] === 'string') {
				name = arguments[0];
				return css.css(name);
			} else if(typeof arguments[0] === 'object') {
				obj = arguments[0];
				for(var name in obj) {
					css.css(name,obj[name]);
				}
			}
		}
		this.props.style = css.toString();
		return this;		
	},
	append(tagName,props,children){
		if(typeof tagName === 'string') {
			this.children.push({
				tagName:tagName,
				props:props,
				children:children
			});
		} else if(typeof tagName ==='function') {
			this.children.push(tagName(props,children));
		} else if(tagName instanceof Element) {
			this.children.push(tagName);
		}
		return this;
	},
	unmount(){
		var el = this.findDOMNode();
		var props = this.props;
		for(var key in props) {
			if(/^on.*/gi.test(key) && key in document) {
				var eventName = key.replace(/^on/gi,"");
				el.removeEventListener(eventName,props[key]);
			} 
		}
	},
	mount(parentNode,react_id){
		var el = this.renderRealDOM(react_id);
		parentNode.appendChild(el);
		return el;
	},
	renderRealDOM(react_id){
		if(typeof react_id === "undefined") {
			react_id = "."+ Element.getRootId();
		}
		if(!this.isComponent) {
	  		var el = document.createElementNS(namespace.svg,this.tagName) // 根据tagName构建
	  		var props = this.props;
	  		setProps(el,props);

		} else {
			var el = this.renderReal();
		}
		this.react_id = react_id;
		el.setAttribute("data-reactid",react_id);
	  	var children = this.children || [];
	  	children.forEach(function (child,index) {
		  	var childEl;
		  	if(child.isComponent) {
		  		childEl = child.renderRealDOM(react_id+"."+index);
		  	} else if(child.tagName === '#text') {
		  		childEl = document.createTextNode(child.props.textContent);
		  	} else {
		  		childEl = child.renderRealDOM(react_id+"."+index);
		  	}
		  el.appendChild(childEl);
		})
	  	return el;
	},
	findDOMNode(){
		var react_id = this.react_id;
		var el = document.querySelector('[data-reactid="' + react_id + '"]');
		return el;
	},
	patch(node,patches) {
		var walker = {index: 0}
  		dfsWalk(node, walker, patches)
	}
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
		//remove 和 replace之前需删去事件
		//需要兼容两种component
		switch(type) {
			case "props" :
				updateProps(node,props)
				break;
			case "appendChild" :
				node.appendChild(newNode.render())
				break;
			case "removeChild" :
				node.removeChild(childNodes[index]);
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
module.exports = Element;
