<template>
    <Layout style="height: 100vh" class="main">
        <Sider hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="left-sider" :style="{overflow: 'hidden'}">
            <side-menu :isCollapsed="isCollapsed" :routerList="routerList">
                <div class="logo-con">
                    <img v-show="!isCollapsed" :src="maxLogo" key="max-logo" />
                    <img v-show="isCollapsed" :src="minLogo" key="min-logo" />
                </div> 
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
            </Header>
            <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                Content
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
            isCollapsed: false,
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
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses() {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    methods: {
        // // 页面跳转
        // handleSideMenuPush(key) {
        //     this.$router.push({
        //         name: key
        //     })
        // }
        collapsedSider() {
            // this.$refs.side1.toggleCollapse();
            this.isCollapsed = !this.isCollapsed
        }
    }
}
</script>
