<template>
    <div class="site">
        <div class="site-form">
            <Form ref="site-form" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="博客名称:" prop="siteName">
                    <Input v-model="formValidate.siteName"/>
                </FormItem>
                 <FormItem label="博客描述:" prop="description">
                    <Input v-model="formValidate.description"/>
                </FormItem>
                 <FormItem label="Logo:">
                    <template>
                        <div class="demo-upload-list" v-for="(item, index) in formValidate.logo" :key="`${item.name}`-`${index}`">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            name="image"
                            :headers=headers
                            :show-upload-list="false"
                            :default-file-list="formValidate.logo"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="500"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            :multiple="false"
                            type="drag"
                            :action=upimgPath
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal v-model="visible">
                            <img :src="formValidate.logo[0].url"  v-if="visible" style="width: 100%">
                        </Modal>
                        <div class="prompt"> <i style="color: red; margin-right: .5rem">*</i>  Logo图片为必传项，且只能上传一张</div>
                    </template>
                </FormItem>
                 <FormItem label="备案号:" prop="record">
                    <Input v-model="formValidate.record"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('site-form')">Submit</Button>
                    <Button @click="handleReset('site-form')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import { getToken } from '../../libs/utils'
import { Form, FormItem, Input, Icon, Progress, Upload, Modal, Notice, Message, Button } from 'view-design'
export default {
    name: 'Site',
    components: {
        Form,
        FormItem,
        Input,
        Icon,
        Progress,
        Upload,
        Modal,
        Button
    },
    data () {
            const validateLogo = (rule, value, callback) => {
                console.log(value, '123')
            }
            return {
                // 上传图片header信息
                headers: {
                    Authorization: getToken() ? `Bearer+${getToken()}` : ''
                },
                upimgPath: '/auth/upimg',
                imgName: '',
                visible: false,
                formValidate: {
                    siteName: '',
                    description: '',
                    logo: [],
                    record: ''
                },
                ruleValidate: {
                    siteName: [
                        { required: true, message: '博客名不能为空'}
                    ],
                    description: [
                        { required: true, message: '博客简介不能为空'}
                    ],
                    record: [
                        { required: true, message: '备案信息不能为空'}
                    ]
                }
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                this.$refs.upload.fileList = []
                this.formValidate.logo = []
            },
            handleSuccess (res, file) {
                file.url = res.data.image_url
                this.formValidate.logo = [file]
            },
            handleFormatError (file) {
                Notice.warning(`File format of ${file.name} is incorrect, please select jpg or png.`);
            },
            handleMaxSize (file) {
                Message.error(`File ${file.name} is too large, no more than 500kb.`);
            },
            handleBeforeUpload () {
                const check = this.formValidate.logo.length < 1;
                if (!check) {
                    Message.error('Logo图片只能上传一张，请先删除后再进行上传');
                }
                return check;
            },

            // 表单提交
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        mounted () {
            this.formValidate.logo = []
        }
}
</script>
<style lang="less">
    .site {
        padding: 20px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        .site-form {
            width: 50%;
        }
    }
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .prompt {
        font-size: 12px;
        color: #C0C4CC;
    }
</style>