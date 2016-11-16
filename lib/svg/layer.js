import Paper from './paper'

Paper.extend(Paper,{
    default_layer:{
        id:"default_layer",
        fill:"none",
        stroke:"#000",
        strokeWidth: "1"
    }
})
Paper.fn.extend({
    currentLayer:null,
    layers:{},
    addLayer:function(id,config){
        this.layers[id] = config;
    },
    removeLayer:function(id){
        delete this.layers[id];
    },
    hideLayer:function(id){

    },
    showLayer:function(id) {

    },
    toggleLayer:function(id,isShow){

    },
    switchLayer:function(id){
        this.currentLayer = layers[id];
    },
    switchToDefaultLayer:function() {
        this.currentLayer = null;
    }
});