import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mint from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import './assets/styles/base.css'
import './assets/styles/reset.less'

Vue.use(mint)
Vue.prototype.$http = axios

/* eslint-disable no-new */
window.$app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
})
