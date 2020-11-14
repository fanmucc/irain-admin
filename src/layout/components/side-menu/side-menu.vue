<template>
<div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" :theme="theme" v-show="!collapsed" width="auto" :accordion="true" :active-name="$route.name" :open-names="openedNames" @on-select="handleSelect" @on-open-change="handleChangeSub">
        <template v-for="item in routerList">
            <template v-if="item.children !== undefined && item.children.length !== 0">
                <SideMenuItem :parent-item="item" :key="`menu-${item.name}`"></SideMenuItem>
            </template>
            <template v-else>
                <menu-item :name="item.name" :key="`menu-${item.name}`">
                     <Icon :type="item.meta.icon"/>
                     <span>{{item.meta.title}}</span>
                </menu-item>
            </template>
        </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="routerList">
            <template v-for="item in routerList">
                <CollapsedMenu v-if="item.children !== undefined && item.children.length !== 0" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`" @on-click="handleSelect"></CollapsedMenu>
                <tooltip 
                v-else
                transfer 
                :key="`drop-menu-${item.name}`" 
                :content="item.meta.title"  
                placement="right">
                <a class="drop-menu-a" :style="{textAlign: 'center'}" @click.prevent="handleSelect(item)">
                     <Icon :size="rootIconSize" :type="item.meta.icon" :color="textColor"/>
                </a>
                </tooltip>
            </template>
    </div>
</div>
</template>

<script>
import {
    Menu,
    MenuItem,
    Icon,
    Tooltip
} from 'view-design'
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'

import { setSessionStorage } from '../../../libs/utils'
export default {
    name: 'SideMenu',
    components: {
        Menu,
        'menu-item': MenuItem,
        Icon,
        SideMenuItem,
        Tooltip,
        CollapsedMenu
    },
    props: {
        routerList: Array,
        collapsed: Boolean,
        theme: {
            type: String,
            default: 'dark'
        },
        rootIconSize: {
            type: Number,
            default: 20
        },
        iconSize: {
            type: Number,
            default: 16
        },
    },
    data() {
        return {
            openedNames: setSessionStorage('get', 'Submenu') ? JSON.parse(setSessionStorage('get', 'Submenu')) : []
        }
    },
    computed: {
        menuitemClasses() {
            return [
                'menu-item',
                this.collapsed ? 'collapsed-menu' : ''
            ]
        },
        textColor () {
            return this.theme === 'dark' ? '#fff' : '#495060'
        }
    },
    methods: {
        handleClick(e) {
            this.$emit('on-side-menu', e.key)
            if (e.keyPath.length === 1) this.$emit('on-side-openKeys', [])
        },
        // 侧边栏点击事件
        handleSelect(e) {
            let name = ''
            if (typeof e === 'string') {
                name = e
            } else {
                name = e.name
            }
            this.$emit('on-handleClick-menu', name)
        },
        handleChangeSub(e) {
            this.openedNames = e;
            setSessionStorage('set', 'Submenu', JSON.stringify(e))
        }

    }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>