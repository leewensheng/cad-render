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
        index:"./chart/test/index.js"
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
                loader: 'babel'
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
            'jquery':'jquery/dist/jquery.js',
            'cad':path.resolve(__dirname,"src/"),
          /*  'react':path.resolve(__dirname,"lib/preact"),
            'react-dom':path.resolve(__dirname,"lib/preact")*/
        }
    }/*,
    externals:{
        'react':'React',
        'react-dom':'ReactDOM',
        "jquery":"jQuery"
    }*/
}