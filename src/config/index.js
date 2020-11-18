export default {
    /**
    * @description 配置显示在浏览器标签的title
    */
    title: 'irain-admin',
    
    /**
     * @description 面包屑首页路由地址
     */
    homeName: 'Home',
    routerWhitelist: ['Login', 'Registered'],
    /**
     * @description Header页面自定义高度
     */

    headerHeader: 50,
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    baseUrl: {
        dev: 'http://129.211.48.125:8088/admin',
        pro: 'http://localhost:8080'
    }
}