<template>
    <div class="wrapper">
        <div class="title">
            <a-typography-title :heading="4" >
                实验室预约平台
            </a-typography-title>
        </div>
        <a-space class="menu">
            <a-menu mode="horizontal" :default-selected-keys="['0']" :align="align" style="width: 300px; display: flex; justify-content: space-around;">
                <a-menu-item key="0" @click="key = '0'" >学生注册</a-menu-item>            
                <a-menu-item key="1" @click="key = '1'" >教师注册</a-menu-item>
            </a-menu>
        </a-space>

        <div class="content">
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <a-input v-model="email" :style="{width:'320px'}" placeholder="邮箱" :error="emailError"></a-input>
                <a-input v-model="name" :style="{width:'320px'}" placeholder="姓名" :error="nameError"></a-input>
                <a-input v-model="sid" :style="{width:'320px'}" placeholder="学号" :error="sidError" v-if="key == '0'"></a-input>
                <a-input v-model="phone" :style="{width:'320px'}" placeholder="手机号" :error="phoneError" v-if="key=='1'"></a-input>
                <a-input-password :style="{width:'320px'}" v-model="pwd" placeholder="密码" :error="passwordError" allow-clear/>
                <a-input v-model="authcode" :style="{width:'320px'}" placeholder="验证码" :error="authcodeError">
                    <template #append>
                        <div @click="sendCaptcha" id="btn-send-captcha">
                            {{ btnSendCaptchaText }}
                        </div>
                    </template>
                </a-input>
            </div>
        </div>
        <a-button type="primary" long :style="{width:'320px'}" @click="register">注册/登录</a-button>
    </div>
</template>
<script setup>
    import {ref} from 'vue'
    import {
        postSendCaptcha,
        postRegister,
    } from '../service/user'
    import { Message } from '@arco-design/web-vue'
    import {useRouter} from 'vue-router';
    const router = useRouter()
    const key = ref('0')
    
    let pwd = ref("")
    let email = ref("")
    let authcode = ref("")
    let name = ref("")
    let phone = ref("")
    let sid = ref("")
    const emailError = ref(false)
    const btnSendCaptchaText = ref('获取验证码')
    const passwordError = ref(false)
    const authcodeError = ref(false)
    const nameError = ref(false)
    const sidError = ref(false)
    const phoneError = ref(false)

    function register(){
        emailError.value = !validateEmail(email.value)
        if (emailError.value) Message.error('请输入正确的邮箱')
        passwordError.value = !validateNotEmpty(pwd.value, '请输入密码')
        if (emailError.value || passwordError.value) return
        authcodeError.value = !validateNotEmpty(authcode.value, '请输入验证码')
        if (authcodeError.value) return
        nameError.value = !validatName(name.value)
        if (nameError.value) {
            Message.error("请输入正确的名字")
            return
        }
        if (key.value == '1') {
            phoneError.value = !validatePhone(phone.value)
            if (phoneError.value) {
                Message.error("请输入正确的手机号")
                return
            }
        } else {
            sidError.value = !validateSID(sid.value)
            if (sidError.value) {
                Message.error("请输入正确的学号")
                return
            }
        }

        postRegister(email.value,pwd.value,authcode.value, name.value, phone.value, sid.value, key.value).then(
            (res) => {
                if (res.code == 200){
                    Message.success(res.msg)
                    router.push('/login')
                }else{
                    Message.error(res.msg)
                }
            }
        )
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

    function validatName(name) {
        if (name.length > 0 && name.length <= 20 ) return true
        return false
    }

    function validateSID(sid) {
        const sidRegax = /[0-9]{11}/
        return sidRegax.test(sid)
    }

    function validatePhone(phone) {
        const phoneRegax = /[0-9]{11}/
        return phoneRegax.test(phone)
    }
</script>
<style scoped>
 .wrapper{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        color: white;
        background-color: white;
        position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        width: 350px;
        height: 500px;
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
        margin-bottom: 0;
    }
    a-typography-text{
        color:white
    }
    .menu{
        margin-left: 100px;
        width: 350px;
        width: 100%;
    }
</style>