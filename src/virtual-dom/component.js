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
                break;
            }
        }
        if(update) {
            patch(node,patches);
            //'did update'
        }
    }
    Component.prototype.setProps = function(nextProps){
        var patches = {};
        this.update(nextProps,null,{index:0},patches);
        this.patch(patches);
    }
    Component.prototype.updateStateQueue = function (nextState,queue) {
        var stateQueue = this.stateQueue;
        for(var i = 0 ;i  < stateQueue.length; i++) {
            utils.extend(true,nextState,stateQueue[i]);
        }
        this.stateQueue = [];
    }
    Component.prototype.update = function(nextProps,nextState,walker,patches){
        this.isUpdating = true;
        var shouldComponentUpdate = true;
        var prevProps = this.props;
        var prevState = this.state;
        var stateQueue = this.stateQueue || [];
        this.stateQueue = stateQueue;
        var hasProps = false;
        if(nextProps) {
            hasProps = true;
        }
        var props = utils.extend(true,{},this.props);
        nextProps = utils.extend(true,props,nextProps);
        var state = utils.extend(true,{},this.state);
        nextState = utils.extend(true,state,nextState);
        if(hasProps) {
            if(this.componentWillReceiveProps) {
                this.componentWillReceiveProps(nextProps);
            }
            this.updateStateQueue(nextState);
        }
        if(this.shouldComponentUpdate) {
            //应当每次更新state
            shouldComponentUpdate = this.shouldComponentUpdate(nextProps,nextState);
            this.updateStateQueue(nextState);
        }
        if(shouldComponentUpdate) {
            if(this.componentWillUpdate) {
                //更新state
                this.componentWillUpdate(nextProps,nextState);
                this.updateStateQueue(nextState)
            }
            this.stateQueue = [];
            var oldTree = this.virtualDOM;
            this.state = nextState;
            this.props = nextProps;
            var newTree = this.render();
            var newtree = diff(oldTree,newTree,walker,patches);
            this.virtualDOM = newTree;
            this.isUpdating = false;
            if(this.componentDidUpdate) {
                var that = this;
                setTimeout(function(){
                    that.componentDidUpdate(prevProps,prevState);
                },0);
            }
            return newTree;
        } else {
            this.props = nextProps;
            this.state = nextState;
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