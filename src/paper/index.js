import Paper from './paper'
import {addShape} from '../shape/index'
import {importBlock,addBlock,importSymbol} from '../block/index'
import './layer'
import './paper_extend'

Paper.fn.addShape = addShape;
Paper.fn.importBlock = importBlock;
Paper.fn.addBlock = addBlock;
Paper.fn.importSymbol = importSymbol;
module.exports = Paper;