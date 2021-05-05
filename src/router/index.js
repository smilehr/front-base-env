import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 首页
      // name: 'HelloWorld',
      redirect: '/home',
    },
    {
      // 首页-西城
      path: '/home',
      name: 'Home',
      component: resolve => require(['@/page/home.vue'], resolve),
      meta: {},
    },
  ],
})
