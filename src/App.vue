<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
let locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
