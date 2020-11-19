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
      // 当判断其路由表为空的时候，则进行token的清空
      setToken('')
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
  const token = getToken()
  routerWhitelistState(to.name, routerWhitelist, next, token)
})

router.afterEach(router => {
  LoadingBar.finish()
})

export default router
