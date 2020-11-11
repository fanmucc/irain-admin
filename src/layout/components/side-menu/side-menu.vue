<template>
    <div class="irain-side-menu">
        <a-menu :theme="theme" :mode="mode">
            <template v-for="(router, index) in routerList">
                <template v-if="router.children != undefined"></template>
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
// const SubMenu = Menu.SubMenu
export default {
    name: 'SideMenu',
    components: {
        'a-menu': Menu,
        'a-menu-item': MenuItem,
        // 'a-sub-menu': SubMenu,
        'a-icon': Icon
    },
    props: {
        routerList: Array,
        theme: String,
        mode: String
    },
    methods: {

    }
}
</script>