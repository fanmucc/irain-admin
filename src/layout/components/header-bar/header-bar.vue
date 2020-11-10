<template>
    <div class="irain-header">
        <div class="irain-header-le">
            <sider-trigger :collapsed="collapsed" @on-change="handleCollapsedChange"></sider-trigger>
        </div>
        <div class="irain-header-ri">2</div>
    </div>
</template>
<script>
import './header-bar.less';

import SiderTrigger from './sider-trigger'
export default {
    name: 'HeaderBar',
    components: {
        SiderTrigger
    },
    props: {
        collapsed: Boolean
    },
    methods: {
        handleCollapsedChange(state) {
            this.$emit('on-coll-change', state)
        }
    }
}
</script>