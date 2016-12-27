import Start from '../../views/start/index.jsx'
import Install from '../../views/start/install.jsx'
import Introduction from "../../views/start/introduction.jsx"
module.exports = {
    path:'start',
    component:Start,
    indexRoute:{component:Install},
    childRoutes:[
    	{
    		path:'introduction',
    		component:Introduction
    	},
    	{
    		path:"qibu",
    		component:require("../../views/start/qibu.jsx")
    	}
    ]
}