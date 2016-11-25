import cad from './core.js'
import Path from './path'
import Point from './point'
import Line  from './line'
import Paper from './paper'
import namespace from './namespace'
import browser from './browser'
import animation from './animation'
import './paper_extend'
import './layer'
import './path_extend'
import './shape'
import './defs'
import './color'
import './interpolate'
import  './block'

cad.extend({
	animation:animation,
    Point:Point,
    Line:Line,
    Path:Path,
    Paper:Paper,
    namespace:namespace,
    browser:browser,
    init:function(option){
        return this.Paper(option);
    }
})
window.cad = cad;
module.exports = cad;