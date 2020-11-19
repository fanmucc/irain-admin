import axios from '../libs/api.request'
// 登陆接口
export const login = ({ userName, password }) => {
    const data = {
      account: userName,
      password
    }
    return axios.request({
      url: '/login',
      data,
      method: 'post'
    })
}

// 注册接口
export const postUserRegister = ({userName, password}) => {
  const data = {
    account: userName,
    password
  }
  return axios.request({
    url: '/register',
    data,
    method: 'post'
  })
}

// 登出
export const irainLogout = (token) => {
  const data = {
    Authorization: token
  }
  return axios.request({
    url: '/auth/logout',
    data,
    method: 'post'
  })
}