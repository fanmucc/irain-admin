import { setToken, getToken } from '../../libs/utils'
import { login, getUserInfo } from '../../api/user'

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
    handleLogin({commit}, {userName, password}) {
        userName = userName.trim();
        return new Promise((resolve, reject) => {
            login({
                userName,
                password
            }).then(res => {
                const data = res.data
                commit('setToken', data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    getUserSubmit({state, commit}) {
        return new Promise((resolve, reject) => {
            try {
                getUserInfo(state.token).then(res => {
                    const data = res.data
                    commit('setUserName', data.name)
                    commit('setUserId', data.user_id)
                    commit('setHasGetInfo', true)
                    commit('setRouteList', data.router)
                    commit('setAvatar', data.avatar)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}