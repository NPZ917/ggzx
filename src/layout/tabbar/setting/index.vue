<template>
  <el-button @click="refresh" icon="Refresh" circle></el-button>
  <el-button @click="fullScreen" icon="FullScreen" circle></el-button>
  <el-button icon="Setting" circle></el-button>
  <img :src="userStore.avatar" alt="" style="width: 24px; height: 24px; margin: 0 10px" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useSettingStore from '@/stores/module/setting'
import useUserStore from '@/stores/module/user'
import { useRouter, useRoute } from 'vue-router'

let settinStore = useSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

const refresh = () => {
  settinStore.refresh = !settinStore.refresh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}

const logout = async () => {
  await userStore.logout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped></style>
