<template>
    <a-space size="large"  :style="{width: '950px', border: '2px solid black', padding:'20px'}"  >
        <a-form :model="form" label-align="left" ref="formRef" @submit ="handleSubmit1" :rules="rules">
            <a-row :gutter="26">
                <a-col :span="12">
                    <a-form-item field="course_name" label="课程名称" validate-trigger="input" label-col-flex="80px">
                         <a-input v-model="form.course_name" placeholder="" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item field="course_no" label="课程编号" validate-trigger="input" label-col-flex="80px">
                        <a-input v-model="form.course_no" placeholder="" />
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-form-item field="course_time" label="课时" validate-trigger="input" label-col-flex="50px">
                        <a-input-number v-model="form.course_time" placeholder="" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="26">
                <a-col :span="6">
                    <a-form-item field="experiment_num" label="实验个数" validate-trigger="input" label-col-flex="80px">
                        <a-input-number v-model="form.experiment_num" placeholder="" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item field="experiment_kind" label="实验类别" validate-trigger="input" label-col-flex="80px">
                        <a-input v-model="form.experiment_kind" placeholder="" />
                    </a-form-item>         
                </a-col>       
                <a-col :span="6">
                    <a-form-item field="experiment_kind2" label="实验类型" validate-trigger="input" label-col-flex="80px"> 
                        <a-input v-model="form.experiment_kind2" placeholder="" />
                    </a-form-item>    
                </a-col>
                <a-col :span="6">
                    <a-form-item field="outline_requirements" label="大纲要求" validate-trigger="input" label-col-flex="80px">
                        <a-select v-model="form.outline_requirements"  placeholder="">
                            <a-option>必修</a-option>
                            <a-option>选修</a-option>
                        </a-select>
                    </a-form-item>  
                </a-col>
  
            </a-row>
            <a-row :gutter="26">
                <a-col :span="6">
                    <a-form-item field="campus" label="校区" validate-trigger="input" label-col-flex="50px">
                        <a-select v-model="form.campus"  placeholder="">
                            <a-option>官渡校区</a-option>
                            <a-option>西城校区</a-option>
                            <a-option>光华校区</a-option>
                        </a-select>
                    </a-form-item>  
                </a-col>
                <a-col :span="6">
                    <a-form-item field="experiment_hu" label="实验对象" validate-trigger="input" label-col-flex="80px">
                        <a-input v-model="form.experiment_hu" placeholder="" />
                    </a-form-item>       
                </a-col>
                <a-col :span="6">
                    <a-form-item field="class" label="班级" validate-trigger="input" label-col-flex="50px">
                        <a-input v-model="form.class" placeholder="" />
                    </a-form-item> 
                </a-col>

                <a-col :span="6">
                    <a-form-item field="experiment_hu_num" label="实验人数" validate-trigger="input" label-col-flex="80px">
                        <a-input-number v-model="form.experiment_hu_num" placeholder="" />
                    </a-form-item>    
                </a-col> 
            </a-row>
            <a-row :gutter="26">
                <a-col :span="12">
                    <a-form-item field="raa" label="可安排时间" validate-trigger="input" label-col-flex="100px">
                        <a-input v-model="form.raa" placeholder="" />
                    </a-form-item> 
                </a-col>
                <a-col :span="6">
                    <a-form-item field="week_course_time" label="周课时" validate-trigger="input" label-col-flex="75px">
                        <a-input-number v-model="form.week_course_time" placeholder="" />
                    </a-form-item> 
                </a-col>
                <a-col :span="6">
                    <a-form-item field="week_time" label="周数" validate-trigger="input" label-col-flex="50px">
                        <a-input-number v-model="form.week_time" placeholder="" />
                    </a-form-item>    
                </a-col>   
       
            </a-row>
            <a-row :gutter="26">
                <a-col :span="12">
                    <a-form-item field="environmental_requirement" label="使用环境"  validate-trigger="input" label-col-flex="80px">
                        <a-input v-model="form.environmental_requirement" placeholder="" />
                        <template #help>
                            <div>使用环境(包括需使用的设备和数量)</div>
                        </template>
                    </a-form-item>  
                </a-col>
                <a-col :span="12">
                    <a-form-item field="program_content" label="实验内容" validate-trigger="input" label-col-flex="80px">
                        <a-input v-model="form.program_content" placeholder="" />
                    </a-form-item>    
                </a-col>
            </a-row>

            <a-form-item field="reason" label="申请理由" validate-trigger="input" label-col-flex="100px">
                <a-input v-model="form.reason" placeholder="" />
            </a-form-item>  
            <a-form-item>
                <a-space class="button">
                    <a-button html-type="submit" type="outline">提交申请</a-button>
                    <a-button @click="$refs.formRef.resetFields()">重新设置</a-button>
                </a-space>
            </a-form-item>
    
        </a-form>
    </a-space>
</template>

<script setup>
    import { reactive } from 'vue';
    import {postTBooking} from '../service/lab'
    import { Message } from '@arco-design/web-vue';

    const form = reactive({
        "course_name":"",
        "course_no":"",
        "course_time":0,
        "experiment_num":0,
        "experiment_kind":"",
        "experiment_kind2":"",
        "outline_requirements":"",
        "campus":"",
        "experiment_hu":"",
        "class":"",
        "experiment_hu_num":0,
        "raa":"",
        "week_time":0,
        "week_course_time":0,
        "environmental_requirement":"",
        "program_content":"",
        "reason":""
    })
    const handleSubmit1 = ({value, errors}) => {
        if (errors) return
        postTBooking(form).then((res)=>{
            if (res.code == 200) {
                Message.success(res.msg)
            } else {
                Message.error(res.msg)
            }
        })
    }

    const rules = {
    course_name:[
        {
          required: true,
          message:'课程名不能为空',
        },
        {
            type: 'string',
            maxLength: 100,
            minLength: 1,
            message:'课程名长度要符合要求'
        },
    ],
    course_no:[
        {
            required: true,
            message:'课程编号不能为空',
        },
        {
            type:'string',
            maxLength: 100,
            minLength: 1,
            message:"课程编号长度要符合要求"
        }
    ],
    course_time:[
        {
            required: true,
            message:'实验学时数不能为空',
        },
        {
            type:'number',
            max:100,
            min:1,
            message:"实验学时数要符合要求"
        }
    ],
    experiment_num:[
        {
            required: true,
            message:'实验个数不能为空',
        },
        {
            type:'number',
            max:100,
            min:1,
            message:"实验个数要符合要求"
        }
    ],
    experiment_kind:[
        {
          required: true,
          message:'实验类别不能为空',
        },
        {
            type: 'string',
            maxLength: 100,
            minLength: 1,
            message:'实验类别要符合要求'
        },
    ],
    experiment_kind2:[
        {
          required: true,
          message:'实验类型不能为空',
        },
        {
            type: 'string',
            maxLength: 100,
            minLength: 1,
            message:'实验类型要符合要求'
        },
    ],
    outline_requirements:[
        {
          required: true,
          message:'大纲要求不能为空',
        },
    ],
    campus:[
        {
          required: true,
          message:'校区不能为空',
        },
    ],
    experiment_hu:[
    {
          required: true,
          message:'实验对象不能为空',
        },
        {
            type: 'string',
            maxLength: 100,
            minLength: 1,
            message:'实验对象要符合要求'
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
    experiment_hu_num:[
        {
          required: true,
          message:'实验人数不能为空',
        },
        {
            type:'number',
            max:300,
            min:1,
            message:"实验人数要符合要求"
        }
    ],
    raa:[
        {
          required: true,
          message:'可安排的时间不能为空',
        },
        {
            type: 'string',
            maxLength: 100,
            minLength: 1,
            message:'可安排的时间长度要符合要求'
        },
    ],
    week_course_time:[
        {
          required: true,
          message:'周课时不能为空',
        },
        {
            type:'number',
            max:100,
            min:1,
            message:"周课时要符合要求"
        }
    ],
    week_time:[
        {
          required: true,
          message:'周课时不能为空',
        },
        {
            type:'number',
            max:40,
            min:1,
            message:"周数要符合要求"
        }
    ],
    environmental_requirement:[
        {
          required: true,
          message:'使用环境不能为空',
        },
        {
            type: 'string',
            maxLength: 200,
            minLength: 1,
            message:'使用环境长度要符合要求'
        },
    ],
    program_content:[
        {
          required: true,
          message:'实验内容不能为空',
        },
        {
            type: 'string',
            maxLength: 200,
            minLength: 1,
            message:'使用环境实验内容长度要符合要求'
        },
    ],
    reason:[
        {
          required: true,
          message:'申请理由不能为空',
        },
        {
            type: 'string',
            maxLength: 200,
            minLength: 1,
            message:'申请理由长度要符合要求'
        },
    ]
}
</script>

<style scoped>
    .button{
        display: flex;
        width: 75%;
        flex-direction: row;
        justify-content: space-between;
    }
</style>