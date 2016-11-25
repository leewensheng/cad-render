import React from 'react'
import ReactDOM from 'react-dom'
import ClassName from '../lib/class-name'
import Draggable from  '../lib/draggable'
import "./test.css"
import Droppable from "../lib/droppable"
import "./index.css"
import $ from 'jquery'
import Sorttable from "../lib/sorttable"
import Animation from "../lib/svg/animation"
import CreateUrl from '../lib/url'
import cad from '../lib/svg'
import Performance from './performance'
import Arrow from './arrow'
import Main from  './main'
import Disappear from './disappearing'

window.cad = cad;
window.React = React;
window.ReactDOM = ReactDOM;

function drop(target){
    target.revert();
   var el = ReactDOM.findDOMNode(target)
   var me = ReactDOM.findDOMNode(this);
   $(me).append($(el).get(0).cloneNode(true));
}
ReactDOM.render(<Performance />,document.getElementById("root"))