// 存放 dev 和 prod 通用配置

const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
		filename: 'vendorjs/[name].bundle.js',
	},
	module: {
		rules: [],
	},
	plugins: [
		// 自动清空dist目录
		new CleanWebpackPlugin(/*{ cleanAfterEveryBuildPatterns: ['dist'] }*/),
		// 生成html文件
		new HtmlWebpackPlugin({
			template: 'index.html',
			chunks: ['app'],
		}),
	], // 插件
};
