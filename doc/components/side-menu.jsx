import React from 'react'
import {Link,IndexLink} from 'react-router'
import Anchor from './anchor.jsx'

var Menu = React.createClass({
    getInitialState(){
        var height = document.documentElement.clientHeight;
        return {
            height:height - 60,
            activeAnchor:null,
            scrolling: false
        }
    },
    resize(){
         var height = document.documentElement.clientHeight;
         this.setState({height: height-60});
    },
    render(){
        var {width} = this.props;
        var height  = this.state.height;
        var style = {width,height};
        var menus = this.props.menus;
        var path = this.props.path;
        var that = this;
        return(
            <div className="doc-nav" style={style}>
                <div className="side-nav">
                    {
                        menus.map(function(menu){
                            return (
                                <div>
                                    <p className="title">{menu.title}</p>
                                    <ul className="nav-list">
                                    {
                                        menu.links.map(link=>{
                                            return (
                                                <li>
                                                {
                                                    link.isIndex ? 
                                                    <IndexLink 
                                                        onClick={that.onLink}
                                                        activeClassName="active" 
                                                        to={link.to}>{link.text}</IndexLink> : 
                                                    <Link activeClassName="active" 
                                                            onClick={that.onLink} 
                                                            to={link.to}>{link.text}</Link>
                                                }
                                                {
                                                    link.anchors ?(
                                                        <ul className={path==link.to?'nav-list open':'nav-list'}>
                                                            {
                                                                link.anchors.map((anchor,index)=>{
                                                                    return (
                                                                    <li>
                                                                        <Anchor index={index} onClick={that.handleAnchor} isActive={that.state.activeAnchor==index} isopen={path==link.to}>{anchor}</Anchor>
                                                                    </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>

                                                    ) :''
                                                }
                                                </li>
                                            )

                                        })
                                    }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    },
    componentDidMount(){
        var that = this;
        window.addEventListener("resize",this.resize);
        window.addEventListener("scroll",this.handleScroll);
    },
    componentWillUnmount(){
        window.removeEventListener("resize",this.resize);
        window.removeEventListener("scroll",this.handleScroll);
    },
    onLink(){
        this.setState({
            activeAnchor:-1
        });
        document.body.scrollTop = 0;
    },
    handleScroll(){
        if(this.state.scrolling) {
            return;
        }
        var elems = document.querySelectorAll(".content h2");
        for(var i = 0; i < elems.length;i++) {
            if(elems[i].getBoundingClientRect().top > 0) {
                this.setState({
                    activeAnchor:i
                })
                break;
            }
        }
    },
    handleAnchor(index){
        this.setState({activeAnchor:index});
        var elem = document.querySelectorAll(".content h2")[index];
        var clientRect = elem.getBoundingClientRect();
        var scrollTop = document.body.scrollTop;
        var to = scrollTop + clientRect.top - 70;
        this.setState({scrolling:true});
        $("body").animate({scrollTop:to+"px"});
        var that = this;
        setTimeout(function(){
            that.setState({scrolling:false});
        },400);
    }
})
module.exports = Menu;