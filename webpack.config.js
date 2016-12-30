var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
module.exports = {
    entry:{
        index:"./doc/index"
    },
    output:{
        path:"./build/",
        filename:"[name].bundle.js"
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', 
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css')
            },
            {   
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192&name=img/[name].[ext]'
            },
            {
                test:/\.demo\.html/,
                loader:'file-loader?name=demo/[name].[ext]\?v=[hash]'
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template:"./test/template.html",
            title:"输出测试",
            filename:"index.html",
            hash:true
        })
    ],
    resolve:{
        extensions:['','.js','.jsx','.json'],
        root: path.join(__dirname),
        alias:{
            'react':'react/dist/react.js',
            'react-dom':'react-dom/dist/react-dom.js',
            'jquery':'jquery/dist/jquery.js'
        }
    }
}