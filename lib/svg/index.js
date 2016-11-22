import cad from './core.js'
import Path from './path'
import Point from './point'
import Paper from './paper'
import namespace from './namespace'
import browser from './browser'
import './paper_extend'
import './path_extend'
import './shape'
import './defs'
import './color'
import './interpolate'
cad.extend({
    Point:Point,
    Path:Path,
    Paper:Paper,
    namespace:namespace,
    browser:browser,
    init:function(option){
        return this.Paper(option);
    }
})
module.exports = cad;