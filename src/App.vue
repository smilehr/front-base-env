<template>
  <div id="app">
    <router-view class="router-view"></router-view>
    <!-- <transition>
      <keep-alive v-if="!$route.meta.notKeepAlive">
        <router-view class="router-view"></router-view>
      </keep-alive>
      <router-view class="router-view" v-else></router-view>
    </transition> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {},
  computed: {},
  data() {
    return {}
  },
  watch: {},
  beforeCreate() {
    document.addEventListener(
      'plusready',
      function () {
        let uuid = plus.device.uuid
        console.log('uuid' + uuid)
      },
      false
    )
  },
  created() {},
  mounted() {
    // 处理Android 底部tab被键盘顶起问题 原理： Android键盘会导致WebView高度变化
    // const { android } = baseUtil.versions
    let android = false
    if (android) {
      let originHeight = document.documentElement.clientHeight || document.body.clientHeight
      window.addEventListener(
        'resize',
        () => {
          const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
          const routeMeta = this.$route.meta
          const keyboardObserver = routeMeta && routeMeta.keyboardObserver
          if (originHeight <= resizeHeight) {
            this.isKeyboardShow = false
            console.log('键盘收起', `origin:${originHeight} resize:${resizeHeight}`)
            keyboardObserver && keyboardObserver(false)
          } else {
            this.isKeyboardShow = true
            console.log('键盘弹出', `origin:${originHeight} resize:${resizeHeight}`)
            keyboardObserver && keyboardObserver(true)
          }
          originHeight = resizeHeight
        },
        false
      )
    }
  },
  methods: {},
}
</script>

<style lang="less">
body {
  background-color: white;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
}
.router-view {
  width: 100%;
  background: #fff;
  min-height: 100vh;
  transition: transform 0.24s ease-out;
}
#app.quickback .router-view {
  transition-duration: 0.1s;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-leave-active {
  transform: translate(-50%, 0);
}
.slide-right-enter {
  transform: translate(-50%, 0);
}
.slide-right-leave-active {
  transform: translate(100%, 0);
}
</style>
