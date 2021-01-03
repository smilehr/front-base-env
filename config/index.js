'use strict'
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const environment = require('./environment')
const config = require('./config')

const config_env = config.config_env
const config_client = config.config_client
const buildAppName = environment.buildAppName
let entry = config.config_entry

if (!environment.more) {
  const singleEntry = {}
  singleEntry[buildAppName] = entry[buildAppName]
  entry = singleEntry
}
module.exports = {
  env: {
    NODE_ENV: config_env[environment.stage].NODE_ENV,
    STAGE: JSON.stringify(environment.stage),
    PLATFORM: JSON.stringify(environment.platform),
    MORE: JSON.stringify(environment.more),
    PLATFORM_PRAM: JSON.stringify(config_client[environment.platform]),
    BASE_URL:
      environment.requestHttp == '0'
        ? JSON.stringify(config_env[environment.stage].url)
        : JSON.stringify(environment.requestHttp),
  },

  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/v2': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/v2': '', //路径重写
        },
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'inline-source-map',

    devServer: {
      hot: true,
    },

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, `../dist/${buildAppName}/index.html`),

    // Paths
    assetsRoot: path.resolve(__dirname, `../dist/${buildAppName}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    buildAppName,
  },

  test: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },

  build_dev: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  entry,
}
