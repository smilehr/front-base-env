# front-base-env
自己的前端环境脚手架

## webpack环境搭建

### 1. 初始化项目

1. npm init 初始化项目, 形成基本目录结构
  ```
  ├── build
  ├── dist
  ├── src
  │   ├── main.js
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
3. main.js文件修改
  ```js
  function component() {
    var element = document.createElement('div');
    element.innerHTML = 'hello my webpack environment';
    return element;
  }
  document.body.appendChild(component());
  ```
4. 抽离开发环境、生产环境，生成不同的配置文件，扩展后文件目录如下
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
  webpack.common.js 抽离webpack公有配置
  ```js
  const webpack = require('webpack');
  const path = require('path');

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
    plugins: [], // 插件
  };
  ```
  webpack.dev.js文件内容
  ```js
  const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'development',
    module: {},
  });
  ```
  webpack.prod.js文件内容
  ```js
  const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
    module: {},
    plugins: [],
  });
  ```
5. package.json新增打包命令
  ```json
  "scripts": {
    "build": "webpack --config build/webpack.common.js"
  },
  ```
6. 每次构建前清空dist目录，添加`clean-webpack-plugin`插件
  ```
  npm install clean-webpack-plugin --save-dev
  ```
  修改webpack.common.js
  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  plugins: [
    // 自动清空dist目录
    new CleanWebpackPlugin(),
  ]
  ```
7. 从html模板自动生成最终html `html-webpack-plugin`
  ```
  npm install html-webpack-plugin --save-dev
  ```
  修改webpack.common.js
  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins: [
    new HtmlWebpackPlugin({    
      template: 'index.html',    
      chunks: ['app']
    })
  ]
  ```
  到这一步执行命令的话应该就可以跑一个初始的项目
### 2. 配置完善
1. 开发环境添加热监测服务器 `webpack-dev-server`
  ```
  npm install webpack-dev-server --save-dev
  ```
  package.json新增命令:
  ```json
  "scripts": {
    "serve": "webpack-dev-server --inline --progress --config build/webpack.dev.js"
  },
  ```
  修改webpack.dev.js
  ```js
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
  ```
2. 开发环境添加source-map
  修改weboack.dev.js
  ```
  ...
  devtool: 'source-map',
  ...
  ```
3. 解决es6转es5，引入babel
  ```
  npm install babel-loader --save-dev
  npm install '@babel/core' '@babel/plugin-syntax-dynamic-import' --save-dev
  npm install '@babel/plugin-transform-runtime' --save-dev
  npm install '@babel/preset-env' '@babel/register' --save-dev
  npm install '@babel/plugin-proposal-class-properties' --save-dev
  ```
  修改webpack.common.js
  ```js
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: [
          resolve('src'),
          resolve('test')
        ]
      },
    ],
  },
  ```
  根目录下添加 `.babelrc` 文件
  ```json
  {
    "presets": ["@babel/preset-env"],

    "plugins": [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-class-properties"
    ]
  }
  ```
4. 引入 `less`
  ```
  ```