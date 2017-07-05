import Paper from './paper'
import {addShape} from '../shape/index'
import {importBlock,addBlock,importSymbol} from '../block/index'
import {importDefs,createRadialGradient,createLinearGradient} from '../defs/index'

import './layer'
import './paper_extend'
Paper.fn.addShape = addShape;
Paper.fn.importBlock = importBlock;
Paper.fn.addBlock = addBlock;
Paper.fn.importSymbol = importSymbol;
Paper.fn.extend({importDefs,createRadialGradient,createLinearGradient});
module.exports = Paper;