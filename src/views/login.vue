<template>
    <a-space class="wrapper" direction="vertical">
        <div class="title">
            <a-typography-title :heading="4" >
                实验室预约平台
            </a-typography-title>
        </div>
        <a-menu mode="horizontal" :default-selected-keys="['0']" :align="align" :size="size">
            <a-menu-item key="0" @click="ispwd=true" >密码登录</a-menu-item>            
            <a-menu-item key="1" @click="ispwd=false">邮箱登录</a-menu-item>
        </a-menu>
        <div class="content">
            <div v-if="ispwd" style="display: flex; flex-direction: column; gap: 30px;">
                <a-input v-model="email" :style="{width:'320px'}" placeholder="邮箱" :error="emailError"></a-input>
                <a-input-password :style="{width:'320px'}" v-model="pwd" placeholder="密码" :error="passwordError" allow-clear/>
            </div>
            <div v-else style="display: flex; flex-direction: column; gap: 30px;">
                <a-input v-model="email" :style="{width:'320px'}" placeholder="邮箱" :error="emailError"></a-input>
                <a-input v-model="authcode" :style="{width:'320px'}" placeholder="验证码" :error="authcodeError">
                <template #append>
                    <div @click="sendCaptcha" id="btn-send-captcha">
                        {{ btnSendCaptchaText }}
                    </div>
                </template>
            </a-input>
            </div>
        </div>
        <a-button type="primary" long :style="{width:'320px'}" class="submit" @click="login">登录</a-button> 
        <div class="bottom">
            <a-link href="" @click.prevent="register">注册账号</a-link>
            <a-link href="setting">忘记密码</a-link>
        </div>    
    </a-space>
</template>
<script setup>
    import {useRouter} from 'vue-router';
    const router = useRouter()

    import {
        postSendCaptcha,
        postLoginByPwd,
        postLoginByAuth
    } from '../service/user'
    import { Message } from '@arco-design/web-vue'
    import {ref} from 'vue'

    let ispwd = ref(true)
    let pwd = ref("")
    let email = ref("")
    let authcode = ref("")

    const align = ref('center')
    const size = ref('medium')
    const btnSendCaptchaText = ref('获取验证码')
    const emailError = ref(false)
    const passwordError = ref(false)
    const authcodeError = ref(false)

    function register(){
        router.push("/register")
    }

    function login(){
        if (ispwd.value){
            emailError.value = !validateEmail(email.value)
            if (emailError.value) Message.error('请输入正确的邮箱')
            passwordError.value = !validateNotEmpty(pwd.value, '请输入密码')
            if (emailError.value || passwordError.value) return
            postLoginByPwd(email.value, pwd.value).then(
                (res)=>{
                    if (res.code !== 200) {
                        Message.error(res.msg)
                    } else {
                        Message.success(res.msg)
                        localStorage.setItem('token', res.data)
                        router.push('/')
                    }
                }
            )
        }else{
            emailError.value = !validateEmail(email.value)
            if (emailError.value) Message.error('请输入正确的邮箱')
            authcodeError.value = !validateNotEmpty(authcode.value, '请输入验证码')
            if (authcodeError.value) return
            postLoginByAuth(email.value,authcode.value).then(
                (res)=>{
                    if (res.code !== 200) {
                        Message.error(res.msg)
                    } else {
                        Message.success(res.msg)
                        localStorage.setItem('token', res.data)
                        router.push("/")
                    }
                }
            )
        }
    }


    function sendCaptcha() {
        if (btnSendCaptchaText.value !== '获取验证码') {
            return
        }
        if (validateEmail(email.value) === false) {
            Message.error('请输入邮箱')
            emailError.value = true
            return
        }
        emailError.value = false
        btnSendCaptchaText.value = 60
        const interval = setInterval(() => {
            if (btnSendCaptchaText.value === 0) {
                btnSendCaptchaText.value = '获取验证码'
                clearInterval(interval)
            } else {
                btnSendCaptchaText.value--
            }
        }, 1000)
        postSendCaptcha(email.value).then((res) => {
            if (res.code !== 200) {
                Message.error(res.msg)
            } else {
                Message.success(res.msg)
            }
        })
    }

    function validateNotEmpty(str, error) {
        const f = str.length === 0
        if (f) {
            Message.error(error)
        }
        return !f
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return emailRegex.test(email)
    }
</script>
<style scoped>
 .wrapper{
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        color: white;
        background-color: white;
        position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        width: 350px;
        height: 400px;
        padding: 40px;
        border-radius: 12px;
            outline: dashed 1px #3f4041;
    }
    .title{
        display: flex;
        justify-content: center;
        height: 50px;
        margin: 0;
        padding: 0;
    }
    .content{
        display: flex;
        justify-content: space-around;
    }
    a-typography-text{
        color:white
    }
    .submit{
        position: absolute;
            left: 0;
            right: 0;
            margin: auto;        
    }
    .bottom{
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
    }
</style>