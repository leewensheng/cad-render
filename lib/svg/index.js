import Animation from './animation'
import Path from './path'
import Paper from './paper'
import './layer'
import './axis'
var CAD = {
    Path:Path,
    init:function(option){
        return new Paper(option);
    }
}

module.exports = CAD;