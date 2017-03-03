import Element from './element'
import utils from '../utils'
import diff from './diff'
import patch from './patch'
function createClass(spec){
    var Component = function(props) {
        this.props = props;
        var initialState = null;
        if(this.getInitialState) {
            initialState = this.getInitialState();
        }
        this.state = initialState;
        this.props = props;
        this.virtualDOM = null;
        if(this.getDefaultProps) {
            this.props = utils.extend(true,this.getDefaultProps(),props);
        };
        this.virtualDOM= this.render();
        return this;
    };
    Component.prototype = new Element();
    Component.prototype.isComponent = true;
    Component.prototype.constructor = Component;
    Component.prototype.unmount = function(){
        var virtualDOM = this.virtualDOM;
        componentWillMount(this);
    }
    Component.prototype.mount = function(parentNode,react_id){
        var virtualDOM = this.virtualDOM;
        componentWillMount(this);
        var el = this.renderRealDOM(react_id);
        parentNode.appendChild(el);
        componentDidMount(this);
        return this;
    }
    Component.prototype.renderRealDOM = function(react_id){
        return this.virtualDOM.renderRealDOM(react_id);
    }
    Component.prototype.setState = function(nextState){
        this.stateQueue = this.stateQueue || [];
        this.stateQueue.push(nextState);
        if(!this.isUpdating) {
            var patches = {};
            this.update(null,nextState,{index:0},patches);
            this.patch(patches);
        }
    }
    Component.prototype.patch = function(patches){
        var node = this.findDOMNode();
        var update = false;
        for(var key in patches) {
            if(patches.hasOwnProperty(key)) {
                update = true;
            }
        }
        if(update) {
            patch(node,patches);
            //'did update'
        } else {
            console.log("no update");
        }
    }
    Component.prototype.setProps = function(nextProps){
        var patches = {};
        this.update(nextProps,null,{index:0},patches);
        this.patch(patches);
    }
    Component.prototype.update = function(nextProps,nextState,walker,patches){
        this.isUpdating = true;
        var shouldComponentUpdate = true;
        var prevProps = this.props;
        var prevState = this.state;
        var stateQueue = this.stateQueue || [];
        this.stateQueue = stateQueue;
        stateQueue.push(prevState);
        stateQueue.push(nextState);
        if(nextProps) {
            var props = utils.extend(true,{},this.props);
            nextProps = utils.extend(true,props,nextProps);
        } 
        if(!nextState && nextProps) {
            if(this.componentWillReceiveProps) {
                this.componentWillReceiveProps(nextProps);
            }
        }
        if(this.shouldComponentUpdate) {
            //应当每次更新state
            shouldComponentUpdate = this.shouldComponentUpdate(nextState,nextProps);
        }
        if(shouldComponentUpdate) {
            if(this.componentWillUpdate) {
                //更新state
                this.componentWillUpdate(nextState,nextProps);
            }
            //最后一次更新state
            nextState = {};
            for(var i = 0 ;i  < stateQueue.length; i++) {
                nextState = utils.extend(true,nextState,stateQueue[i]);
            }
            this.stateQueue = [];
            var oldTree = this.virtualDOM;
            this.state = nextState;
            this.props = nextProps;
            var newTree = this.render();
            var newtree = diff(oldTree,newTree,walker,patches);
            this.virtualDOM = newTree;
            this.isUpdating = false;
            return newTree;
        }
        this.isUpdating = false;
    },
    Component.prototype.findDOMNode = function(){
        return this.virtualDOM.findDOMNode();
    }
    utils.extend(Component.prototype,spec);
    return Component;
}
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
function componentWillUnmount(element){
    if(element.isComponent) {
        if(typeof element.componentWillUnmount === 'function') {
            element.componentWillUnmount()
        }
        componentWillUnmount(element.virtualDOM);
    } else {
        element.unmount();
        var children = element.children;
        for(var i = 0; i < children.length;i++) {
            if(children[i].isComponent) {
                componentWillUnmount(children[i]);
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
module.exports = createClass;