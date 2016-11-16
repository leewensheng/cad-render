import Paper from './paper'

var Axis = function(){
    this.currentAxis = '';
    this.userAxis = {};
}
Paper.fn.extend({
    switchToDefaultAxis:function(){
        this.currentAxis = '';
    },
    swtichAxis:function(name){
        if(typeof name === 'string') {
            this.currentAxis = this.userAxis[name];
        } else {
            throw new Error("undefined axis name");
        }
    },
    defineAxis:function(name,config) {
        this.userAxis[name] = config;
    }
});
module.exports = Axis;