<template>
    <Layout style="height: 100vh" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
            <side-menu :collapsed="collapsed" :routerList="routerList" @on-handleClick-menu="turnToPage">
                <div class="logo-con">
                    <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
                    <img v-show="collapsed" :src="minLogo" key="min-logo" />
                </div> 
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <HeaderBar :collapsed="collapsed" @on-coll-change="handleChangeCollapsed">
                    <User :userAvatar="userAvatar"></User>
                    <Button type="text" style="color: #2d8cf0" to="/add-article">添加文章</Button>
                </HeaderBar>
            </Header>
            <Content class="main-content-con">
                 <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                    </div>
                    <Content class="content-wrapper">
                        <!-- <keep-alive :include="cacheList"> -->
                            <router-view/>
                        <!-- </keep-alive> -->
                        <!-- <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop> -->
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
// 引入css
import './main.less'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
// 引入公共文件
import store from '../store'

// 引入自定义组件
import HeaderBar from './components/header-bar';
import SideMenu from './components/side-menu'
import TagsNav from './components/tags-nav'
import User from './components/user'

// 引入方法
import {
    getNewTagList, routeEqual
} from '../libs/utils'

import {
    Layout,
    Sider,
    Header,
    Button
} from 'view-design'

// 引入store
import { mapMutations } from 'vuex'
// 引入路由表
import routers from '../router/routers'
export default {
    name: 'Main',
    components: {
        SideMenu,
        Layout,
        Sider,
        Header,
        HeaderBar,
        TagsNav,
        User,
        Button
    },
    data() {
        return {
            collapsed: false,
            minLogo,
            maxLogo,
        }
    },
    computed: {
        routerList() {
            return store.state.user.routerList
        },
        tagNavList () {
            return this.$store.state.app.tagNavList
        },
        rotateIcon() {
            return [
                'menu-icon',
                this.collapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses() {
            return [
                'menu-item',
                this.collapsed ? 'collapsed-menu' : ''
            ]
        },
        userAvatar () {
            return this.$store.state.user.avatar
        }
    },
    mounted () {
        /**
         * @description 初始化设置面包屑导航和标签导航
         */
        this.setTagNavList()
        this.setHomeRoute(routers)
        const { name, params, query, meta } = this.$route
        this.addTag({
            route: { name, params, query, meta }
        })
        this.setBreadCrumb(this.$route) 
        // 设置初始语言
        // 如果当前打开页面不在标签栏中，跳到homeName页
        if (!this.tagNavList.find(item => item.name === this.$route.name)) {
            this.$router.push({
                name: this.$config.homeName
            })
        }
    },
    methods: {
        ...mapMutations([
            'setHomeRoute',
            'setBreadCrumb',
            'addTag',
            'setTagNavList',
            'closeTag'
        ]),
        // // 页面跳转
        handleSideMenuPush(key) {
            this.turnToPage(key)
        },
        handleChangeCollapsed(state) {
            this.collapsed = state
        },
        // 标签栏事件
        handleCloseTag (res, type, route) {
            if(type  !== 'others') {
                if (type==='all') {
                    this.turnToPage(this.$config.homeName)
                } else {
                    if(routeEqual(this.$route, route)) {
                        this.closeTag(route)
                    }
                }
            }
            this.setTagNavList(res)
        },
        // tagNav点击事件
        handleClick (item) {
            this.turnToPage(item)
        },
        // 统一路由跳转
        turnToPage (route) {
            let { name, params, query } = {}
            if (typeof route === 'string') name = route
            else {
                name = route.name
                params = route.params
                query = route.query
            }
            if (name.indexOf('isTurnByHref_') > -1) {
                window.open(name.split('_')[1])
                return
            }
            console.log(name)
            // this.$router.push({
            //     name,
            //     params,
            //     query
            // })
        },
    },
    watch: {
        '$route' (newRoute) {
            const { name, query, params, meta } = newRoute
            this.addTag({
                route: { name, query, params, meta },
                type: 'push'
            })
            this.setBreadCrumb(newRoute)
            this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
        }
    }
}
</script>
