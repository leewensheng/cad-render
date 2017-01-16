import React from 'react'
module.exports = React.createClass({
    render(){
        var demoURL = require("../../../demo/candy.demo.html");
        var style = {width:"100%",height:"400px"};
        return (
            <div className="content">
                <h1>时钟</h1>
                <h2>鼠标在上面移动试试</h2>
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