import { setToken } from '../../libs/utils'

const state = {
    userName: '',
    userId: '',
    hasGetInfo: false,
    token: '',
    routeList: [],
}

const mutations = {
    setUserName (state, newName) {
        state.userName = newName
    },
    setUserId (state, newId) {
        state.userId = newId
    },
    setHasGetInfo (state, newHasGetInfo) {
        state.hasGetInfo = newHasGetInfo
    },
    setToken (state, token) {
        state.token = token
        setToken(token)
    },
    setRouteList (state, routerList) {
        state.routeList = routerList
    }
}

const getters = {}

const actions = {
    
}

export default {
    state,
    mutations,
    getters,
    actions
}