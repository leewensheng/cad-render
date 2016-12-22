import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import routes from './routes/index'
ReactDOM.render(
<Router history={browserHistory} routes={routes} />,
document.getElementById("root")
)