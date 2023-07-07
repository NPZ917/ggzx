<template>
  <el-icon @click="changeIcon" style="margin-right: 10px; cursor: pointer">
    <component :is="settingStore.isCollapse ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in useRoute().matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useSettingStore from '@/stores/module/setting'
import { useRoute } from 'vue-router'

let settingStore = useSettingStore()

const changeIcon = () => {
  settingStore.isCollapse = !settingStore.isCollapse
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped></style>
