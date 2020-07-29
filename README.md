# front-base-env
自己的前端环境脚手架

## webpack环境搭建

### 1. 初始化项目

1. npm init 初始化项目, 形成基本目录结构
	```
	├── build
	├── dist
	├── src
	├── .gitignore
	├── index.html
	├── package.json
	├── README.md
	```
2. index.html文件代码修改
	```html
	<!DOCTYPE html>
	<html>
		<head>
			<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
			<meta name="format-detection" content="telephone=yes" />
			<meta charset="UTF-8" />
			<title>webpack基础环境</title>
		</head>
		<body>
			<div id="app"></div>
		</body>
	</html>
	```
2. 抽离开发环境、生产环境，生成不同的配置文件，扩展后文件目录如下
	```
	├── build
	│   ├── webpack.base.js
	│   ├── webpack.dev.js
	│   └── webpack.prod.js
	├── src
	├── .gitignore
	├── index.html
	├── package.json
	├── README.md

	```
	webpack.base.js 抽离webpack公有配置
	```
	```
	webpack.dev.js文件内容
	```js
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
		module: {},
	});
	```
	webpack.prod.js文件内容
	```js
	const path = require('path');
	// 合并配置文件
	const merge = require('webpack-merge');
	const common = require('./webpack.base.js');

	module.exports = merge(common, {
		mode: 'production',
		output: {
			filename: 'js/[name].[contenthash].js', //contenthash 若文件内容无变化，则contenthash 名称不变
			path: path.resolve(__dirname, '../dist'),
		},
		module: {},
		plugins: [],
	});
	```
4. 