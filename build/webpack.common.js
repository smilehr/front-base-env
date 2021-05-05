// 存放 dev 和 prod 通用配置

const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const vueLoaderConfig = require('../config/vue-loader.conf');

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
  // 入口
  entry: {
    app: srcResolve('main.js'),
  },
  output: {
    path: distResolve(''),
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'components': resolve('src/components'),
      'config': resolve('src/config'),
      'api': resolve('src/api'),
      'page': resolve('src/page')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig
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
      inject: true,
      // favicon: resolve('favicon.ico'),
      title:'标题',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new VueLoaderPlugin()
  ], // 插件
};
