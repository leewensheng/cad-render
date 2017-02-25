import namespace from '../namespace'
import Style from './style'
module.exports = Element;
function Element(tagName,props,children) {
	this.tagName = tagName;
	this.children = children||[];
	this.props = props||{};
}
Element.prototype = {
	constructor:Element,
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
			if(value!=="") {
				css[name] = value;
			} else {
				delete css[name];
			}
		} else if(arguments.length==0) {
			if(typeof arguments[0] === 'string') {
				name = arguments[0];
				return css[name];
			} else if(typeof arguments[0] === 'object') {
				obj = arguments[0];
				for(var name in obj) {
					css[name] = obj[name];
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
	},
	render(){
	  var el = document.createElementNS(namespace.svg,this.tagName) // 根据tagName构建
	  var xlink = /^xlink/gi;
	  var props = this.props
	  for (var propName in props) { // 设置节点的DOM属性
	    var propValue = props[propName]
	    if(typeof propValue !== 'undefined') {
		    if(!xlink.test(propName)) {
		    	if(propName!=='className') {
		    	 	el.setAttribute(propName, propValue)
		    	} else {
		    		el.setAttribute("class",propName);
		    	}
		    } else {
	            el.setAttributeNS(namespace.xlink,propName,propValue);
	        }	    
    	}

	  }
	  var children = this.children || []
	  children.forEach(function (child) {
	    var childEl = (child instanceof Element)
	      ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
	      : document.createTextNode(child);// 如果字符串，只构建文本节点
	    el.appendChild(childEl)
	  })
	  return el;
	}
}