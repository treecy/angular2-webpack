var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        // 在大多数现代浏览器中运行 Angular 2 程序时需要的标准填充物。
        // 早点加载 Zone.js ，紧跟在其它 ES6 和 metadata 垫片 (shim) 之后。
        'polyfills': './src/polyfills.ts',

        // 需要的提供商文件： Angular 2 、 Lodash 、 bootstrap.css 等
        'vendor': './src/vendor.ts',

        // 应用代码
        'app': './src/main.ts'
    },



    resolve: {
        // 一个明确的扩展名 ( 通过一个空白的扩展名字符串 '' 标记出来 )
        extensions: ['', '.js', '.ts']
    },



    module: {
        loaders: [{
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            }, 
            {
                test: /\.html$/,
                loader: 'html'
            }, 
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            }, 
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'app'), //排除了 /src/app 目录下的 .css 文件
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },

            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loaders: ['raw', 'sass']
            },

            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'), //排除了 /src/app 目录下的 .css 文件
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            }, {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw' //通过 raw 加载器把它们加载成字符串
            }
        ]
    },



    plugins: [
        //这里标记出了三个 块儿 之间的等级体系： app -> vendor -> polyfills 
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        //自动注入 打包后的JS和CSS
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
