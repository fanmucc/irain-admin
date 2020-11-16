import Cookies from 'js-cookie';
import config from '@/config'
export const TOKEN_KEY = 'token'
const { title, cookieExpires } = config
import { objEqual } from './tools'

/**
 * 设置和读取token
 */

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}


/**
 * @param {String} url
 * @description 从url中解析参数
 */

 export const getParams = url => {
     const keyValueArr = url.split('?')[1].split('&')
     let paramObj = {}
     keyValueArr.forEach(item => {
         const keyValue = item.split('=')
         paramObj[keyValue[0]] = keyValue[1]
     })
     return paramObj
 }

/**
 * @param {Array} 路由列表数组
 * @description 找出其子列表不为空的父级path
 */

export const getRootSubmenuKeys = routerArray => {
    const rootSubmenuKeys = [];
    routerArray.forEach((item) => {
        if (item.children !== undefined && item.children.length !== 0) {
            rootSubmenuKeys.push(`${item.path}`)
        }
    })
    return rootSubmenuKeys
}

/**
 * @param {String, String, String} 'get | set', key, value  
 * @description sessionStorage设置或缓存数据
 */

export const setSessionStorage = (state, key, value) => {
    if ( state === 'set') {
        window.sessionStorage.setItem(key, value);
    } else {
        return window.sessionStorage.getItem(key) === null ? false : window.sessionStorage.getItem(key)
    }
}


/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */

 export const getHomeRoute = (routers, homeName = 'home') => {
     let i = -1
     let len = routers.length
     let homeRoute = {}
     while(++i < len) {
         let item = routers[i]
         if (item.children && item.children.length) {
             let res = getHomeRoute(item.children, homeName)
             if (res.name) return res
         } else {
             if (item.name === homeName) homeRoute = item
         }
     }
     return homeRoute
 }




/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */

export const getBreadCrumbList = (route, homeRoute) => {
    let homeItem = {...homeRoute, icon: homeRoute.meta.icon }
    let routeMetched = route.matched
    if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
    let res = routeMetched.filter(item => {
        return item.meta === undefined || !item.meta.hideInBread
    }).map(item => {
        let meta = {...item.meta}
        // if (meta.title && typeof meta.title === 'function') {
        //     meta.__titleIsFunction__ = true
        //     meta.title = meta.title(route)
        // }
        let obj = {
            icon: (item.meta && item.meta.icon) || '',
            name: item.name,
            meta: meta
        }
        return obj
    })
    res = res.filter(item => {
        return !item.meta.hideInMenu
    })
    return [{...homeItem, to: homeRoute.path},...res]
}


export const getRouteTitleHandled = (route) => {
    const router = { ...route }
    let meta = { ...router.meta }
    let title = ''
    if (meta.title) {
        title = meta.title
    }
    meta.title = title
    router.meta = meta
    return router
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
    const params1 = route1.params || {}
    const params2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
  }



/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length
    let res = false
    doCustomTimes(len, (index) => {
      if (routeEqual(tagNavList[index], routeItem)) res = true
    })
    console.log(res)
    return res
  }


/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1
    while (++i < times) {
      callback(i)
    }
}


/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list)
  }
  /**
   * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
   */
  export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
  }
  

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta })
    return newList
}
  