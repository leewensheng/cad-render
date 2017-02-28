import namespace from '../namespace'
import Style from './style'
module.exports = Element;
function Element(tagName,props,children) {
	this.tagName = tagName;
	this.children = children||[];
	this.props = props||{};
	this.refs = {};
	this.isMounted = false;
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
		this.children = [String(text)];
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
	renderTo(container){
		var el = this.render();
		container.appendChild(el);
		return el;
	},
	render(root,parent_id){
	  if(typeof parent_id === 'undefined') {
	  	parent_id = "";
	  }
	  var el = document.createElementNS(namespace.svg,this.tagName) // 根据tagName构建
	  if(typeof root=== 'undefined') {
	  	root = this;
	  };
	  this.root = this;
	  el.setAttribute("data-reactid",parent_id);
	  var xlink = /^xlink/gi;
	  var props = this.props;
	  var regEvent = /^on.*/gi;
	  for (var propName in props) { // 设置节点的DOM属性
	    var propValue = props[propName]
	    if(typeof propValue !== 'undefined') {
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
		     	if(propName in document) {
		     		var eventName = propName.replace(/^on/gi,"");
		     		el.addEventListener(eventName,propValue);
		     	}
		     }	    
    	}

	  }
	  var children = this.children || [];
	  children.forEach(function (child,index) {
	    var childEl = (child instanceof Element)
	      ? child.render(root,parent_id+"."+index) // 如果子节点也是虚拟DOM，递归构建DOM节点
	      : document.createTextNode(child);// 如果字符串，只构建文本节点
	    el.appendChild(childEl)
	  })
	  return el;
	}
}