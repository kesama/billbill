import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import{Toast} from 'vant';
import 'vant/lib/index.css';
import http from '../http'
import './icomoon/style.css'

Vue.prototype.$msg=Toast
Vue.prototype.$http=http
Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
