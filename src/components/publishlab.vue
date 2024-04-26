<template>
    <div class="nav">
             <span>我发布的实验室</span> 
             <a-space>
                <a-button @click="changekey" v-if="key">返回</a-button>
                <a-button @click="exportExcel" v-if="key" type="outline">导出学生信息</a-button>
             </a-space>

    </div>
  <a-table :columns="columns" :data="labs" v-if="!key">
    <template #optional="{ record }">
      <a-button @click="toSee(record.ID)">点击查看</a-button>
    </template>
  </a-table>
  <a-table :columns="columns1" :data="RegistrationStatus" v-else>
    <template #optional="{ record }">
      <a-button @click="$modal.info({ title:'预约时段', content:record.araa.join(', ') })">点击查看</a-button>
    </template>
  </a-table>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getTeaLaboratory, getStuStatus, getExcel} from '../service/lab'
import { Message } from '@arco-design/web-vue';
import {useDownloadStore} from '../stores/download.ts'
const labs = reactive([])
const key = ref(false)
const RegistrationStatus = reactive([])
const id = ref("0")
const dstore = useDownloadStore()
const columns = [
    {
    title: '开放日期',
    dataIndex: 'date',
    },
    {
    title: '实验室位置',
    dataIndex: 'place',
    },
    {
    title: '指导老师姓名',
    dataIndex: 'name',
    },
    {
    title: '指导老师联系电话',
    dataIndex: 'phone',
    },
    {
    title: '学生报名情况',
    slotName: 'optional',
    },
];

const columns1 = [
    {
    title: '姓名',
    dataIndex: 'student_info.basic.name',
    },
    {
    title: '学号',
    dataIndex: 'student_info.sid',
    },
    {
    title: '学院',
    dataIndex: 'student_info.academy',
    },
    {
    title: '班级',
    dataIndex: 'student_info.class',
    },
    {
    title: '学生预约时间',
    slotName: 'optional',
    },
    {
    title:'项目内容',
    dataIndex: 'program_content'
    }
];

function exportExcel() {
    getExcel(id.value).then((res) => {
        if (res.code == 200) {
            downloadExcel(dstore.download + res.data)
            Message.success(res.msg)
        } else {
            Message.error(res.msg)
        }
    })
}

function downloadExcel(dir) {
    console.log (dir)
    let a = document.createElement("a");
    a.href = dir;
    a.download = "学生报名信息.xlsx";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function toSee(lid) {
    RegistrationStatus.splice(0, RegistrationStatus.length)
    id.value = lid
    getStuStatus(lid).then((res)=>{
        if (res.code == 200) {
            for (let i = 0; i < res.data.length; i++) {
                RegistrationStatus.push(res.data[i])
            }
            key.value = true
        } else {
            Message.error(res.msg)
        }
    })
}

function changekey() {
    key.value = false
}

onMounted(()=>{
    getTeaLaboratory().then((res) => {
        if (res.code == 200) {
            for (let i = 0; i < res.data.length; i++) {
                labs.push(res.data[i])
            }
        } else {
            Message.error(res.msg)
        }
    })
})
</script>

<style scoped> 
   .nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 52px;
      font-size: 16px;
      line-height: 52px;
      width: 100%;
      border-bottom: 1px solid rgb(165, 169, 175);
    }
    .nav span{
      margin-left: 40px;
    }
</style>