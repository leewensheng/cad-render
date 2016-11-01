import React from 'react'
import $ from  'jquery'

var Sorttable = React.createClass({
    getDefaultProps(){
        return {
            sort_id:"default_sorttable_id",
            axis:false,
            item:"",
            handle:false,
            connectWith:false
        }
    },
    getInitialState(){
        return {
            isSortting:false
        }
    },
    render(){
        return this.props.children;
    },
    componentDidMount(){
    }
})
module.exports = Sorttable;