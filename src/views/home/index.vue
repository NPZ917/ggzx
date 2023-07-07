<template>
  <div>{{ userStore.username }}</div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/module/user'
// import { onMounted } from 'vue'

let userStore = useUserStore()

// onMounted(() => {
//   userStore.getUserInfo()
// })
</script>

<style scoped></style>
