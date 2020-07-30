// 存放 dev 和 prod 通用配置

const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './../src/main.js'
	}, // 入口
	module: {
		rules: [],
	},
	plugins: [
		// 自动清空dist目录
		new CleanWebpackPlugin(),
		// html插件
		new HtmlWebpackPlugin({
			template: '../index.html',
			chunks: ['main'],
		}),
	], // 插件
};
