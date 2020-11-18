import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import './components/global.less'
import bootstrap from './core/bootstrap'
import './core/lazy_use'
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'
import router from './router'
import './security' // permission control
import store from './store/'
import './utils/filter' // global filter
import eventPublish from './utils/eventPublisher'
import Auth from './iop/service/auth/index'
import '@/assets/font/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$event = eventPublish
Vue.prototype.$goPage = Auth.goPage
new Vue({
  router,
  store,
  created: bootstrap,
  render: (h) => h(App)
}).$mount('#app')
