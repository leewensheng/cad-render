// new webpack.optimize.CommonsChunkPlugin('common.js');
/*
var uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
*/
//    new webpack.NoErrorsPlugin()
/*
var HtmlWebpackPlugin = require('html-webpack-plugin');
https://www.npmjs.com/package/html-webpack-plugin


new webpack.HotModuleReplacementPlugin()
http://gaearon.github.io/react-hot-loader/getstarted/
*/

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
module.exports = {
    entry:{
        cad:"./lib/svg/index",
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
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template:"./src/template.html",
            title:"输出测试",
            filename:"index.html",
            hash:true
        })
    ],
    resolve:{
        extensions:['','.js','.jsx','.json']
    },
    externals:{
        "jquery":"window.jQuery||window.Zepto"
    }
}