// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './vuex/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueDND from 'awe-dnd'
import VideoPlayer from 'vue-video-player'
import animated from 'animate.css'
import './assets/iconfont/iconfont.css'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
require('videojs-flash')
Vue.use(VideoPlayer)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(VueDND)
Vue.use(animated)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
});
