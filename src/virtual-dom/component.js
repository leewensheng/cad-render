import Element from './element'
import {extend} from '../utils'
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
            this.props = extend(true,this.getDefaultProps(),props);
        };
        this.virtualDOM= this.render();
    };
    Component.prototype = new Element();
    Component.prototype.isComponent = true;
    Component.prototype.constructor = Component;
    Component.prototype.renderReal = function(react_id){
        if(!this.virtualDOM.isComponent) {
            return this.virtualDOM.render(react_id);
        } else {
            return this.virtualDOM.renderReal(react_id);
        }
    }
    Component.prototype.unmount = function(){
        
    }
    Component.prototype.setState = function(nextState){
        this.stateQueue = this.stateQueue || [];
        this.stateQueue.push(nextState);
        var patches = {};
        this.update(null,nextState,{index:0},patches);
        this.patch(patches);
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
            this.componentDidUpdate();
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
        var shouldComponentUpdate = true;
        var prevProps = this.props;
        var prevState = this.state;
        if(this.getDefaultProps && nextProps) {
            nextProps = extend(true,this.getDefaultProps(),nextProps);
        } 
        if(!nextState && nextProps) {
            if(this.componentWillReceiveProps) {
                this.componentWillReceiveProps(nextProps);
            }
        }
        if(this.shouldComponentUpdate) {
            shouldComponentUpdate = this.shouldComponentUpdate();
        }
        if(shouldComponentUpdate) {
            if(this.componentWillUpdate) {
                this.componentWillUpdate(nextState,nextProps);
            }
            var stateQueue = this.stateQueue || [];
            for(var i = 0 ;i  < stateQueue.length; i++) {
                nextState = extend(true,nextState,stateQueue[i]);
            }
            this.stateQueue = [];
            var oldTree = this.virtualDOM;
            this.state = nextState;
            this.props = nextProps;
            var newTree = this.render();
            diff(oldTree,newTree,walker,patches);
            return newTree;
        }
    },
    Component.prototype.findDOMNode = function(){
        if(!this.virtualDOM.isComponent) {
            return this.virtualDOM.findDOMNode();
        } else {
            return this.virtualDOM.findDOMNode();
        }
    }
    extend(Component.prototype,spec);
    return Component;
}
module.exports = createClass;