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
ReactDOM.render(<Disappear />,document.getElementById("root"))