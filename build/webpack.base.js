// 存放 dev 和 prod 通用配置

const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/main.js', // 入口
	module: {
		rules: [],
	},
	plugins: [], // 插件
};
