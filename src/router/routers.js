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
      path: '/add-article',
      name: 'AddArticle',
      meta: {
        title: '添加文章'
      },
      component: () => import(/* webpackChunkName: "addarticle" */ '../views/add-article/add-article.vue')
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
      path: '/side',
      name: 'Side',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'site-edit',
          name: 'SiteEdit',
          meta: {
            title: '网站设置',
            icon: 'ios-at'
          },
          component: () => import('../views/site/site.vue')
        }
      ]
    },
    {
      path: '/into',
      name: 'Into',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'into-edit',
          name: 'IntoEdit',
          meta: {
            title: '个人信息',
            icon: 'ios-at'
          },
          component: () => import('../views/into/into.vue')
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
          path: 'labels-edit',
          name: 'LabelEdit',
          meta: {
            title: '标签设置',
            icon: 'ios-pricetags'
          },
          component: () => import('../views/tags/tags.vue')
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
          path: 'add',
          name: 'ArticleAdd',
          meta: {
            title: '添加列表',
            icon: 'file-markdown'
          },
          component: () => import('../views/add-article/add-article.vue')
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
]


export default routers