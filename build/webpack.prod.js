// 存放 prod 配置
const path = require('path');
const utils = require('./utils');
// 合并配置文件
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// 分离css代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

// dllplugins
// const manifest = require('../manifest.json');

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: [resolve('src'), resolve('test')],
      },
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
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
		// new BundleAnalyzerPlugin({  
		// 	analyzerPort: 18080,  
		// 	generateStatsFile: false
		// })
	],
	optimization: {
		minimizer: [
			// 压缩css
			new OptimizeCSSAssetsPlugin(),

			// 压缩js
			new UglifyJsPlugin({  
				uglifyOptions: {    
					warnings: false,    
					compress: {      
						drop_debugger: false,      
						drop_console: true, //console      
						pure_funcs: ['console.log'] // 移除console    
					},    
					output:{      
						// 去掉注释内容      
						comments: false    
						}  
				},  
				sourceMap: false,  
				cache: true,  
				parallel: true
			}),
		],
	},
});
