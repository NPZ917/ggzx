<template>
  <div class="logo">
    <img v-if="setting.logoHidden" :src="setting.logo" alt="" />
    <p v-if="!settingStore.isCollapse">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useSettingStore from '@/stores/module/setting'
let settingStore = useSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  img {
    height: $base-menu-logo-height;
  }
  p {
    color: #fff;
    font-size: $base-logo-title-fontSize;
    margin-left: 20px;
  }
}
</style>
