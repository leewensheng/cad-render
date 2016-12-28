import React from 'react'
import {Link} from 'react-router'
import SideMenu from '../../components/side-menu.jsx'
module.exports = React.createClass({
    getInitialState(){
        var totalHeight = document.documentElement.clientHeight;
        return {
            navHeight:totalHeight - 60
        }
    },
    render(){
        var sideWidth = "250px";
        var navHeight = this.state.navHeight;
       return( 
        <div className="doc">
            <div className="doc-nav" style={{width:sideWidth,height:navHeight}}>
                <div className="side-nav">
                    <p className="title">基础</p>
                    <ul className="nav-list">
                        <li><Link  activeClassName="active" to="/start/install">安装</Link></li>
                        <li>
                        <Link to="/start">介绍</Link>
                            <ul className="nav-list">
                                <li><Link to="/start">起步</Link></li>
                            </ul>
                        </li>
                        <li>
                        <Link to="/start/agreen">约定</Link>
                            <ul className="nav-list">
                                <li><Link to="/start">坐标系</Link></li>
                                <li><Link to="/start">角度</Link></li>
                            </ul>
                        </li>
                        <li className="open">
                            <Link to="/start/basic-shapes">基本图形</Link>
                            <ul className="nav-list">
                                <li>
                                    <a href="#">直线</a>
                                </li>
                                <li>
                                    <a href="#">矩形</a>
                                </li>
                                <li>
                                    <a href="#">圆</a>
                                </li>
                                <li>
                                    <a href="#">椭圆</a>
                                </li>
                                <li>
                                    <a href="#">多边形</a>
                                </li>
                                <li>
                                    <a href="#">折线</a>
                                </li>
                                <li>
                                    <a href="#">路径</a>
                                </li>
                                <li>
                                    <a href="#">文本</a>
                                </li>
                                <li>
                                    <a href="#">图片</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/start">内置图形</Link>
                            <ul className="nav-list">
                                <li >
                                    <a href="#">扇形</a>
                                </li>
                                <li >
                                    <a href="#">桃形</a>
                                </li>
                                <li>
                                    <a href="#">箭头</a>
                                </li>
                            </ul>
                        </li>   
                    </ul>
                     <p className="title">图形操作</p>
                    <ul className="nav-list">
                        <li>
                            <Link to="/start/install">设置属性</Link>
                        </li>
                        <li>
                            <Link to="/start/install">绑定事件</Link>
                        </li>
                        <li>
                            <Link to="/start/install">描边和填充</Link>
                        </li>
                        <li><Link to="dom">平移</Link></li>
                        <li><Link to="dom">旋转</Link></li>
                        <li><Link to="dom">缩放</Link></li>
                        <li><Link to="dom">添加链接</Link></li>
                        <li><Link to="dom">拷贝</Link></li>
                        <li><Link to="dom">绘图次序</Link></li>
                    </ul>
                    <p className="title">图层</p>
                    <ul className="nav-list">
                        <li>
                            <a href="#">默认图层</a>
                        </li>
                        <li>
                            <a href="#">工作图层</a>
                        </li>
                        <li>
                            <a href="#">图层管理</a>
                        </li>

                    </ul>
                    <p className="title">进阶</p>
                    <ul className="nav-list">
                        <li>
                            <Link to="/start/install">路径</Link>
                            <ul className="nav-list">
                                <li>
                                    <a href="#">基本指令</a>
                                </li>
                                <li>
                                    <a href="#">扩展指令</a>
                                </li>
                            </ul>
                        </li>
                        <li><Link to="start/point">点</Link></li>
                        <li><Link to="start/line">线</Link></li>
                        <li><Link to="start/color">颜色处理</Link></li>
                        <li>
                            <Link to="/start/install">动画</Link>
                            <ul className="nav-list">
                                <li>
                                    <a href="#">路径动画</a>
                                </li>
                                <li>
                                    <a href="#">过渡动画</a>
                                </li>
                                <li>
                                    <a href="#">js动画</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/start">滤镜</Link>
                            <ul className="nav-list">
                                <li>
                                    <a href="#">阴影</a>
                                </li>
                                <li>
                                    <a href="#">灰度</a>
                                </li>
                                <li>
                                    <a href="#">模糊</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/start">填充</Link>
                            <ul className="nav-list">
                                <li>
                                    <a href="#">线性渐变</a>
                                </li>
                                <li>
                                    <a href="#">径向渐变</a>
                                </li>
                                <li>
                                    <a href="#">patter</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/start/install">复用</Link>
                            <ul className="nav-list">
                                <li>
                                    <a href="#">shape</a>
                                </li>
                                <li>
                                    <a href="#">symbol</a>
                                </li>
                                <li>
                                    <a href="#">block</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="doc-content" style={{marginLeft:sideWidth}}>
                {this.props.children}
            </div>
        </div>
        )
    },
    componentDidMount(){
        window.addEventListener("resize",()=>{
        var totalHeight = document.documentElement.clientHeight;
            this.setState({navHeight:totalHeight - 60})
        });
    }
})