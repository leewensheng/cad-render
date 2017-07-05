var $$blocks = {};
var $$symbols = {};
module.exports = {
	defineBlock:function(id,callback){
		if(typeof callback=='function') {
			$$blocks[id] = callback;
		}
	},
    defineSymbol:function(id,callback){
        if(typeof callback=='function') {
            $$symbols[id] = callback;
        }
    },
    importBlock:function(){
        var id = arguments[0];
        var args = Array.prototype.slice.call(arguments,1);
        var blocks = $$blocks;
        if(!blocks[id]) {
            return false;
        }
        this.addLayer(id,{},'block');
        this.temporarySwitchLayer(id,function(){
            blocks[id].apply(this,args);
        })
        return this;
    },
    addBlock:function() {
        var id = arguments[0];
        var args = Array.prototype.slice.call(arguments,1);
        var blocks = $$blocks;
        if(!blocks[id]) {
            return false;
        }
        var g = this.g();
        this.temporarySwitchLayer(g,function(){
            blocks[id].apply(this,args);
        });
        return g;
    },
    importSymbol:function(id) {
        var id = arguments[0];
        var args = Array.prototype.slice.call(arguments,1);
        var symbols = $$symbols;
        if(!symbols[id]) {
            return false;
        }
        var symbol = this.addLayer(id,{},'symbol');
        this.temporarySwitchLayer(id,function(){
            symbols[id].apply(this,args);
        })
        return this;
    }
}