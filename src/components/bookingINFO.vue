<template>
    <a-space class="profile">
        <a-form ref="formRef" :model="form" :rules="rules" @submit ="handleSubmit" label-align="left" :style="{width:'600px'}">
            <a-form-item field="date" label="开放日期">
                <a-date-picker v-model="form.date" style="width: 200px;" />
            </a-form-item>
            <a-form-item field="place" label="实验室位置">
                <a-input v-model="form.place" placeholder="请输入实验室位置" style="width: 200px;"/>
            </a-form-item>
            <a-form-item field="raa" label="可预约时间段">
                <a-space wrap>
                    <a-tag
                        v-for="(tag) of form.raa"
                        :key="tag"
                        color = "green"
                        closable
                        @close="handleRemove(tag)"
                        >
                        {{ tag }}
                    </a-tag>
                    <a-time-picker
                        v-if="showInput"
                            type = "time-range"
                            v-model.trim ="value"
                            @change="changeTime"
                    />
                    <a-tag
                        v-else
                        :style="{
                            backgroundColor: 'var(--color-fill-2)',
                            border: '1px dashed var(--color-fill-3)',
                            cursor: 'pointer',
                        }"
                        @click="handleEdit"
                        >
                        <template #icon>
                            <icon-plus />
                        </template>
                        <span>添加可预约时段</span>
                    </a-tag>
                </a-space>
            </a-form-item>
            <a-form-item>
                <a-space>
                    <a-button html-type="submit">提交信息</a-button>
                    <a-button @click="$refs.formRef.resetFields()">重新设置</a-button>
                </a-space>
            </a-form-item>
        </a-form>

    </a-space>
</template>

<script setup>
import {ref, reactive, nextTick} from 'vue'
import { Message } from '@arco-design/web-vue';
import { postLaboratory } from '../service/lab'
// 获取当前时间
const nowdate = ref(new Date())

const value = ref("")

const showInput = ref(false)

const handleRemove = (key) => {
      form.raa = form.raa.filter((tag) => tag !== key);
}

const handleSubmit = ({value, errors}) => {
    if (errors || form.raa.length == 0) return
    postLaboratory(form).then((res)=>{
        if (res.code == 200) {
            Message.success(res.msg)
        } else {
            Message.error(res.msg)
        }
    })
}

const handleEdit = () => {
      showInput.value = true;
}

nextTick(() => {
    if (value.value) {
        value.value.focus()
    }
})

function getNowDate() {
    let now = nowdate.value;
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) {
        month = "0" + month
    }
    return year + "-" + month + "-" + day;
}

function changeTime() {
    if (form.raa.length >= 5) {
        Message.error("时间段不能多于五个")
        return
    }
    if (value.value) {
        form.raa.push(value.value[0] + "-" + value.value[1])
    }
}

const form = reactive({
    date : getNowDate(),
    place: "",
    raa: [],
})

const rules = {
    date: [
        {
          required: true,
          message:'必须要有日期',
        },
    ],
    place:[
        {
          required: true,
          message:'必须要有地点',
        },
    ],
    raa: [
        {
            required: true,
            message:'必须要有可预约时间段',
        },
    ]
}
</script>

<style>
.profile {
    height: 300px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    padding-left: 150px;
}

.button {
    height: 60px;
    width: 300px;
}

</style>