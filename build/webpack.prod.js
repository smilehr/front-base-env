// 存放 prod 配置
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
	mode: 'production',
	output: {},
	module: {},
	plugins: [],
});
