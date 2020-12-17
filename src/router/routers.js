import Home from '../views/Home.vue'
import Main from '../layout/index'

const routers = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            icon: 'login'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
    },
    {
      path: '/registered',
      name: 'Registered',
      meta: {
        title: '注册',
        icon: 'registered'
      },
      component: () => import(/* webpackChunkName: "registered" */ '../views/registered/registered.vue')
    },
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
      path: '/site',
      name: '_Site',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'site-edit',
          name: 'Site',
          meta: {
            title: '网站设置',
            icon: 'ios-at'
          },
          component: () => import('../views/site/site.vue')
        }
      ]
    },
    {
      path: '/info',
      name: '_Info',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'info-edit',
          name: 'Info',
          meta: {
            title: '个人信息',
            icon: 'ios-at'
          },
          component: () => import('../views/user/into/into.vue')
        }
      ]
    },
    {
      path: '/label',
      name: '_Label',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'labels-edit',
          name: 'Label',
          meta: {
            title: '标签设置',
            icon: 'ios-pricetags'
          },
          component: () => import('../views/tags/tags.vue')
        }
      ]
    },
    {
      path: '/add-article',
      name: 'ArticleAdd',
      meta: {
        title: '添加列表',
        icon: 'file-markdown'
      },
      component: () => import('../views/add-article/add-article.vue')
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
      path: '/user',
      name: 'User',
      meta: {
        title: '列表页',
      },
      component: Main,
      children: [
        {
          path: 'password-edit',
          name: 'PasswordEdit',
          meta: {
            title: '密码修改',
            icon: 'file-markdown'
          },
          component: () => import('../views/user/password/password.vue')
        },
      ]
    },
]


export default routers