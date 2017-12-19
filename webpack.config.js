/**
 * Created by Jarek on 2017/12/4.
 */
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var proxy = require('http-proxy-middleware');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
//noinspection JSDuplicatedDeclaration
module.exports = {
    devtool: 'source-map',
    entry: __dirname + "/src/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./public", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true, // 实时刷新
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.js)$/,
                include: [resolve('src'),resolve('src/order/js')],
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"}, {loader: "css-loader"}
                ]
            }
        ]
    },
    devServer: {
        proxy: {
            '/api/**': {
                target: 'http://hospital.sandbox.51xinzhi.com',
                changeOrigin: true,
                cookieDomainRewrite: {
                    "unchanged.domain": "unchanged.domain",
                    "old.domain": "new.domain",
                    "*": ""
                }
            }
        }
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

