const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path')
const webpack= require('webpack')
const srcPath = path.join(__dirname, '..', 'src');
const url = require('url');

module.exports = {
    entry: path.join(srcPath, 'index'),
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader'], // 1. 开启缓存
                include: srcPath, // 2. 缩小适合范围(写include或exclude)
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader'],
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader'], // 1. 开启缓存

                // include: /node_modules\/aldehyde/, // 2. 缩小适合范围(写include或exclude)
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js','jsx'],
            // https://github.com/babel/babel/issues/8462
            // https://blog.csdn.net/qq_39807732/article/details/110089893
            // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
            fallback: {
                picomatch: require.resolve('picomatch')

            },
            // 如果确认不需要node polyfill，设置resolve.alias设置为false
            alias: {
                crypto: false,
                path:false,
                stream: false,
                https: false,
                http: false,
                zlib: false,
                querystring: false ,
            },
            fallback:{
                "url": require.resolve("url")
            }
    },
    plugins:
        [
            new CleanWebpackPlugin(), // 清除之前的打包文件
            new webpack.DefinePlugin({
                process: {env: {}}
            })
        ]
}