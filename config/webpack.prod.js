/*
 * Production Envriment Config
 */

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('..','public','assets'),
    publicPath: '/assets/',
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    new webpack.NoErrorsPlugin(), //エラーが出たら、中止する
    new webpack.optimize.DedupePlugin(), //重複ファイル検索 あったら削除
    new webpack.optimize.UglifyJsPlugin({
        beautify: false, //prod
        mangle: { screw_ie8 : true, keep_fnames: true }, //prod 
        compress: { screw_ie8: true }, //prod
        comments: false //prod
      }), //minify
    new ExtractTextPlugin('css/[name].[hash].css'), 
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: helpers.root('..') + '/fuel/app/views/index/index.php'
    }),
    new webpack.DefinePlugin({  //環境変数定義
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
