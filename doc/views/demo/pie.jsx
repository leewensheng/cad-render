import React from 'react'
module.exports = React.createClass({
    render(){
        var demoURL = require("../../../demo/pie.demo.html");
        var style = {width:"100%",height:"400px"};
        return (
            <div className="content">
                <h1>饼图</h1>
                <h2>分分钟画出一个饼图</h2>
                <iframe className="demo-iframe" src={demoURL} style={style} />
                <pre>
                {
`
//相关代码
`   
                }
                </pre>
            </div>
        )
    }
})