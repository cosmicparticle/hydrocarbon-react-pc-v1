const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const commonConfig = require('./webpack.common')
const {merge} = require('webpack-merge')

const publicPath = '/';

const devConfig = {
    mode: 'development', // 开发环境
    output: {
        pathinfo: true,
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: publicPath,
        path: path.join(__dirname, '..', 'dist')  // 输出目录
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: ['file-loader']
            }
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'lib'),
        },
        open: true, //是否弹出新窗口
        compress: true,
        port: 9001,
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 以根目录中的index.html文件作为模板来自动生成dist/index.html文件
            // 注意，这里是相对根目录而言的，因为脚本的上下文是在根目录下
            template: './public/index.html',
            inject: true,
        }),

    ]

}
module.exports = merge(commonConfig, devConfig)