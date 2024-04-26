<template>
    <a-table :columns="columns" :data="myBookings" :bordered="{headerCell:true}" :row-key = "myBookings.lid"> 
        <template #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset}">
            <div class="custom-filter">
                <a-space direction="vertical">
                    <a-input :model-value="filterValue[0]" @input="(value)=>setFilterValue([value])" />
                    <div class="custom-filter-footer">
                        <a-button @click="handleFilterConfirm">查找</a-button>
                        <a-button @click="handleFilterReset">清空</a-button>
                    </div>
                </a-space>
            </div>
        </template>
        <template #optional="{ record }">
            <a-button @click="$modal.info({ title:'预约时段', content:record.araa.join(', ') })">点击查看</a-button>
        </template>
    </a-table>
</template>

<style>
.custom-filter {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.custom-filter-footer {
  display: flex;
  justify-content: space-between;
}
</style>

<script setup>
    import {onMounted, reactive,  h} from 'vue'
    import {getAlreadyBookingLaboratory} from '../service/lab'
    import { Message } from '@arco-design/web-vue';
    import { IconSearch } from '@arco-design/web-vue/es/icon';
    const myBookings = reactive([])
    const columns = [
      {
        title: '开放日期',
        dataIndex: 'laboratory_info.date',
        sortable: {
          sortDirections: ['ascend', 'descend']
        },
        filterable: {
          filter: (value, record) => record.laboratory_info.date.includes(value),
          slotName: 'name-filter',
          icon: () => h(IconSearch)
        }
      },
      {
        title: '实验室信息',
        children: [
                {
                title: '实验室地点',
                dataIndex: 'laboratory_info.place'
                }, 
                {
                    title: '指导老师姓名',
                    dataIndex: 'laboratory_info.name'    
                }, 
                {
                    title:'指导老师电话',
                    dataIndex: 'laboratory_info.phone'
                }
            ],
      },
      {
        title:'预约时段',
        slotName: 'optional'
      },
      {
        title:"项目内容",
        dataIndex:'program_content'
      }
    ]


    onMounted(() => {
        myBookings.splice(0, myBookings.length)
        getAlreadyBookingLaboratory().then((res)=>{
            if (res.code == 200) {
                for (let i = res.data.length - 1; i >= 0; i--) {
                  myBookings.push(res.data[i])
                }
            } else {
                Message.error(res.msg)
            }
        })
    })

</script>