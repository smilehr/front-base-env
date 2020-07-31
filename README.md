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
	下载必要插件
	```
	npm install webpack webpack-cli webpack-merge --save-dev
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
	```js
	```
	webpack.dev.js文件内容
	```js
	```
	webpack.prod.js文件内容
	```js
	```
4. package.json新增打包命令
	```json
	```
	到这一步执行命令的话应该就可以跑一个初始的项目了，但这只是最基础的模板

### 2. 搭建基础架构
1. 每次构建前清空dist目录，添加`clean-webpack-plugin`插件
	```
	npm install clean-webpack-plugin --save-dev
	```
	修改webpack.config.js
	```js
	plugins: [
		// 自动清空dist目录
		new CleanWebpackPlugin(),
	]
	```
2. 从html模板自动生成最终html `html-webpack-plugin`
	```
	npm install html-webpack-plugin --save-dev
	```
	修改webpack.config.js
	```js
	plugins: [
		new HtmlWebpackPlugin({    
			template: './index.html',    
			chunks: ['main']
		})
	]
	```
3. 开发环境添加热监测服务器 `webpack-dev-server`
	```
	npm install webpack-dev-server --save-dev
	```
	修改package.json:
	```json
	"scripts": {
		"build": "webpack --mode production",
		"dev": "webpack --mode development",
		"serve": "webpack-dev-server --open --mode development"
	},
	```
	修改webpack.dev.js
	```js
	devServer: {
		contentBase: './dist',
		port: 8080,	// 默认8080，可不写
		hot: true	// 热更新，无需刷新
	},
	```