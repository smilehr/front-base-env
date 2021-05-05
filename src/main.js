// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store/'

//全局变量
window.APP_params = {}
router.beforeEach(function (to, from, next) {
  // document.title = process.env.PLATFORM_PRAM.title ? process.env.PLATFORM_PRAM.title : '西城家园'
  // store.dispatch('updateLoadingStatus', {
  //   isLoading: true,
  // })
  return next()
})

router.afterEach(function (to) {
  // store.dispatch('updateLoadingStatus', {
  //   isLoading: false,
  // })
})

Vue.config.productionTip = false

// 修改ios下键盘收起页面未还原问题
// document.addEventListener('focusout', e => {
//   // setTimeout(() => {
//   // 	document.activeElement.scrollIntoViewIfNeeded(false);
//   // }, 100)
//   // document.activeElement.scrollIntoViewIfNeeded(false);
//   document.activeElement.scrollIntoView(true)
// })

// 监听移动端键盘事件
// document.addEventListener('focusin', e => {
//   setTimeout(() => {
//     document.activeElement.scrollIntoViewIfNeeded(true)
//   }, 300)
// })

/* eslint-disable no-new */
let that = new Vue({
  router,
  // store,
  data: {
    appName: 'home',
  },
  render: h => h(App),
}).$mount('#app')

export default {
  that,
  router,
}
