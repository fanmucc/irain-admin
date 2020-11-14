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
                <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
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
// import HeaderBar from './components/header-bar';
import SideMenu from './components/side-menu'

// 引入方法
import {
    setSessionStorage
} from '../libs/utils'

import {
    Layout,
    Menu,
    MenuItem,
    Sider,
    Icon,
    Header
} from 'view-design'
export default {
    name: 'Main',
    components: {
        SideMenu,
        Layout,
        Menu,
        MenuItem,
        Sider,
        Icon,
        Header
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
    methods: {
        // // 页面跳转
        handleSideMenuPush(key) {
            this.$router.push({
                name: key
            })
        },
        collapsedSider() {
            this.collapsed = !this.collapsed
        }
    }
}
</script>
