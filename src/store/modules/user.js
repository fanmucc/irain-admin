import { setToken, getToken, getHasGetInfo, setHasGetInfo, routeList, transTreeData, setRouterListInLocalstorage, getRouterListFromLocalstorage } from '../../libs/utils'
import { login, irainLogout } from '../../api/user'
import Vue from 'vue'
const state = {
    userName: '',
    userId: '',
    avatar: '',
    hasGetInfo: getHasGetInfo(),
    // token: getToken(),
    routerList: getRouterListFromLocalstorage(),
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
        setHasGetInfo(newHasGetInfo)
    },
    // setToken (state, token) {
    //     state.token = token
    //     setToken(token)
    // },
    setRouteList (state, routerList) {
        state.routerList = routerList
        setRouterListInLocalstorage(routerList)
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
                const { data, code, message } = res.data
                const routeListArr = transTreeData(routeList(data.nodes))
                commit('setUserName', data.info.account)
                // 处理路由
                commit('setRouteList', routeListArr)
                // commit('setToken', data.token)
                commit('setHasGetInfo', true)
                commit('setUserId', data.info.model.id)
                resolve({code, message})
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({state, commit}) {
        return new Promise((reslove, reject) => {
            irainLogout(`Bearer+${state.token}`).then(res => {
                // commit('setToken', ''); 
                commit('setRouteList', [])
                reslove()
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}