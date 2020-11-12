<template>
<div id="irain">
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <div class="logo">
                <!-- <img v-show="collapsed"  src="" alt="logo">
                <img v-show="!collapsed" src="" alt="logo"> -->
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
</div>
</template>
<script>
// 引入css
import './main.less'
// 引入antd
import {
    Layout,
} from 'ant-design-vue'
const {
    Header,
    Sider,
    Content
} = Layout;

// 引入公共文件
import store from '../store'

// 引入自定义组件
import HeaderBar from './components/header-bar';
import SideMenu from './components/side-menu'

// 引入方法
import { getRootSubmenuKeys, setSessionStorage } from '../libs/utils'
export default {
    name: 'Main',
    components: {
        'a-layout': Layout,
        'a-layout-sider': Sider,
        'a-layout-header': Header,
        'a-layout-content': Content,
        HeaderBar,
        SideMenu
    },
    data () {
        return {
            collapsed: false,
            openKeys: setSessionStorage('get', 'openKeys') ? JSON.parse(setSessionStorage('get', 'openKeys')) : []
        }
    },
    computed: {
        routerList () {
            return store.state.user.routerList
        },
        rootSubmenuKeys () {
            return getRootSubmenuKeys(this.routerList)
        },
    },
    created() {

    },
    mounted () {

    },
    methods: {
        // 侧边栏伸缩
        collChange(state) {
            this.collapsed = state
        },

        // 父级自动自动伸缩
        handleSideOpenKeys (state) {
            this.openKeys = state;
            setSessionStorage('set', 'openKeys', JSON.stringify(state))
        },

        // 页面跳转
        handleSideMenuPush (key) {
            this.$router.push({name: key})
        }
    }
}
</script>