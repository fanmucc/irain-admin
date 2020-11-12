<template>
<div id="irain">
    <Layout class="layout">
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
            <side-menu :isCollapsed="isCollapsed" :routerList="routerList"></side-menu>
        </Sider>
        <Layout>
            <Header :style="{padding: 0}" class="layout-header-bar">
                <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
            </Header>
            <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                Content
            </Content>
        </Layout>
    </Layout>
    <!-- <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <div class="logo">
            </div>
            <side-menu theme="dark" mode="inline" :routerList="routerList" :rootSubmenuKeys="rootSubmenuKeys" :openKeys="openKeys" @on-side-openKeys="handleSideOpenKeys" @on-side-menu="handleSideMenuPush" ></side-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <header-bar :collapsed="collapsed" @on-coll-change="collChange"></header-bar>
            </a-layout-header>
            <a-layout-content
                :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
            >
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
  </a-layout>
  -->
</div>
</template>

<script>
// 引入css
// import './main.less'
// 引入antd
// import {
//     Layout,
// } from 'ant-design-vue'
// const {
//     Header,
//     Sider,
//     Content
// } = Layout;

// 引入公共文件
import store from '../store'

// 引入自定义组件
// import HeaderBar from './components/header-bar';
import SideMenu from './components/side-menu'

// 引入方法
import {
    getRootSubmenuKeys,
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
        // 'a-layout': Layout,
        // 'a-layout-sider': Sider,
        // 'a-layout-header': Header,
        // 'a-layout-content': Content,
        // HeaderBar,
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
            // collapsed: false,
            // openKeys: setSessionStorage('get', 'openKeys') ? JSON.parse(setSessionStorage('get', 'openKeys')) : []
            isCollapsed: false
        }
    },
    computed: {
        routerList() {
            return store.state.user.routerList
        },
        // rootSubmenuKeys() {
        //     return getRootSubmenuKeys(this.routerList)
        // },
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
    created() {

    },
    mounted() {

    },
    methods: {
        // // 侧边栏伸缩
        // collChange(state) {
        //     this.collapsed = state
        // },

        // // 父级自动自动伸缩
        // handleSideOpenKeys(state) {
        //     this.openKeys = state;
        //     setSessionStorage('set', 'openKeys', JSON.stringify(state))
        // },

        // // 页面跳转
        // handleSideMenuPush(key) {
        //     this.$router.push({
        //         name: key
        //     })
        // }
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        }
    }
}
</script>

<style scoped>
.layout {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background: #f5f7f9;
    overflow: hidden;
}

.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}

.menu-icon {
    transition: all .3s;
}

.rotate-icon {
    transform: rotate(-90deg);
}

.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}

.menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}

.collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
}

.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>
