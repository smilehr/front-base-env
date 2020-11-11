// 存放 dev 配置
const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = merge(commonConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /(node_modules)/,
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    // quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    },
  },
});
