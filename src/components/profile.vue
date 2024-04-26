<template>
    <div class="profile">
        <a-form :model="form" :rules="rules"  @submit="handleSubmitINFO">
            <a-form-item field="name" label="姓名">
                <a-input v-model="form.name" placeholder="请输入你的姓名" />
            </a-form-item>
            <a-form-item field="sid" label="学号">
                <a-input v-model="form.sid" placeholder="请输入你的学号" />
            </a-form-item>
            <a-form-item field="phone" label="手机号">
                <a-input v-model="form.phone" placeholder="请输入你的手机号" />
            </a-form-item>
            <a-form-item field="academy" label="院系">
                <a-input v-model="form.academy" placeholder="请输入你所在学院" />
            </a-form-item>
            <a-form-item field="class" label="班级">
                <a-input v-model="form.class" placeholder="请输入你所在班级" />
            </a-form-item>
            <a-form-item>
                <a-button html-type = 'submit'>提交修改信息</a-button>
            </a-form-item>
            <span style="margin-left: 125px;">请保证填写信息真实有效,学院填写如:计算机学院, 班级填写如:计算机22-3</span>
        </a-form>
    </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useUserStore, } from '../stores/user'
import { putUserInfo } from '@/service/user';
import { Message } from '@arco-design/web-vue';

const userstore = useUserStore()

const form = reactive({
    name: userstore.user.basic.name,
    sid: userstore.user.sid,
    phone: userstore.user.basic.phone,
    academy: userstore.user.academy,
    class: userstore.user.class,
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
    sid:[
        {
            required: true,
            message:'学号不能为空',
        },
        {
          validator: (value, cb) => {
            const sidRegax = /[0-9]{11}/
            if (sidRegax.test(value)) {
                cb()
            } else {
                cb('填写学号不正确')
            }
          }
        },
        {
            type:'string',
            length:11,
            message:"填写学号不正确"
        }
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
    academy:[
        {
          required: true,
          message:'学院不能为空',
        },
        {
            type: 'string',
            maxLength: 100,
            minLength: 1,
            message:'学院长度要符合要求'
        },
    ],
    class:[
        {
          required: true,
          message:'班级不能为空',
        },
        {
            type: 'string',
            maxLength: 100,
            minLength: 1,
            message:'班级长度要符合要求'
        },
    ],
}

const handleSubmitINFO = ({value, errors}) => {
    if (errors) return
    putUserInfo(form).then((res)=>{
        if (res.code == 200) {
            userstore.user.isOk = true
            userstore.user.academy = form.academy
            userstore.user.class = form.class
            userstore.user.sid = form.sid
            userstore.user.basic.phone = form.phone
            userstore.user.basic.name = form.name
            Message.success(res.msg)
        } else {
            Message.error(res.msg)
        }
    })
}

</script>

<style scoped>
.profile {
    height: 600px;
    width: 500px;
    display: flex;
    justify-content: center;
    border: 2px solid black;
    padding-right: 240px;
    padding-top: 40px;
}

</style>