// 存放 dev 配置
const { merge } = require('webpack-merge')
const path = require('path')
const config = require('../config/index')
const utils = require('../config/utils')
const commonConfig = require('./webpack.common.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const devWebpackConfig = merge(commonConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /(node_modules)/,
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    overlay: true,
    compress: true,
    host: 'localhost',
    port: 8080,
    open: false,
    overlay: true,
    publicPath: '/',
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    },
  },
})
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
      return
    }
    // publish the new Port, necessary for e2e tests
    process.env.PORT = port
    // add port to devServer config
    devWebpackConfig.devServer.port = port

    // Add FriendlyErrorsPlugin
    devWebpackConfig.plugins.push(
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
      })
    )

    resolve(devWebpackConfig)
  })
})
