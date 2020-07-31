// 存放 dev 配置
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	// 输出
	output: {},
	module: {},
});
