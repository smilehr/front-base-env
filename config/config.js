'use strict'

const path = require('path')

/*模块入口集合*/
const config_entry = {
  home: path.join(__dirname, '../src/main.js'),
  demo: path.join(__dirname, '../src/demo.js'),
}
/*环境集合*/
const config_env = {
  local: {
    // 本地环境网络请求地址
    // "url": "http://localhost:8088",
    url: '',
    NODE_ENV: '"local"',
  },
  dev: {
    // 开发环境网络请求地址
    url: '',
    NODE_ENV: '"development"',
  },
  test: {
    // 测试环境网络请求地址
    url: '',
    NODE_ENV: '"test"',
  },
  prod: {
    // 正式环境网络请求地址
    url: '',
    NODE_ENV: '"production"',
  },
}

/*客户集合*/
const config_client = {
  tjwq: {
    title: '',
    logo: 'C',
    key: 'saber',
    indexTitle: '',
    clientId: 'saber',
    clientSecret: 'saber_secret',
  },

  bjxc: {
    title: '',
    logo: 'S',
    key: '',
    indexTitle: '',
    clientId: '',
    clientSecret: '',
  },
}

module.exports = {
  config_env,
  config_entry,
  config_client,
}
