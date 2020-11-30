<template>
    <div class="into">
        <div class="into-form">
            <Form ref="site-form" :model="formValidate" :label-width="100">
                <FormItem label="昵称:">
                    <Input placeholder="请输入昵称" v-model="formValidate.nickname" class="into-inp"/>
                </FormItem>
                 <FormItem label="个人简介:">
                    <Input placeholder="请输入个人简介" v-model="formValidate.userIntroduction" class="into-inp"/>
                </FormItem>
                <FormItem label="个人标签:">
                    <Input placeholder="请输入个人标签" v-model="formValidate.label" class="into-inp"/>
                    <div class="prompt">个人标签请以 <i style="font-weight: 400; color: black;">' 、'</i> 进行分割</div>
                </FormItem>
                <FormItem label="个人邮箱:">
                    <Input placeholder="请输入个人邮箱地址" v-model="formValidate.email" class="into-inp"/>
                </FormItem>
                <FormItem label="Github:">
                    <Input placeholder="请输入Github地址" v-model="formValidate.github" class="into-inp"/>
                </FormItem>
                <FormItem label="掘金:">
                    <Input placeholder="请输入掘金地址" v-model="formValidate.juejin" class="into-inp"/>
                </FormItem>
                <FormItem label="简书">
                    <Input placeholder="请输入简书地址" v-model="formValidate.jianshu" class="into-inp"/>
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
import {Form, FormItem, Input, Button} from 'view-design'
export default {
    name: 'Into',
    components: {
        Form,
        FormItem, 
        Input, 
        Button
    },
    data () {
        return {
            formValidate: {
                nickname: '',
                userIntroduction: '',
                label: '',
                email: '',
                github: '',
                juejin: '',
                jianshu: ''
            },
        }
    },
    methods: {
        handleSubmit() {

        },
        handleReset() {

        }
    }
}
</script>
<style lang="less">
    .into {
        padding: 20px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        .into-form {
            width: 50%;
            .into-inp {
                // width:500px
            }
        }
    }
    .prompt {
        font-size: 12px;
        color: #C0C4CC;
    }
</style>