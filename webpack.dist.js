var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    });
module.exports = {
    entry:{
        cad:"./src/index",
    },
    output:{
        path:"./dist/",
        filename:"cad.js"
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
            }
        ]
    },
    plugins:[
        //uglifyJSPlugin
    ],
    resolve:{
        extensions:['','.js','.jsx','.json']
    },
    externals:{
        "jquery":"window.$"
    }
}