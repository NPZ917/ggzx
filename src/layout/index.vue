<template>
  <div class="layout">
    <div class="layout-slider">
      <Logo />
      <el-scrollbar class="scroolbar">
        <el-menu background-color="#00152b" text-color="#fff" :default-active="routePath">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-tabbar">
      <!-- <i-ep-search></i-ep-search>
      <IEpSearch></IEpSearch>
      <IEpSearch />
      <i-ep-search /> -->
    </div>
    <div class="layout-main"><Main /></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/stores/user'
import Main from './main/index.vue'
import { useRoute } from 'vue-router'

let userStore = useUserStore()
let $route = useRoute()

const routePath = computed(() => {
  return $route.path === '/home' ? '/' : $route.path
})
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    .scroolbar {
      height: calc(100vh - $base-menu-logo-height - 40px);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout-tabbar {
    position: fixed;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    background-color: green;
    height: $base-tabbar-height;
  }
  .layout-main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    // background-color: pink;
    padding: 20px;
    overflow: auto;
  }
}
</style>
