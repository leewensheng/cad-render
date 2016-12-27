import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hasHistory } from 'react-router'
import routes from './routes/index'
ReactDOM.render(
<Router history={hasHistory} routes={routes} />,
document.getElementById("root")
)