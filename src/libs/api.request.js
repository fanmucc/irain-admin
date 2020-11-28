import HttpRequest from './axios'
import config from '@/config'
const baseUrl = process.env.NOOD_ENV === 'production' ? config.baseUrl.pro: config.baseUrl.dev;
const axios = new HttpRequest(baseUrl)
export default axios