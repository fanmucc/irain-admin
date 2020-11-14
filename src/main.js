import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// import 'ant-design-vue/dist/antd.css'
import 'view-design/dist/styles/iview.css'
import './index.less'

require('./mock/index')


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
