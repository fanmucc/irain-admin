import Home from '../views/Home.vue'
import Main from '../layout/index'

const routers = [
    // {
    //     path: '/login',
    //     name: 'Login',
    //     meta: {
    //         title: '登录',
    //         icon: 'login'
    //     },
    //     component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
    // },
    {
      path: '/',
      name: 'Main',
      redirect: '/home',
      meta: {
        hideInMenu: true,
        notCache: true
      },
      component: Main,
      children: [
          {
              path: '/home',
              name: 'Home',
              meta: {
                title: '首页',
                icon: 'ios-home',
                notCache: true
              },
              component: Home
          }
      ]
      
    },
    {
      path: '/web',
      name: 'Web',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'web-setting',
          name: 'WebSetting',
          meta: {
            title: '网站设置',
            icon: 'ios-at'
          },
          component: () => import('../views/Ceshi1.vue')
        }
      ]
    },
    {
      path: '/label',
      name: 'Label',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'labels',
          name: 'Labels',
          meta: {
            title: '标签设置',
            icon: 'ios-pricetags'
          },
          component: () => import('../views/Ceshi2.vue')
        }
      ]
    },
    {
      path: '/article',
      name: 'Article',
      meta: {
        title: '列表页',
      },
      component: Main,
      children: [
        {
          path: 'add-atricle',
          name: 'AddAtricle',
          meta: {
            title: '添加列表',
            icon: 'file-markdown'
          },
          component: () => import('../views/Ceshi3.vue')
        },
        {
          path: 'remote-atricle',
          name: 'RemoteAtricle',
          meta: {
            title: '删除列表',
            icon: 'file-markdown'
          },
          component: () => import('../views/Ceshi4.vue')
        }
      ]
    },
    {
      path: '/abc',
      name: 'Abc',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'add-abc',
          name: 'Addabc',
          meta: {
            title: '添加abc',
            icon: 'file-markdown'
          },
          component: () => import('../views/Ceshi5.vue')
        },
        {
          path: 'remote-abc',
          name: 'Remoteabc',
          meta: {
            title: '删除列表',
            icon: 'file-markdown'
          },
          component: () => import('../views/Ceshi6.vue')
        }
      ]
    }
]


export default routers