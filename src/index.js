import React from 'react'
import ReactDOM from 'react-dom'
import "./test.css"
import "./index.css"
import $ from 'jquery'
import cad from '../lib/svg'
import Performance from './performance'
import Arrow from './arrow'
import Main from  './main'
import Disappear from './disappearing'
import Pie from './chart'
window.cad = cad;
window.React = React;
window.ReactDOM = ReactDOM;

function drop(target){
    target.revert();
   var el = ReactDOM.findDOMNode(target)
   var me = ReactDOM.findDOMNode(this);
   $(me).append($(el).get(0).cloneNode(true));
}
ReactDOM.render(<Main />,document.getElementById("root"))