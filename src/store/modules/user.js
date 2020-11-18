import { setToken, getToken } from '../../libs/utils'
import { login } from '../../api/user'
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
                const routeList = []
                commit('setUserName', data.info.account)
                commit('setRouteList', data.nodes)
                commit('setToken', data.token)
                commit('setHasGetInfo', true)
                commit('setUserId', data.info.model.id)
                resolve(code)
            }).catch(error => {
                reject(error)
            })
        })
    },

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