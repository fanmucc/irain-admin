import axios from '../libs/api.request'

export const login = ({ userName, password }) => {
    const data = {
      userName,
      password
    }
    return axios.request({
      url: '/login',
      data,
      method: 'post'
    })
}

export const getUserInfo = (token) => {
  const params = {
    token
  }
  return axios.request({
    url: 'get_info',
    params,
    method: 'get'
  })
}