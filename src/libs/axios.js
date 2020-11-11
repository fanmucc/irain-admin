import axios from 'axios'

class HttpRequest {
    constructor(baseUrl = baseUrl) {
        this.baseUrl = baseUrl;
        this.queue = {}
    }

    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                // header头部信息
            }
        }
        return config
    }

    // 清空请求池
    destroy(url) {
        delete this.queue[url];
        if (!Object.keys(this.queue).length) {
            // 当请求池为空时
        }
    }

    // 拦截器
    interceptors(instance, url) {
         // 请求拦截
    instance.interceptors.request.use(config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true
        console.log(config, 'axios')
        return config
      }, error => {
        return Promise.reject(error)
      })
      // 响应拦截
      instance.interceptors.response.use(res => {
        this.destroy(url)
        const { data, status } = res
        return { data, status }
      }, error => {
        this.destroy(url)
        // let errorInfo = error.response
        // if (!errorInfo) {
        //   const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        //   errorInfo = {
        //     statusText,
        //     status,
        //     request: { responseURL: config.url }
        //   }
        // }
        return Promise.reject(error)
      })
    }



    request (options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

export default HttpRequest