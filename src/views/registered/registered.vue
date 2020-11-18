<template>
    <div class="irain-registered">
        <div class="registered-con">
            <h3 class="title">irain-admin</h3>
            <RegisteredForm @on-success-signup="handleSubmit"></RegisteredForm>
        </div>
    </div>
</template>
<script>
import RegisteredForm from './components/registered-form.vue'
import { mapActions } from 'vuex'
import {Message} from 'view-design'
import { postUserRegister } from '../../api/user'
export default {
    name: 'Registered',
    components: {
        RegisteredForm
    },
    methods: {
        ...mapActions([
            'handleLogin',
        ]),
        handleSubmit(state) {
            console.log(state)
            // const {userName, password} = state;
            const beforePassword = state.password
            const userName = state.userName
            const password = this.$md5(state.password)
            postUserRegister({userName, password}).then(res => {
                const {code, message} = res.data
                if (code !== 2000) {
                    Message.error(message);
                } else {
                    Message.success('注册成功, 将跳转至首页')
                    // 创建成功后直接调用登陆接口
                    const time = setTimeout(() => {
                        this.handleLogin({userName, beforePassword}).then((res) => {
                            console.log(res)
                        })
                    }, 2000)
                    
                }
            })
        }
    }
}
</script>
<style lang="less">
.irain-registered {
    min-height: 100vh;
    min-width: 100vw;
    overflow: hidden;
    background-color: #2d3a4b;
    display: flex;
    align-items: center;
    justify-content: center;
    .registered-con {
        width: 520px;
        box-sizing: border-box;
        .title {
            font-size: 26px;
            color: #eee;
            margin: 0 auto 40px auto;
            text-align: center;
            font-weight: 700;
        }
    }
}
</style>