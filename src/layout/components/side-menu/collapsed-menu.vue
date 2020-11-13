<template>
    <Dropdown ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collased-menu-dropdown'" :transfer="hideTitle" :placement="placement">
        <a class="drop-menu-a" 
            type="text" @mouseover="handleMousemove($event, children)" 
            :style="{textAlign: !hideTitle ? 'left' : ''}">
            <Icon :size="rootIconSize" :color="textColor" :type="parentItem.meta.icon"/>
            <span class="menu-title" v-if="!hideTitle">{{parentItem.meta.title}}</span>
            <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/>
        </a>
        <DropdownMenu ref="dropdown" slot="list">
            <template v-for="child in children">
                <collapsed-menu v-if="child.children !== undefined && child.children.length !== 0" :icon-size="iconSize" :parent-item="child" :key="`drop-${child.name}`"></collapsed-menu>
                <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name"><Icon :size="iconSize" :type="child.meta.icon"/><span class="menu-title">{{ child.meta.title }}</span></DropdownItem>
            </template>
    </DropdownMenu>
    </Dropdown>
</template>
<script>
import { Dropdown, Icon, DropdownMenu, DropdownItem } from 'view-design'
export default {
    name: 'CollapsedMenu',
    components: {
        Dropdown,
        Icon,
        DropdownMenu,
        DropdownItem
    },
    props: {
         parentItem: {
            type: Object,
            default: () => {}
        },
        theme: {
            type: String,
            default: 'dark'
        },
        hideTitle: {
            type: Boolean,
            default: false
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
    computed: {
        textColor () {
            return this.theme === 'dark' ? '#fff' : '#495060'
        },
        children () {
            return this.parentItem.children
        },
    },
    data () {
        return {
            placement: 'right-end'
        }
    },
    mounted () {
        console.log(this.parentItem)
    },
    methods: {
        handleClick () {

        },
        handleMousemove (event, children) {
            const { pageY } = event
            const height = children.length * 38
            const isOverflow = pageY + height < window.innerHeight
            this.placement = isOverflow ? 'right-start' : 'right-end'
        }
    }
}
</script>