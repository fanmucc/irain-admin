import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routers from './routers'

import { getToken, setToken } from '../libs/utils'

Vue.use(VueRouter)


const router = new VueRouter({
  routes: routers
})

const LOGIN_PATH_NAME = 'Login'
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken()
  if(!token && to.name !== LOGIN_PATH_NAME) {
    // 没有登陆且跳转的页面不是登陆页面
    // 将其跳转到登陆页
    next({
      name: LOGIN_PATH_NAME
    })
  } else if (!token && to.name === LOGIN_PATH_NAME) {
    // 未登录但是跳转的页面为登陆也
    // 直接跳转
    next()
  } else if (token && to.name === LOGIN_PATH_NAME) {
    // 已经登陆但是跳转到登陆页面
    // 阻止其行为 暂时跳转到首页
    next({
      name: 'Home'
    })
  } else {
    // 已经登陆 跳转的页面也不是首页 
    // 进行路由表判断，如果为空则需要重新加载路由
    if (!store.state.user.routeList) {
      store.dispatch('getUserSubmit').then(user => {
        // 获取到直接进行跳转
        next()
      }).catch(error => {
        setToken('')
        next({
          neme: LOGIN_PATH_NAME
        })
      })
    } else {
      next()
    }
  }
})

export default router
