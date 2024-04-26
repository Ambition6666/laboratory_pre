<template>
    <div class="header">
        <span style="margin-left: 40px;">
            广东石油化工学院实验室预约平台
        </span>
        <a-dropdown position="br" trigger="hover"  >
                <Avatar
                 :avatar = avatar
                :size = 40
                class="avatar"
                 ></Avatar>
                <template #content>
                  <a-doption @click="router.push(`/setting`)">
                    <template #icon> <icon-settings /> </template>
                    修改密码
                  </a-doption>
                  <a-doption @click="logout">
                    <template #icon> <icon-export /> </template>
                    退出登录
                  </a-doption>
                </template>
        </a-dropdown>
    </div>
</template>

<style>
    .header {    
        display: flex;
        font-size: 20px;
        line-height: 64px;
        height: 64px;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 1px;
        border-bottom: 1px solid rgb(165, 169, 175);
    }

    .avatar{
        margin-right: 30px;
    }

</style>

<script setup>
    import {useRouter} from 'vue-router';
    import { IconFile ,IconSettings,IconExport} from '@arco-design/web-vue/es/icon';
    import { Message } from '@arco-design/web-vue';
    import Avatar from '@/components/avatar.vue'
    const router = useRouter()

    let avatar = "/avatar.png"
    function logout() {
      localStorage.removeItem("token")
      Message.success("已退出登录")
      router.push("/login")
    }
</script>