<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="isRefresh" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useSettingStore from '@/stores/module/setting'
let settinStore = useSettingStore()

let isRefresh = ref(true)

watch(
  () => settinStore.refresh,
  () => {
    isRefresh.value = false
    nextTick(() => {
      isRefresh.value = true
    })
  }
)
</script>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
