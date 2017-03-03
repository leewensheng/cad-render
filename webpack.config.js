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
        index:"./src/virtual-dom/test"
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
                    presets:['es2015']
                }
            },
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css')
            }
        ],
        postLoaders: [
          {
            test: /\.jsx?$/,
            loaders: ['es3ify-loader']
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
            'jquery':'jquery/dist/jquery.js'
        }
    }/*,
    externals:{
        'react':'React',
        'react-dom':'ReactDOM',
        "jquery":"jQuery"
    }*/
}