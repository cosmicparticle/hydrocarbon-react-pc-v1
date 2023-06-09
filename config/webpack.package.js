const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const commonConfig = require('./webpack.common.js')
const {merge} = require('webpack-merge')
const nodeExternals = require('webpack-node-externals');
const packageConfig = {
    mode: 'development', // 生产环境
    output: {
        filename: '[name].js',
        // library: {
        //     name:"hydrocarbon-react",
        //     type:'umd'
        // },
        //filename: 'index.js',
        libraryTarget: 'commonjs2',
        publicPath: '/',
        path:  path.join(__dirname, '..', 'package')  // 输出目录
    },
    externals: [nodeExternals()],
    externalsPresets: { node: true },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },// 处理css样式文件中的url图片
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,    //限制 8kb 以下使用base64
                        esMoudle: false,
                        name: '[name]-[hash:8].[ext]',
                        // 打包到/images目录下
                        outputPath: 'images'
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            // 以根目录中的index.html文件作为模板来自动生成dist/index.html文件
            // 注意，这里是相对根目录而言的，因为脚本的上下文是在根目录下
            template: './public/index.html',
            inject: true,
        }),
    ]
}

module.exports = merge(commonConfig, packageConfig)