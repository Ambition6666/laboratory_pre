<template>
    <div class="profile">
        <a-form :model="form" :rules="rules"  @submit="handleSubmitTeaINFO">
            <a-form-item field="name" label="姓名">
                <a-input v-model="form.name" placeholder="请输入你的姓名" />
            </a-form-item>
            <a-form-item field="phone" label="手机号">
                <a-input v-model="form.phone" placeholder="请输入你的手机号" />
            </a-form-item>
            <a-form-item>
                <a-button html-type = 'submit'>提交修改信息</a-button>
            </a-form-item>
            <span style="margin-left: 125px;">请保证填写信息真实有效</span>
        </a-form>
    </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useUserStore } from '../stores/user'
import { putUserInfo } from '@/service/user';
import { Message } from '@arco-design/web-vue';

const userstore = useUserStore()

const form = reactive({
    name: userstore.user.basic.name,
    phone: userstore.user.basic.phone,
})

const rules = {
    name:[
        {
          required: true,
          message:'名字不能为空',
        },
        {
            type: 'string',
            maxLength: 100,
            minLength: 1,
            message:'名字长度要符合要求'
        },
    ],
    phone:[
        {
            required: true,
            message:'手机号不能为空',
        },
        {
          validator: (value, cb) => {
            const phoneRegax = /[0-9]{11}/
            if (phoneRegax.test(value)) {
                cb()
            } else {
                cb('填写手机号不正确')
            }
          }
        },
        {
            type:'string',
            length:11,
            message:"填写手机号不正确"
        }
    ],
}

const handleSubmitTeaINFO = ({value, errors}) => {
    if (errors) return
    putUserInfo(form).then((res)=>{
        if (res.code == 200) {
            Message.success(res.msg)
        } else {
            Message.error(res.msg)
        }
    })
}

</script>

<style scoped>
.profile {
    height: 300px;
    width: 500px;
    display: flex;
    justify-content: center;
    border: 2px solid black;
    padding-right: 240px;
    padding-top: 40px;
}

</style>