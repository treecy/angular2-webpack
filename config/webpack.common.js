var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

var blurThemeCss = new ExtractTextPlugin('css/[name].css');
var appCss = new ExtractTextPlugin('css/[name].css');

module.exports = {
    entry: {
        // the standard polyfills we require to run Angular applications in most modern browsers.
        'polyfills': './src/polyfills.ts',

        //the vendor files we need: Angular, lodash, bootstrap.css...
        'vendor': './src/vendor.ts',

        // our application code.
        'app': './src/main.ts'
    },



    resolve: {
        // an explicit extension (signified by the empty extension string, '') or
        extensions: ['', '.js', '.ts'],

        alias: {
            'app-components': helpers.root('/src/app/components'),
            '@angular': helpers.root('/node_modules/@angular')
        }
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
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[hash].[ext]" 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file?name=fonts/[name].[hash].[ext]" 
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file?name=img/[name].[hash].[ext]'
            },

            {
                test: /\.scss$/,
                include: [
                    helpers.root('node_modules', 'ng2-blur-theme'),
                    helpers.root('node_modules', 'ng2-smart-table'),
                ],
                loaders: ['css-to-string', 'css?sourceMap', 'resolve-url','sass?sourceMap']
            },

            {
                test: /\.scss$/,
                include: helpers.root('src'),
                exclude: helpers.root('src', 'app'), 
                loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
            },

            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loaders: ['css-to-string', 'css?sourceMap', 'resolve-url','sass?sourceMap']
            },

            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'), 
                loader: appCss.extract('style', 'css?sourceMap')
            }, {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw' 
            }
        ]
    },

    sassLoader: {
        includePaths: ['src/public/style/conf']
    },

    plugins: [
        appCss,

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new webpack.ProvidePlugin({
          jQuery: 'jquery'
        })
    ]
};
