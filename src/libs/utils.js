import Cookies from 'js-cookie';
import config from '@/config'
export const TOKEN_KEY = 'token'
const { title, cookieExpires } = config
import { objEqual } from './tools'
import {routerIconSwitch} from './routerIcon'

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
 * 设置和读取Cookies
 */

export const setCookies = (key, value) => {
    Cookies.set(key, value, { expires: cookieExpires || 1 })
}

export const getCookies = (key) => {
    const value = Cookies.get(key)
    if (value) return value
    else return false
}

/**
 * 
 * @param {*} 设置和读取登陆状态
 */
export const getHasGetInfo = () => {
    const hasGetInfo = window.localStorage.getItem('hasGetInfo') === null ? false : JSON.parse(window.localStorage.getItem('hasGetInfo'))
    return hasGetInfo
}

export const setHasGetInfo = (status) => {
    window.localStorage.hasGetInfo = JSON.stringify(status)
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

 export const getHomeRoute = (routers, homeName = 'Home') => {
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
 * @description 本地存储和获取路由数据
 */
export const setRouterListInLocalstorage = list => {
    localStorage.routerList = JSON.stringify(list)
  }
  /**
   * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
   */
  export const getRouterListFromLocalstorage = () => {
    const list = localStorage.routerList
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

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
    let res = {}
    if (list.length === 2) {
      res = getHomeRoute(list)
    } else {
      const index = list.findIndex(item => routeEqual(item, route))
      if (index === list.length - 1) res = list[list.length - 2]
      else res = list[index + 1]
    }
    return res
}

/**
 * @param {Array} routeList 路由标签
 * @description 返回具有层级的路由标签
 */

 export const routeList = (nodes) => {
     let data = []
     nodes.forEach(item => {
            if (item.type != 3) {
                const nodeObj = {
                    path: item.route,
                    meta: {
                       icon: routerIconSwitch(firstUpperCase(item.route)),
                       title: item.node_name
                    },
                    name: firstUpperCase(item.route),
                    pid: item.pid,
                    pid_id: item.model.id,
                    children: []
                }
                data.push(nodeObj)
            }
     })
     return data
 }
 
 /**
  * 
  * @param {array} 
  * @returns 树状结构数据
  */

  export const transTreeData = (routerArr) => {
      if (routerArr.length > 0) {
        const pid = 0
        const parent = findChild(pid, routerArr)
        return parent
      } else {
          return []
      }
  }

  const findChild = (pid, routerArr) => {
      var _arr = []
      for (var i = 0; i < routerArr.length; i++) {
          if (routerArr[i].type != 3) {
            if (routerArr[i].pid === pid) {
                var _obj = routerArr[i];
                _obj.children = findChild(_obj.pid_id, routerArr)
                _arr.push(_obj)
            }
          }
      }
      return _arr
  }
 /**
  * @param {String} 将路由标签转换为首字符大写的字符串
  * @description 返回字符串
  */

  const firstUpperCase = (str) => {
      let routeNameArr = str.split('/')
      let routeNameFilter = routeNameArr.filter(item => item != '');
      if (routeNameFilter.length > 1) {
          const name = []
            routeNameFilter.forEach(item => {
                name.push(upperCase(item))
          })
          return name.join('')
      } else {
        return upperCase(routeNameFilter[0])    
      }
  }

  function upperCase ([first, ...rest]) {
    return `${first.toUpperCase()}${rest.join('')}`
  }
  
