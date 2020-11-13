import { getParams } from '../libs/utils'

const USER = {
    admin: {
        name: 'admin',
        user_id: 1,
        token: 'admin',
        avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
        router: [
            {
                path: '/web-settings',
                name: 'WebSetting',
                meta: {
                    title: '网站设置',
                    icon: 'ios-analytics'
                }
            },
            {
                path: '/labels', 
                name: 'Labels',
                meta: {
                    title: '标签设置',
                    icon: 'ios-analytics'
                }
            }, 
            {
                path: '/article',
                name: 'ArticleList',
                meta: {
                    title: '文章列表',
                    icon: 'ios-analytics'
                },
                children: [
                    {
                        path: 'add-atricle',
                        name: 'AddAtricle',
                        meta: {
                            title: '添加列表',
                            icon: 'ios-analytics'
                        }
                    },
                    {
                        path: 'remote-atricle',
                        name: 'RemoteAtricle',
                        meta: {
                            title: '删除列表',
                            icon: 'ios-analytics'
                        }
                    }
                ]
            },
            {
                path: '/abc',
                name: 'Abc',
                meta: {
                    title: 'Abc',
                    icon: 'ios-analytics'
                },
                children: [
                    {
                        path: 'add-abc',
                        name: 'Addabc',
                        meta: {
                            title: '添加abc',
                            icon: 'ios-analytics'
                        }
                    },
                    {
                        path: 'remote-abc',
                        name: 'Remoteabc',
                        meta: {
                            title: '删除abc',
                            icon: 'ios-analytics'
                        }
                    }
                ]
            }
        ]
    }
}

export const login = req => {
    req = JSON.parse(req.body)
    return { token: USER[req.userName].token}
}

export const getUserInfos = req => {
    const params = getParams(req.url)
    return USER[params.token]
}
