<template>
    <div class="irain-side-menu">
        <a-menu :theme="theme" :mode="mode" :defaultSelectedKeys="[`${this.$route.name}`]" :selectedKeys="[`${this.$route.name}`]" :open-keys="openKeys" @click="handleClick" @openChange="sideMenu">
            <template v-for="router in routerList">
                <template v-if="router.children != undefined">
                    <side-menu-item :key="`${router.name}`" :menuInfo="router"></side-menu-item>
                </template>
                <template v-else>
                    <a-menu-item :name="router.name" :key="`${router.name}`">
                        <a-icon :type="router.meta.icon" />
                        <span>{{router.meta.title}}</span>
                    </a-menu-item>
                </template>
            </template>
        </a-menu>
    </div>
</template>
<script>

import {
    Icon,
    Menu
} from 'ant-design-vue'
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
import SideMenuItem from './side-menu-item.vue'
export default {
    name: 'SideMenu',
    components: {
        'a-menu': Menu,
        'a-menu-item': MenuItem,
        'a-sub-menu': SubMenu,
        'a-icon': Icon,
        SideMenuItem
    },
    props: {
        routerList: Array,
        theme: String,
        mode: String,
        rootSubmenuKeys: Array,
        openKeys: Array
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        handleClick (e) {
            this.$emit('on-side-menu', e.key)
            if (e.keyPath.length === 1) this.$emit('on-side-openKeys', [])
        },
        sideMenu(openKeys) {
            console.log(openKeys)
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.$emit('on-side-openKeys', openKeys)
            } else {
               this.$emit('on-side-openKeys', latestOpenKey ? [latestOpenKey] : []);
            }
        }
    }
}
</script>