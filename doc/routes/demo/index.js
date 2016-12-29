import Demo from '../../views/demo/index.jsx'
import Clock from '../../views/demo/clock.jsx'
module.exports = {
    path:'demo',
    component:Demo,
    indexRoute:{component:Clock},
    childRoutes:[
    	{
    		path:'animate',
    		component:require("../../views/demo/animate")
    	},
    	{
    		path:'transform',
    		component:require("../../views/demo/transform")
    	},
    	{
    		path:'pie',
    		component:require("../../views/demo/pie")
    	}
    ]
}