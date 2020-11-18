import { setToken, getToken, routeList, transTreeData } from '../../libs/utils'
import { login, logout } from '../../api/user'
import Vue from 'vue'
const state = {
    userName: '',
    userId: '',
    avatar: '',
    hasGetInfo: false,
    token: getToken(),
    routerList: [],
}

const mutations = {
    setUserName (state, newName) {
        state.userName = newName
    },
    setUserId (state, newId) {
        state.userId = newId
    },
    setAvatar (state, avatar) {
        state.avatar = avatar
    },
    setHasGetInfo (state, newHasGetInfo) {
        state.hasGetInfo = newHasGetInfo
    },
    setToken (state, token) {
        state.token = token
        setToken(token)
    },
    setRouteList (state, routerList) {
        state.routerList = routerList
    }
}

const getters = {}

const actions = {
    // 获取token信息
    handleLogin({commit}, {userName, beforePassword}) {
        userName = userName.trim();
        beforePassword = Vue.prototype.$md5(beforePassword)
        return new Promise((resolve, reject) => {
            login({
                userName,
                password: beforePassword
            }).then(res => {
                const { data, code } = res.data
                const routeListArr = transTreeData(routeList(data.nodes))
                commit('setUserName', data.info.account)
                // 处理路由
                console.log(routeListArr)
                commit('setRouteList', routeListArr)
                commit('setToken', data.token)
                commit('setHasGetInfo', true)
                commit('setUserId', data.info.model.id)
                resolve(code)
            }).catch(error => {
                reject(error)
            })
        })
    },
    handleLogOut({commit}, token) {
        return new Promise((reslove, reject) => {
            logout({
                token
            }).then(res => {
                commit('setToken', '')
                console.log(res)
            })
        })
    }
    // getUserSubmit({state, commit}) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             getUserInfo(state.token).then(res => {
    //                 const data = res.data
    //                 commit('setUserName', data.name)
    //                 commit('setUserId', data.user_id)
    //                 commit('setHasGetInfo', true)
    //                 commit('setRouteList', data.router)
    //                 commit('setAvatar', data.avatar)
    //                 resolve(res)
    //             }).catch(err => {
    //                 reject(err)
    //             })
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }
}

export default {
    state,
    mutations,
    getters,
    actions
}