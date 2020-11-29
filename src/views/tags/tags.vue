<template>
    <div class="tags">
        <div class="tags-form">
            <Form :label-width="100">
                <FormItem label="一级标签:">
                    <ul class="one-tags">
                        <li v-for="(item) in oneLabelTags" :key="item.id">
                            <Input :ref="`inputTags${item.id}`" v-if="item.editStatus" v-model="item.name" @on-blur="enterTagsEdit(item.id)"/>
                            <span v-else @click="oneTagsEdit(item.id)">{{item.name.trim() == '' ? '编辑' : item.name}}</span>
                            <Icon v-if="item.id != 1 && !item.editStatus" type="md-create" :class="[`tags-edit${item.id}`, 'icon-tags']"/>
                        </li>
                    </ul>
                    <div class="prompt"> <i style="color: red; margin-right: .5rem">*</i> 一级标签最多为5个, 内容为空则显示编辑, 首页不可修改！</div>
                </FormItem>
                <FormItem label="二级标签:">
                    <RadioGroup v-model="radioGroupData[0].id" type="button">
                        <Radio v-for="item in radioGroupData" :key="item.id" :label="item.name" v-model="item.id" ></Radio>
                    </RadioGroup>
                    <div class="twoTags">

                    </div>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import { Form, FormItem, Input, Icon, RadioGroup, Radio, Modal, Notice, Message, Button } from 'view-design'
export default {
    name: 'Tags',
    components: {
        Form,
        FormItem,
        Input,
        Icon,
        RadioGroup,
        Radio
    },
    computed: {
        radioGroupData () {
            return this.oneLabelTags.filter(item => item.id != 1 && item.name.trim() != '')
        }
    },
    data () {
        return {
            value: '',
            oneLabelTags: [
                {
                    id: 1,
                    name: '首页',
                    editStatus: false
                },
                {
                    id: 2,
                    name: '前端',
                    editStatus: false,
                    twoTags: []
                },
                {
                    id: 3,
                    name: '插件使用',
                    editStatus: false,
                    twoTags: []
                },
                {
                    id: 4,
                    name: '',
                    editStatus: false,
                    twoTags: []
                },
                {
                    id: 5,
                    name: '',
                    editStatus: false,
                    twoTags: []
                },
            ],
        }
    },
    methods: {
        oneTagsEdit(e) {
            if (e == 1) return
            this.oneLabelTags.forEach((item ) => {
                if (item.id == e) {
                    item.editStatus = true;
                    this.inputFocus(e)
                }
            })
        },
        enterTagsEdit(e) {
            this.oneLabelTags.forEach((item) => {
                if (item.id == e) {
                    item.editStatus = false;
                }
            })
        },
        inputFocus (e) {
            let refsName = `inputTags${e}`
            this.$nextTick(() => {
                this.$refs[refsName][0].focus()
            })
        }
    }
}
</script>
<style lang="less">
.tags {
    padding: 20px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    .tags-form {
        width: 80%;
        .one-tags {
            list-style: none;
            display: flex;
            width: 55%;
            justify-content: space-between;
            li {
                padding: 0 20px;
                position: relative;
                padding: 0 5px;
                margin: 0 10px;
                flex: 1;
                span {
                    display: block;
                    flex: 1;
                    text-align: center;
                }
                .icon-tags {
                    display: none;
                }
            }
            li:hover .icon-tags {
                position: absolute;
                right: -10px;
                top: 8px;
                display: inline-block;
            }
            li:hover:first-child {
                cursor: not-allowed;
            }

        }
    }
}
.prompt {
        font-size: 12px;
        color: #C0C4CC;
    }
</style>