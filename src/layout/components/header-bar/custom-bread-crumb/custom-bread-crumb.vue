<template>
    <div class="left-custom">
        <Breadcrumb :style="{fontSize: `${fontSize}px`}"  @click="handleClickBreadCrumn">
            <template v-for="item in list">
                <BreadcrumbItem v-if="item.to !== undefined" :to="`/${item.to}`"  :key="`bread-crumb-${item.name}`">
                    <icon style="margin-right: 4px;" :type="item.icon || ''"/>
                    {{ item.meta.title }}
                </BreadcrumbItem>
                <BreadcrumbItem v-else  :key="`bread-crumb-${item.name}`">
                    <icon style="margin-right: 4px;" :type="item.icon || ''"/>
                    {{ item.meta.title }}
                </BreadcrumbItem>
            </template>
        </Breadcrumb>
    </div>
</template>
<script>
import './custom-bread-crumb.less'
import {
    Breadcrumb,
    BreadcrumbItem,
    Icon
} from 'view-design'

export default {
    name: 'CustomBreadCrumb',
    components: {
        Breadcrumb,
        BreadcrumbItem,
        Icon
    },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        fontSize: {
            type: Number,
            default: 14
        },
        showIcon: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClickBreadCrumn (event) {
            console.log(event)
        }
    }
}
</script>