import config from '../../config'
const { homeName } = config

import { 
    getBreadCrumbList,
    getHomeRoute,
    getRouteTitleHandled,
    routeHasExist,
    setTagNavListInLocalstorage,
    getTagNavListFromLocalstorage,
    routeEqual,
    getNextRoute,
} from '../../libs/utils'
import router from '../../router'

const closePage = (state, route) => {
    const nextRoute = getNextRoute(state.tagNavList, route)
    state.tagNavList = state.tagNavList.filter(item => {
      return !routeEqual(item, route)
    })
    router.push(nextRoute)
}


const state = {
    breadCrumbList: [],  // 面包屑
    homeRoute: {},       // 初始化路由
    tagNavList: []       // tag页面切换数据
}

const mutations = {
    setBreadCrumb (state, route) {
        state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
        state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
        let tagList = []
        console.log(list)
        if (list) {
          tagList = [...list]
        } else tagList = getTagNavListFromLocalstorage() || []
        if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
        let homeTagIndex = tagList.findIndex(item => item.name === homeName)
        if (homeTagIndex > 0) {
          let homeTag = tagList.splice(homeTagIndex, 1)[0]
          tagList.unshift(homeTag)
        }
        state.tagNavList = tagList
        setTagNavListInLocalstorage([...tagList])
      },
      addTag (state, { route, type = 'unshift' }) {
          console.log(state.tagNavList, route)
        let router = getRouteTitleHandled(route)
        if (!routeHasExist(state.tagNavList, router)) {
            console.log(1)
          if (type === 'push') { 
              state.tagNavList.push(router)
              console.log(state.tagNavList)
           } else {
                if (router.name === homeName) state.tagNavList.unshift(router)
                else state.tagNavList.splice(1, 0, router)
          }
          console.log(state.tagNavList)
          setTagNavListInLocalstorage([...state.tagNavList])
        }
      },
      closeTag (state, route) {
        let tag = state.tagNavList.filter(item => routeEqual(item, route))
        route = tag[0] ? tag[0] : null
        if (!route) return
        closePage(state, route)
      },
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}