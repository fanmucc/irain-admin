import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routers from './routers'
import config from '../config'
const { routerWhitelist } = config

import { LoadingBar } from 'view-design'

import { getToken, setToken } from '../libs/utils'

Vue.use(VueRouter)

const LOGIN_PATH_NAME = 'Login'

const routerWhitelistState = (routerName, routerWhitelist = routerWhitelist, next, token) => {
  const status = routerWhitelist.find(item => {
    return item === routerName
  })
  if (!token && !status) {
    // 无token 且跳转的不是白名单里面的内容
    LoadingBar.start()
    next({
      name: LOGIN_PATH_NAME
    })
  } else if (!token && status) {
    // 没有token 但是跳转的是白名单
    LoadingBar.start()
    next()
  } else if (token && status) {
    // 有token且跳转的为白名单则跳转至首页
    LoadingBar.start()
    next({
      name: 'Home'
    })
  } else {
    if (store.state.user.routerList.length === 0) {
      console.log(store.state.user.routerList)
        // store.dispatch('getUserSubmit').then(user => {
        //   // 获取到直接进行跳转
        //   LoadingBar.start()
        //   next()
        // }).catch(error => {
        //   setToken('')
        //   LoadingBar.start()
        //   next({
        //     neme: LOGIN_PATH_NAME
        //   })
        // })
      } else {
        LoadingBar.start()
        next()
      }
  }
}

const router = new VueRouter({
  mode: 'history',
  routes: routers
})


// 路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken()
  routerWhitelistState(to.name, routerWhitelist, next, token)
})

router.afterEach(router => {
  LoadingBar.finish()
})

export default router
