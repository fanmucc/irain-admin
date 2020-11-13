<template>
    <Submenu :name="`${parentItem.name}`">
        <template slot="title">
            <Icon :type="parentItem.meta.icon || ''"></Icon>
            <span>{{parentItem.meta.title}}</span>
        </template>
        <template v-for="item in parentItem.children">
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
       
    </Submenu>
</template>
<script>
import { Submenu, Icon, MenuItem } from 'view-design'
export default {
    name: 'SideMenuItem',
    props: {
        parentItem: {
            type: Object,
            default: () => {}
        },
    },
    components: {
        Submenu,
        Icon,
        MenuItem
    }
}
</script>