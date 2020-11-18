<template>
    <div class="tags-nav">
        <div class="close-con">
            <Dropdown transfer @on-click="handleTagsOption" style="margin-top: 7px">
                <Button size="small" type="text">
                    <Icon :size="18" type="ios-close-circle-outline" />
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="close-all">关闭所有</DropdownItem>
                    <DropdownItem name="close-others">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <ul v-show="visible" :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}" class="contextmenu">
            <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
        </ul>
         <div class="btn-con left-btn">
            <Button type="text" @click="handleScroll(240)">
                <Icon :size="18" type="ios-arrow-back" />
            </Button>
        </div>
        <div class="btn-con right-btn">
            <Button type="text" @click="handleScroll(-240)">
                <Icon :size="18" type="ios-arrow-forward" />
            </Button>
        </div>
        <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
            <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
                <transition-group name="taglist-moving-animation">
                    <Tag
                        type="dot"
                        v-for="(item, index) in list"
                        ref="tagsPageOpened"
                        :key="`tag-nav-${index}`"
                        :name="item.name"
                        :data-route-item="item"
                        @on-close="handleClose(item)"
                        @click.native="handleClick(item)"
                        :closable="item.name !== $config.homeName"
                        :color="isCurrentTag(item) ? 'primary' : 'default'"
                        @contextmenu.prevent.native="contextMenu(item, $event)"
                    >{{ item.meta.title }}</Tag>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script>
import { routeEqual } from '../../../libs/utils'
import { Dropdown, Button, Icon, DropdownMenu, DropdownItem, Tag } from 'view-design'
export default {
    name: 'TagsNav',
    components: {
        Dropdown,
        Button,
        Icon,
        DropdownMenu,
        DropdownItem,
        Tag
    },
    props: {
        value: Object,
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        currentRouteObj () {
            const { name, params, query } = this.value
            return { name, params, query }
        }
    },
    data () {
        return {
            tagBodyLeft: 0,
            rightOffset: 40,
            outerPadding: 4,
            contextMenuLeft: 0,
            contextMenuTop: 0,
            visible: false,
            menuList: {
                others: '关闭其他',
                all: '关闭所有'
            }
        }
    },
    mounted () {
        console.log(this.$config)
    },
    methods: {
        // 关闭标签
        handleTagsOption (type) {
            if (type.includes('all')) {
                // 关闭所有, 除了home首页
                let res = this.list.filter(item => item.name === this.$config.homeName)
                this.$emit('on-close', res, 'all')
            } else if (type.includes('others')) {
                 // 关闭除当前页和home页的其他页
                let res = this.list.filter(item => routeEqual(this.currentRouteObj, item) || item.name === this.$config.homeName)
                this.$emit('on-close', res, 'others', this.currentRouteObj)
                setTimeout(() => {
                    this.getTagElementByRoute(this.currentRouteObj)
                }, 100)
            }
        },
        handlescroll () {

        },
        handleScroll () {

        },
        handleClose () {

        },
        handleClick (item) {
            this.$emit('input', item)
        },
        contextMenu () {
            
        },
        isCurrentTag (item) {
            return routeEqual(this.currentRouteObj, item)
        },
        getTagElementByRoute (route) {
            this.$nextTick(() => {
                this.refsTag = this.$refs.tagsPageOpened
                this.refsTag.forEach((item, index) => {
                if (routeEqual(route, item.$attrs['data-route-item'])) {
                    let tag = this.refsTag[index].$el
                    this.moveToView(tag)
                }
                })
            })
        },
        moveToView (tag) {
            const outerWidth = this.$refs.scrollOuter.offsetWidth
            const bodyWidth = this.$refs.scrollBody.offsetWidth
            if (bodyWidth < outerWidth) {
                this.tagBodyLeft = 0
            } else if (tag.offsetLeft < -this.tagBodyLeft) {
                // 标签在可视区域左侧
                this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
            } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
                // 标签在可视区域
                this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
            } else {
                // 标签在可视区域右侧
                this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
            }
        },
    }
}
</script>
<style lang="less">
@import './tags-nav.less';
</style>