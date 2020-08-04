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
    filename: utils.assetsPath("vendorjs/[name].[chunkhash]" + ".js"),
    chunkFilename: utils.assetsPath("vendorjs/[id].[chunkhash]" + ".js"),
  },
  module: {},
  plugins: [],
});
