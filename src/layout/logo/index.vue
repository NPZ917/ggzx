<template>
  <div class="logo">
    <img v-if="setting.logoHidden" :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  img {
    height: $base-menu-logo-height;
    margin-right: 20px;
  }
  p {
    color: #fff;
    font-size: $base-logo-title-fontSize;
  }
}
</style>
