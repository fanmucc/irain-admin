<template>
    <div class="irain-header">
        <div class="irain-header-le">
            <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollapsedChange"></sider-trigger>
            <custom-bread-crumb :list="breadCrumbList"></custom-bread-crumb>
        </div>
        <div class="irain-header-ri">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import './header-bar.less';

import SiderTrigger from './sider-trigger'
import CustomBreadCrumb from './custom-bread-crumb'
export default {
    name: 'HeaderBar',
    components: {
        SiderTrigger,
        CustomBreadCrumb
    },
    props: {
        collapsed: Boolean
    },
    computed : {
        breadCrumbList () {
            return this.$store.state.app.breadCrumbList
        }
    },
    methods: {
        // 侧边栏切换事件
        handleCollapsedChange(state) {
            this.$emit('on-coll-change', state)
        }
    }
}
</script>