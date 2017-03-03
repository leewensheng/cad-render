import createClass from './component'
import Element from './element'
var React = {
    createClass:createClass,
    render:function(element,parentNode){
        element.mount(parentNode)
    },
    createElement(ReactClass,props){
    	if(typeof ReactClass === "function") {
       		return new ReactClass(props);
    	} else if(typeof ReactClass === "string") {
    		return new Element(ReactClass,props);
    	}
    }
};
module.exports = React;