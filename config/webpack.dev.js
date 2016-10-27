/*
 * Develop Envriment Config
 */

var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

//通过 webpackMerge 可以覆盖common里的配置
module.exports = webpackMerge(commonConfig, {
    debug: true,
    devtool: 'source-map',

    output: {
        path: helpers.root('..', 'public', 'assets'),
        publicPath: '/assets/',
        filename: 'js/[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: helpers.root('..') + '/fuel/app/views/index/index.php'
        }),
        // new pathRewritePlugin()
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
