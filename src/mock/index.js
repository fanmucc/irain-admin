import Mock from 'mockjs'
import { login, getUserInfos } from './login'


Mock.setup({
    timeout: 1000
})

Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfos)


export default Mock