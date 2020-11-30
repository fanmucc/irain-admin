<template>
    <div class="user-pw">
        <div class="user-pw-form">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="110">
                <FormItem label="密码" prop="passwd">
                    <Input type="password" v-model="formCustom.passwd" />
                </FormItem>
                <FormItem label="再次确认密码" prop="passwdCheck">
                    <Input type="password" v-model="formCustom.passwdCheck" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
                    <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import {Form, FormItem, Input,Button} from 'view-design'
export default {
    name: 'Password',
    components: {
        Form, FormItem, Input,Button
    },
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'));
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'));
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('The two input passwords do not match!'));
            } else {
                callback();
            }
        };
        return {
            formCustom: {
                password: '',
                passwdCheck: ''
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
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
    }
}
</script>
<style lang="less">
    .user-pw {
        padding: 20px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        .user-pw-form {
            width: 50%;
        }
    }
</style>