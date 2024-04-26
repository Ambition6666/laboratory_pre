<template>
    <!-- <Header></Header> -->
    <div class="main">
        <a-menu
            :style="{ width: '200px'}" 
            :default-selected-keys="['1']"
            show-collapse-button
            breakpoint="xl"
            @collapse="toggleCollapse"
            @menu-item-click ="changekey"
            theme="dark"
            class="menu"
        >
            <a-menu-item key="1" >
                <template #icon><icon-apps /></template>
                预约实验室
            </a-menu-item>
            <a-menu-item key="2" >
                <template #icon><icon-list /></template>
                我的预约
            </a-menu-item>
            <a-menu-item key="3" v-if="ifteacher">
              <template #icon> <icon-file /> </template>
                发布实验室
            </a-menu-item>
            <a-menu-item key="4" >
              <template #icon><icon-settings></icon-settings></template>
                个人设置
            </a-menu-item>
            <a-menu-item key="5" v-if="ifteacher">
              <template #icon> <icon-file /> </template>
              我发布的实验室
            </a-menu-item>
        </a-menu>
      <div class="content">
        <Header></Header>
        <div>
          <div v-if="onPage(1) && !ifteacher">
            <div class="nav">
              <span>可预约的实验室</span>
              <a-space style="
                padding-right: 30px;
              ">
                <a-select placeholder="请选择日期" :style="{width:'200px'}" v-model="selectDate" @change="changeALT">
                  <a-option v-for="(date, index) in dates" :key="index">{{date}}</a-option>
                </a-select>
              </a-space>

            </div>
            <div></div>
            <a-table :columns="columns" :data="ALT">
              <template #optional="{ record }">
                <a-button @click="handleClick(record.ID)">预约</a-button>
                <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
                  <template #title>
                    请填写预约信息
                  </template>
                  <a-space direction="vertical" size="large">
                    <a-input v-model="lab.program_content" :style="{width:'320px'}" placeholder="项目内容" ></a-input>
                    <a-select :style="{width:'320px'}" v-model="lab.raa" placeholder="请选择你想预约的时间段(可多选)" multiple
                      :scrollbar="scrollbar">
                      <a-option v-for = "(time, index) in record.raa" :key="index">{{ time }}</a-option>
                    </a-select>
                  </a-space>
                </a-modal>
              </template>
            </a-table>
          </div>
          <div v-if="onPage(1) && ifteacher">
            <div class="nav">
              <span>预约实验室</span>
            </div>
            <div class="profile1">
              <TINFO></TINFO>
            </div>
          </div>
          <div v-if="onPage(2)">
            <div class="nav">
              <span>我的预约</span>
            </div>
              <MyBooking v-if="!ifteacher"></MyBooking>
              <TMyBooking v-if="ifteacher"></TMyBooking>
          </div>
          <div v-if="onPage(3)">
            <div class="nav">
              <span>发布可预约实验室</span>
            </div>
            <div class="profile1">
              <BookingINFO></BookingINFO>
            </div>
          </div>
          <div v-if="onPage(4)" >
            <div class="nav">
             <span>个人信息</span> 
            </div>
            <div class="profile1">
              <Profile v-if="!ifteacher"></Profile>
              <TProfile v-if="ifteacher"></TProfile>
            </div>
          </div>
          <div v-if="onPage(5)">
            <PublishLAB></PublishLAB>
          </div>
        </div>
      </div>
    </div>
  
  </template>
  
  <style scoped>
    .main {
      display: flex;
      background-color: white;
      flex-direction: row;
      height: 100vh;
      width: 100vw;
      /* flex-basis: 100px; */
    }
    .content {
      display: flex;
      height: 100%;
      width: 100vw;
      flex-direction: column;
      margin: 0;
      padding: 0;
      overflow-y: auto;
    }

    .slide {
      margin: 0;
      padding: 0;
    }

    .menu {
      padding-top: 20px;
    }

    .calender {
      background-color: black;
      height: 30px;
      width: 30px;
    }

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

    .profile1 {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 50px;
    }
  </style>
  
  <script setup>
    import Header from '../components/header.vue';
    import Profile from '../components/profile.vue';
    import TProfile from '../components/teaprofile.vue';
    import MyBooking from '../components/mybooking.vue';
    import TMyBooking from '../components/tmybooking.vue';
    import BookingINFO from '../components/bookingINFO.vue';
    import PublishLAB from '../components/publishlab.vue'
    import { onMounted } from 'vue';
    import {useRouter} from 'vue-router';
    import { ref, reactive } from 'vue';
    import {
      IconApps,
      IconSettings,
      IconFile,
      IconList
    } from '@arco-design/web-vue/es/icon';
    import { getLaboratory, postBookingLaboratory } from '../service/lab'
    import { getUserInfo } from '../service/user'
    import {useUserStore} from '../stores/user'
    import { Message } from '@arco-design/web-vue';
    import TINFO from '../components/tbooking.vue'
    const collapsed = ref(false);
    const key = ref(1)
    const ALT = reactive([])
    const router = useRouter()
    const stustore = useUserStore()
    const selectDate = ref(getNowDate(new Date()))
    const lab = reactive({
      lid:"",
      program_content:"",
      raa:[],
    })

    const columns = [
      {
        title: '开放日期',
        dataIndex: 'date',
      },
      {
        title: '实验室地点',
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
      title: '操作选项',
      slotName: 'optional'
    }

    ];


    function changeALT() {
      ALT.splice(0, ALT.length)
      getLaboratory(selectDate.value).then((res) => {
        if (res.code == 200){
          for (let i = res.data.length - 1; i >= 0; i--) {
              ALT.push(res.data[i])
          }
        }   
      })
    }

    function toggleCollapse() {
        collapsed.value = !collapsed.value;
    }

    // 获取当前时间
    function getNowDate(date) {
      let now = date;
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10) {
        month = "0" + month
    }
      return year + "-" + month + "-" + day;
    }


    const dates = ref([])
    function getNextSevenDays() {
      let date = new Date();
      dates.value.push(getNowDate(date))
      for (let i = 1; i <= 6; i++)  {
        let myDate =  new Date(date.getTime() + i*24*60*60*1000);
        dates.value.push(getNowDate(myDate))
      }
    }

    const ifteacher = ref(0)

    // 获取当前页面key值
    function changekey(arg) {
        key.value = arg
    }

    //  定位当前页面
    function onPage(re) {
      return key.value == re
    }


    const visible = ref(false);

    const handleClick = (res) => {
      if (!stustore.user.isOk) {
        Message.error("请先完善个人信息")
        changekey(4)
        return
      } 
      lab.lid = res
      visible.value = true;
    };
    const handleOk = () => {
      if (lab.program_content.length == 0 ) {
        Message.error("实验室项目内容不能为空")
        return
      }
      if (lab.raa.length == 0) {
        Message.error("时间段不能为空")
        return
      }
      postBookingLaboratory(lab).then((res) => {
        if (res.code == 200) {
          Message.success(res.msg)
        } else {
          Message.error(res.msg)

        }
      })
      lab.program_content = "",
      lab.raa.splice(0, lab.raa.length)
      visible.value = false;
    };
    const handleCancel = () => {
      lab.program_content = "",
      lab.raa.splice(0, lab.raa.length)
      visible.value = false;
    }


    onMounted(() => {
        let token = localStorage.getItem("token")
        if (token) {
          getUserInfo().then((res) => {
            if (res.code == 200) {
                for(let i in res.data) {
                  stustore.user[i] = res.data[i]
                }
                ifteacher.value = stustore.user.basic.rl
            } else {
              Message.error(res.msg)
            }
          })
          getNextSevenDays()
          if(!(ALT.value)) {
            getLaboratory(selectDate.value).then((res) => {
                if (res.code == 200){
                  for (let i = res.data.length - 1; i >= 0; i--) {
                      ALT.push(res.data[i])
                  }
                }   
            })
          }
        } else {
            router.push("/login")
        }   
    })




  </script>