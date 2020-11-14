import config from '../../config'
const { homeName } = config

import { 
    getBreadCrumbList,
    getHomeRoute
} from '../../libs/utils'

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
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}