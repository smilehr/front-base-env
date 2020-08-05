// 存放 prod 配置
const path = require('path');
const utils = require('./utils');
// 合并配置文件
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 分离css代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonConfig, {
	mode: 'production',
	output: {
		path: path.join(__dirname, '..', 'dist'),
		filename: utils.assetsPath('js/[name].[chunkhash]' + '.js'),
		chunkFilename: utils.assetsPath('js/[id].[chunkhash]' + '.js'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
          MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
		],
	},
	plugins: [
		// extract css into its own file
		new MiniCssExtractPlugin({
			filename: utils.assetsPath('css/[name].[chunkhash]' + '.css'), // 分离后的文件名
			chunkFilename: utils.assetsPath('css/[name].[chunkhash]' + '.css'), //
			ignoreOrder: false,
		}),
	],
});
