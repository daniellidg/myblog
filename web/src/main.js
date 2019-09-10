import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './common/filters'
import './style.scss'

import http from './http'
Vue.prototype.$http = http

import './assets/css/style-liberxue.css'
import './assets/css/xcode.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
