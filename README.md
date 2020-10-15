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
      filename: 'js/[name].bundle.js',
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

### 2. 开发环境配置完善
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
4. 加载 `css`
  ```
  npm install --save-dev style-loader css-loader
  ```
  修改webpack.common.js
  ```js
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ],
    },
  ],
  ```
5. 加载图片
  ```
  npm install --save-dev file-loader url-loader
  ```
  修改webpack.common.js
  ```js
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: path.posix.join('[name].[hash:7].[ext]'),
        // 图片输出的实际路径(相对于dist)
        outputPath: 'images',
      },
    },
  ]
  ```
6. 加载字体
  修改webpack.common.js
  ```js
  rules: [
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: path.posix.join('[name].[hash:7].[ext]'),
        // 图片输出的实际路径(相对于dist)
        outputPath: 'fonts',
      },
    },
  ]
  ```
7. 加载数据
  ```
  npm install --save-dev csv-loader xml-loader
  ```
  修改webpack.common.js
  ```js
  rules: [
    {
      test: /\.(csv|tsv)$/,
      loader: 'csv-loader'
    },
    {
      test: /\.xml$/,
      loader: 'xml-loader'
    },
  ],
  ```
8. 加载音视频资源
  修改webpack.common.js
  ```js
  rules: [
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('[name].[hash:7].[ext]'),
        // 输出的实际路径(相对于dist)
        outputPath: 'media',
      }
    },
  ]
  ```

### 3. 生产环境配置完善
1. 修改weboack.prod.js
  ```js
  // 存放 prod 配置
  const path = require("path");
  const utils = require('./utils')
  // 合并配置文件
  const { merge } = require("webpack-merge");
  const common = require("./webpack.common.js");

  module.exports = merge(common, {
    mode: "production",
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: utils.assetsPath("js/[name].[chunkhash]" + ".js"),
      chunkFilename: utils.assetsPath("js/[id].[chunkhash]" + ".js"),
    },
    module: {},
    plugins: [],
  })
  ```
  1. 分离 `css`
  ```
  npm install --save-dev mini-css-extract-plugin
  ```
  修改webpack.common.js, 去除css-loader,修改webpack.prod.js
  ```js
  module: {
		rules: [
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
	],
  ```

### 4. 配置打包性能优化
```
// 在optimization.minimizer中引用
```
1. css代码压缩
    ```
    npm install optimize-css-assets-webpack-plugin --save-dev
    ```
    `webpack.prop.js` 新增
    ```js
    // 压缩css
    const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


    plugins: [
      ...
      new OptimizeCSSAssetsPlugin(),
    ],
    ```
2. js代码压缩（webpack4自带js压缩，这里搬运网上js手动添加压缩代码）
  ```
  npm install uglifyjs-webpack-plugin --save-dev
  ```
  `webpack.prop.js` 新增
  ```js
  //压缩js
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

  minimizer: [
    ...
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
    ...
  ],
  ```

3. 使用`html-webpack-plugin`来压缩html代码,并实现自动化注入脚本以及样式文件,对于文件名中包含哈希的Webpack捆绑包尤其有用。
  webpack.common.js修改
  ```js
  plugins: [
    new webpack.HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'index.html'),
      inject: true,
      favicon: resolve('favicon.ico'),
      title:'标题',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  ```
4. 拆包：使用splitChunks进行拆包 修改wepack.prod.js
  ```js
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000, // 模块的最小体积
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: { // 缓存组
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
  ```
5. `Happypack` 多线程打包
  ```js
  // 多进程并发执行loader  默认为单线程
  const HappyPack = require('happypack')
  const os = require('os')// 根据系统的内核数量 指定线程池个数 也可以其他数量
  const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})//插件中引入
  plugins:[
      new HappyPack({ 
          // 基础参数设置  
          id: 'babel', // 上面loader?后面指定的id  
          loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader  这里加入了缓存控制 
          threadPool: happyThreadPool,    
          verbose: true
      })
  ]

  // loader处理器中使用 通过id匹配
  modules: {
      test: /\.js$/,      
      use:'happypack/loader?id=babel',  
      exclude: /node_modules/, // 排除不处理的目录  
      include: [    
          resolve('src'), resolve('test'),   
          resolve('mock'),    
          resolve('node_modules/webpack-dev-server/client')  
      ]
  }
  ```
6. 缓存与增量构建
  缓存构建:webpack构建中,一般需要使用许多loader来预处理文件,以babel-loader为例。可以通过设置cacheDirectory或cacheDirectory=true来达到缓存的目的。
  ```js
  {  
    test: /\.js$/,  
    loader: 'babel-loader?cacheDirectory',  
    exclude: /node_modules/, // 排除不处理的目录  
    include: [    
        resolve('src'),    
        resolve('test'),    
        resolve('mock'),    
        resolve('node_modules/webpack-dev-server/client')  
    ]
  }
  ```
  增量构建:使用增量构建而不是全量构建有利于构建速度的提升。全量构建即每次重新构建都需要重新编译一次(包括未修改部分),而增量构建对于未修改的部分不会再重新编译,对于rebuild能够大大提高编译速度。对于开发阶段,可以使用webpack-dev-server来达到增量编译的目的,对于生产阶段,可以通过给生成的文件添加hash(或chunkhash 或contenthash )来实现增量构建。
  ```js
  output: {  
    path: config.build.assetsRoot,  
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),  
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  }
  ```
7. 优化模块查找路径
  通过配置resolve.modules来告诉webpack解析模块时应该搜索的目录。默认配置采用向上递归搜索的方式去寻找，设置特定搜索目录有助于webpack更快搜索到目标。
  ```js
  resolve: {  
    extensions: ['.js', '.vue', '.json'],  
    alias: {    
        '@': resolve('src')  
    },  
    modules: [    
        resolve('src'),    
        resolve('node_modules')  
    ]}
  }
  ```
8. DllPlugin和DllReferencePlugin
  dll全称为动态链接库,先通过dllPlugin生成清单文件(这个文件包含了从 require 和 import 的request到模块 id 的映射),然后通过DllReferencePlugin引用该清单文件,将依赖的名称映射到模块的 id 上。这样每次打包时.先去查找清单里中是否已经存在这个依赖，如果已经存在，则不打包，如果还没存在，则需要打包。与通过externals 的方式引入第三方库类似,dll主要用于那些没有可以在<script>标签中引入的资源的模块（纯npm包)。
  新增webpack.dll.conf.js文件
  ```js
  //webpack.dll.conf.js
  const webpack = require('webpack');
  const path = require('path');
  const vendors = [  'vue',  'vue-router',  'vuex',  'axios'];
  module.exports = {  
      output: {    
          path: path.resolve(__dirname, '../static/js'),    
          filename: 'dll.[name].js',    library: '[name]'  
      }, 
      entry: {    vendor: vendors,  }, 
      plugins: [    
          new webpack.DllPlugin({      
              path: 'manifest.json',      
              name: '[name]',      
              context: __dirname    
          })  
      ]
  }
  ```
  修改webpack.prod.js
  ```js
   // build/webpack.base.conf.js
  const manifest = require('../manifest.json')    
      
  // 插件中引入
  plugins: [
    new webpack.DllReferencePlugin({
        mainfest
      })
  ]
  ```
  然后在index.html手动引入该文件
  ```html
  <script type="text/javascript" src="/static/js/dll.vendor.js"></script>
  ```
9. 使用分析工具 `webpack-bundle-analyzer`
  ```js
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

  plugins:[
    new BundleAnalyzerPlugin({  
        analyzerPort: 8080,  
        generateStatsFile: false
    })
  ]
  ```

### 5. 配置分离
1. 目录拆分，形成新的目录结构如下
  ```
  ├── build
  │   ├── config
  │   │   ├── index .js
  │   ├── util.js
  │   ├── webpack.base.js
  │   ├── webpack.dev.js
  │   └── webpack.prod.js
  ├── dist
  ├── src
  │   ├── main.js
  ├── .gitignore
  ├── index.html
  ├── package.json
  ├── README.md
  ```

2. util.js新增公共方法
  ```js
  'use strict'
  const path = require('path');

  exports.assetsPath = function(_path) {
    return path.posix.join( _path);
  }
  ```

### 6. 添加eslint
1. 安装依赖
  ```js
  npm install eslint-loader eslint --save-dev
  ```
2. 删除`webpack.common.js`里`module`中js，并在`webpack.prod.js`中新增
3. 修改webpack.dev.js
  ```js
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /(node_modules)/,
        include: [resolve('src'), resolve('test')],
      },
      ...
    ],
  },
  ```

### 7. 添加prettier