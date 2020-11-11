import config from '../../config'
const { homeName } = config


const state = {
    breadCrumbList: [],  // 面包屑
    homeRoute: {},       // 初始化路由
    tagNavList: []       // tag页面切换数据
}

const mutations = {
    setBreadCrumb (state, route) {

    },
    setHomeRoute (state, route) {

    },
    addTag(state, {route, type = 'unshift'}) {
        
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}