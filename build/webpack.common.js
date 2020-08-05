// 存放 dev 和 prod 通用配置

const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function srcResolve(file) {
  var _path = path.join(__dirname, '..', 'src', file);
  return _path;
}

function distResolve(file) {
  return path.join(__dirname, '..', 'dist', file);
}

module.exports = {
  entry: {
    app: srcResolve('main.js'),
  }, // 入口
  output: {
    path: distResolve(''),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: path.posix.join('[name].[hash:7].[ext]'),
          // 图片输出的实际路径(相对于dist)
          outputPath: 'images',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: path.posix.join('[name].[hash:7].[ext]'),
          // 输出的实际路径(相对于dist)
          outputPath: 'fonts',
        },
      },
      {
        test: /\.(csv|tsv)$/,
        loader: 'csv-loader',
      },
      {
        test: /\.xml$/,
        loader: 'xml-loader',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('[name].[hash:7].[ext]'),
          // 输出的实际路径(相对于dist)
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    // 自动清空dist目录
    new CleanWebpackPlugin(/*{ cleanAfterEveryBuildPatterns: ['dist'] }*/),
    // 生成html文件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'index.html'),
      chunks: ['app'],
    }),
  ], // 插件
};
