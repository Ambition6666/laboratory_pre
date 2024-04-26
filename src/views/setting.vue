<template>
    <a-space class="wrapper" direction="vertical">
        <div class="title">
            <a-typography-title :heading="4" >
                实验室预约平台
            </a-typography-title>
        </div>
        <div class="content">
            <div style="display: flex; flex-direction: column; gap: 30px;">
                <a-input v-model="email" :style="{width:'320px'}" placeholder="邮箱" :error="emailError"></a-input>
                <a-input v-model="authcode" :style="{width:'320px'}" placeholder="验证码" :error="authcodeError">
                <template #append>
                    <div @click="sendCaptcha" id="btn-send-captcha">
                        {{ btnSendCaptchaText }}
                    </div>
                </template>
            
                </a-input>
                <a-input-password :style="{width:'320px'}" v-model="pwd" placeholder="新的密码" :error="passwordError" allow-clear/>
                <a-input-password :style="{width:'320px'}" v-model="pwd2" placeholder="请再输入新的密码" :error="password2Error" allow-clear/>    
            </div>
        </div>
        <a-button type="primary" long :style="{width:'320px'}" class="submit" @click="changePWD">修改密码</a-button> 
    </a-space>
</template>
<script setup>
    import {useRouter} from 'vue-router';
    const router = useRouter()

    import {
        postSendCaptcha,
        putUserPWD
    } from '../service/user'
    import { Message } from '@arco-design/web-vue'
    import {ref} from 'vue'

    let pwd = ref("")
    let pwd2 = ref("")
    let email = ref("")
    let authcode = ref("")

    const btnSendCaptchaText = ref('获取验证码')
    const emailError = ref(false)
    const passwordError = ref(false)
    const password2Error = ref(false)
    const authcodeError = ref(false)

    function changePWD() {
        emailError.value = !validateEmail(email.value)
        if (emailError.value) Message.error('请输入正确的邮箱')
        passwordError.value = !validateNotEmpty(pwd.value, '请输入密码')
        if (emailError.value || passwordError.value) return
        authcodeError.value = !validateNotEmpty(authcode.value, '请输入验证码')
        if (authcodeError.value) return
        password2Error.value = !validatePWD('两次密码不一致')
        if (password2Error.value) return
        putUserPWD(email.value, authcode.value, pwd.value).then((res) => {
            if (res.code == 200) {
                Message.success(res.msg)
                router.push("/login")
            } else {
                Message.error(res.msg)
            } 
        }) 
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

    function validatePWD(error) {
        return pwd.value == pwd2.value
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