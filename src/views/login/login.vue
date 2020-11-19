<template>
    <div class="irain-login">
        <div class="login-con">
            <h3 class="title">irain-admin</h3>
            <login-form @on-success-valid="handleSubmit"></login-form>
            <p class="login-tip">输入任意用户名和密码即可 <router-link to="/registered" style="text-decoration: underline;">irain-admin 注册</router-link></p>
        </div>
    </div>
</template>
<script>
import LoginForm from './componetns/login-form'
import {Message} from 'view-design'
import { mapActions } from 'vuex'
export default {
    name: 'Login',
    components: {
        LoginForm
    },
    methods: {
        ...mapActions([
            'handleLogin',
            'getUserSubmit'
        ]),
        handleSubmit(state) {
            const {userName, password} = state;
            const beforePassword = password
            this.handleLogin({userName, beforePassword}).then((res, err) => {
                if (!res.code == 2002) {
                     Message.error(res.message)
                } else {
                    Message.success('登陆成功, 即将跳转')
                    this.$router.push({
                        name: 'Home'
                    })
                }
            })
        }
    }
}
</script>
<style lang="less">
.irain-login {
    min-height: 100vh;
    min-width: 100vw;
    overflow: hidden;
    background-color: #2d3a4b;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-con {
        width: 520px;
        box-sizing: border-box;
        .title {
            font-size: 26px;
            color: #eee;
            margin: 0 auto 40px auto;
            text-align: center;
            font-weight: 700;
        }
        .login-tip{
            font-size: 14px;
            color: #c3c3c3;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>