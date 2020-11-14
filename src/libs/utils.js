import Cookies from 'js-cookie';
import config from '@/config'
export const TOKEN_KEY = 'token'
const { title, cookieExpires } = config

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


