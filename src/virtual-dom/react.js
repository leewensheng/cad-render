import createClass from './component'
var React = {
    createClass:createClass,
    render:function(element,parentNode){
        var el;
        componentWillMount(element);
        if(element.isComponent) {
            el  = element.renderReal();
        } else {
            el = element.render();
        };
        parentNode.appendChild(el);
        componentDidMount(element);
    },
    createElement(Com,props){
       var vdom = new Com(props);
       return vdom;
    }
};
function componentWillMount(element){
    if(element.isComponent) {
        if(typeof element.componentWillMount === 'function') {
            element.componentWillMount()
        }
        componentWillMount(element.virtualDOM);
    } else {
        var children = element.children;
        for(var i = 0; i < children.length;i++) {
            if(children[i].isComponent) {
                componentWillMount(children[i]);
            }
        }
    }
}
function componentDidMount(element){
    if(element.isComponent) {
        if(typeof element.componentDidMount === 'function') {
            element.componentDidMount()
        }
        componentDidMount(element.virtualDOM);
    } else {
        var children = element.children;
        for(var i = 0; i < children.length;i++) {
            if(children[i].isComponent) {
                componentDidMount(children[i]);
            }
        }
    }
}
module.exports = React;