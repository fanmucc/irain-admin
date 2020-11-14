<template>
    <Layout style="height: 100vh" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
            <side-menu :collapsed="collapsed" :routerList="routerList" @on-handleClick-menu="handleSideMenuPush">
                <div class="logo-con">
                    <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
                    <img v-show="collapsed" :src="minLogo" key="min-logo" />
                </div> 
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <HeaderBar :collapsed="collapsed" @on-coll-change="handleChangeCollapsed"></HeaderBar>
            </Header>
            <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                <router-view></router-view>
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

// 引入方法
import {
    setSessionStorage
} from '../libs/utils'

import {
    Layout,
    Sider,
    Header
} from 'view-design'

// 引入store
import { mapMutations, mapActions } from 'vuex'
// 引入路由表
import routers from '../router/routers'
export default {
    name: 'Main',
    components: {
        SideMenu,
        Layout,
        Sider,
        Header,
        HeaderBar
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
        }
    },
    mounted () {
         /**
         * @description 初始化设置面包屑导航和标签导航
         */
        this.setHomeRoute(routers)
        this.setBreadCrumb(this.$route)
    },
    methods: {
        ...mapMutations([
            'setHomeRoute',
            'setBreadCrumb'
        ]),
        // // 页面跳转
        handleSideMenuPush(key) {
            this.$router.push({
                name: key
            })
        },
        handleChangeCollapsed(state) {
            this.collapsed = state
        }
    },
    watch: {
        '$route' (newRoute) {
            this.setBreadCrumb(newRoute)
        }
    }
}
</script>
