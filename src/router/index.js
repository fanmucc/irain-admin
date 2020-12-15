import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routers from './routers'
import config from '../config'
const { routerWhitelist } = config

import { LoadingBar } from 'view-design'

import { getHasGetInfo, setHasGetInfo } from '../libs/utils'

Vue.use(VueRouter)

const LOGIN_PATH_NAME = 'Login'

// 路由跳转验证方法，此为单独抽离出来的函数方法
const routerWhitelistState = (routerName, routerWhitelist = routerWhitelist, next, hasGetInfo) => {
  const status = routerWhitelist.find(item => {
    return item === routerName
  })
  if (!hasGetInfo && !status) {
    LoadingBar.start()
    next({
      name: LOGIN_PATH_NAME
    })
  } else if (!hasGetInfo && status) {
    LoadingBar.start()
    next()
  } else if (hasGetInfo && status) {
    LoadingBar.start()
    next({
      name: 'Home'
    })
  } else {
    if (store.state.user.routerList.length === 0) {
      setHasGetInfo(false)
      LoadingBar.start()
      next({
        name: LOGIN_PATH_NAME
      })
      console.log(store.state.user.routerList)
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
  const hasGetInfo = getHasGetInfo()
  routerWhitelistState(to.name, routerWhitelist, next, hasGetInfo)
})

router.afterEach(router => {
  LoadingBar.finish()
})

export default router
