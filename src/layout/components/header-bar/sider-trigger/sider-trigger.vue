<template>
    <div>
        <Icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="handleChange"
        />
    </div>
</template>
<script>
import { Icon } from 'view-design';
export default {
    name: "SiderTrigger",
    components: {
        Icon,
    },
    props: {
        collapsed: Boolean
    },
    methods: {
        handleChange () {
            this.$emit('on-change', !this.collapsed)
        }
    }
}
</script>