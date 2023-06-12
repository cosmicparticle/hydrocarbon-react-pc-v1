const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const commonConfig = require('./webpack.common.js')
const {merge} = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodConfig = {
    mode: 'production', // 生产环境
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 300000,
            maxSize: 450000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 500000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                antd: {
                    name: "antd",
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    chunks: "all",
                    priority: 11, // 优先级
                    reuseExistingChunk: true
                },
                aldehyde: {
                    name: "aldehyde",
                    test: /[\\/]node_modules[\\/]aldehyde[\\/]/,
                    chunks: "all",
                    reuseExistingChunk: true,
                    priority: 10 // 优先级
                },
                common: {
                    name: "common",
                    test: /[\\/]src[\\/]/,
                    minSize: 1024,
                    priority: 5
                }
            }
        }
    },
    output: {
        filename: 'bundle.[chunkhash].js',  // 输出文件名，一般要加上hash
        path: path.join(__dirname, '..', 'dist')  // 输出目录
    },
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
        new BundleAnalyzerPlugin(),
    ]
}

module.exports = merge(commonConfig, prodConfig)