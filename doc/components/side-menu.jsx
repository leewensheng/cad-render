import React from 'react'
import {Link} from 'react-router'

var Menu = React.createClass({
    render(){
        var links = this.props.links||[]
        return (
            <div className="doc-nav">
                <p className="title">{this.props.title}</p>
                <ul className="nav-list">
                    {
                        this.props.links.map(function(link){
                            return <li>
                                    <Link to={link.to}>{link.name}</Link>
                                    </li>
                        })
                    }
                </ul>
            </div>
        )
    }
})
module.exports = Menu;