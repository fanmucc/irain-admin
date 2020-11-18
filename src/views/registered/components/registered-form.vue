<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" style="line-height: 50px">
        <FormItem prop="user" >
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">注册</Button>
        </FormItem>
    </Form>
</template>
<script>
import { Form, FormItem, Input, Icon, Button } from 'view-design'
export default {
    name: 'RegisteredForm',
    components: {
        Form,
        FormItem,
        Input,
        Icon,
        Button
    },
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('on-success-signup', {
                        userName: this.formInline.user,
                        password: this.formInline.password
                    })
                }
            })
        }
    }
}
</script>
<style lang="less">
.ivu-input, .ivu-input-default {
    height: 50px;
}
.ivu-btn, .ivu-btn-primary {
    width: 100%;
    height: 50px;
}
</style>