/*
 * @LastEditors: w
 */
var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './src/root/ani.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'ani.min.js',
        libraryTarget: 'commonjs2',
    },
    target: "node",
    // node: {
    //     fs: 'empty',
    //     net:'empty',
    //     tls: 'empty',
    //     co: 'empty',
    //     thunkify: 'empty',
    //     moment:'empty'
    // },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
};
