<template>
            <a-split direction="vertical" :default-size="0.9" >
                <template #first>
                <a-table :columns="columns" :data="datas" :scroll="scrollPercent" :scrollbar="scrollbar" />
                </template>
            </a-split>
</template>

<script setup>
    import {onMounted, reactive, ref} from 'vue'
    import {getTBookingLaboratory} from '../service/lab'
    import { Message } from '@arco-design/web-vue';

    const datas = reactive([])

    const scrollbar = ref(true);
    const scrollPercent = {
      x: '200%',
      y: '100%'
    };

    const columns = [{
      title: '课程名称',
      dataIndex: 'course_name',
    }, {
      title: '实验内容',
      dataIndex: 'program_content',
    }, {
      title: '指导老师姓名',
      dataIndex: 't_name',
    },{
      title: '申请理由',
      dataIndex: 'reason',
    }, {
      title: '指导老师电话',
      dataIndex: 't_phone',
    }, {
      title: '课程编号',
        dataIndex:'course_no'
    },{
      title: '实验学时数',
      dataIndex: 'course_time',
    },{
      title: '实验个数',
      dataIndex: 'experiment_num',
    },{
      title: '实验类别',
      dataIndex: 'experiment_kind',
    },{
      title: '实验类型',
      dataIndex: 'experiment_kind2',
    },{
      title: '大纲要求',
      dataIndex: 'outline_requirements',
    },{
      title: '校区',
      dataIndex: 'campus',
    },{
      title: '实验对象',
      dataIndex: 'experiment_hu',
    },{
      title: '班级',
      dataIndex: 'class',
    },{
      title: '实验人数',
      dataIndex: 'experiment_hu_num',
    },{
        title:'可安排时间',
      dataIndex: 'raa',
    },{
      title: '周数',
      dataIndex: 'week_time',
    },{
      title: '周学时',
      dataIndex: 'week_course_time',
    },{
      title: '使用环境要求',
      dataIndex: 'environmental_requirement',
    },];

    onMounted(()=>{
        getTBookingLaboratory().then((res)=>{
            if (res.code == 200) {
                for (let i = 0; i < res.data.length; i++) {
                    datas.push(res.data[i]);
                }
                console.log(datas)
            } else {
                Message.error(res.msg)
            }
        })
    })
</script>

<style scoped>
</style>