// 存放 dev 配置
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	module: {},
	devServer: {
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
		after(app) {},
	},
});
