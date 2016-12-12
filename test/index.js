import React from 'react'
import ReactDOM from 'react-dom'
import "./test.css"
import "./index.css"
import $ from 'jquery'
import cad from '../src/index'


import Performance from './performance'
import Arrow from './arrow'
import Main from  './main'
import Disappear from './disappearing'
import Transform from './transform'
window.cad = cad;
window.React = React;
window.ReactDOM = ReactDOM;

function drop(target){
    target.revert();
   var el = ReactDOM.findDOMNode(target)
   var me = ReactDOM.findDOMNode(this);
   $(me).append($(el).get(0).cloneNode(true));
}
ReactDOM.render(<Disappear />,document.getElementById("root"))