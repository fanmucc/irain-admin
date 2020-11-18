import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import md5 from 'js-md5'

// import 'ant-design-vue/dist/antd.css'

import 'view-design/dist/styles/iview.css'
import './index.less'

Vue.prototype.$config = config
Vue.prototype.$md5 = md5
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
