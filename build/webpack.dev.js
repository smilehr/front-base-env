// 存放 dev 配置
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	// 输出
	output: {
		filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
		path: path.resolve(__dirname, '../dist'),
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: '../dist',
		port: 8080,	// 默认8080，可不写
		open: false,
		hot: true	// 热更新，无需刷新
	},
	module: {},
});
