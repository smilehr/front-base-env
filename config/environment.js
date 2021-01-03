'use strict'

/**
 一，命令
 ### 优化后的完整命令格式
 npm run build -cli=bjxc -env=prod -url=https://www.xichengjiayuan.com -app=main

 二，参数说明：
 -cli 客户  同步config.config_project
 -env 环境  如：开发环境 -env=dev  测试环境 -env=test  生产环境 -env=prod  同步config.config_env  默认local
 -url 接口地址  当配置此参数时替换config.config_env.url参数  默认config.config_env.url的值
 -app 指定打包应用模块   如：主体模块 -app=main  demo模块 -app=demo  同步config.config_entry  默认home
 -more 是否开启多模块打包  当配置此参数时打包所有模块 默认false关闭  只打包一个模块

 */

const configArgv = JSON.parse(process.env.npm_config_argv)
console.log(configArgv)
const original = configArgv.original

let platform = ''
let stage = 'local'
let requestHttp = '0'
let buildAppName = 'home'
let more = false
for (let i = 0; i < original.length; i++) {
  const argPair = original[i]
  if (argPair.indexOf('-api') > -1) {
    platform = argPair.split('=')[1]
  } else if (argPair.indexOf('-env') > -1) {
    stage = argPair.split('=')[1]
  } else if (argPair.indexOf('-url') > -1) {
    requestHttp = argPair.split('=')[1]
  } else if (argPair.indexOf('-app') > -1) {
    buildAppName = argPair.split('=')[1]
  } else if (argPair.indexOf('-more') > -1) {
    more = false
  }
}

console.log('打包参数', {
  platform,
  stage,
  requestHttp,
  buildAppName,
  more,
})

module.exports = {
  stage,
  requestHttp,
  platform,
  buildAppName,
  more,
}
