<template>
  <div class="layout">
    <div :class="[{ collapse: settingStore.isCollapse }, 'layout-slider']">
      <Logo />
      <el-scrollbar class="scroolbar">
        <el-menu
          :collapse="settingStore.isCollapse"
          background-color="#00152b"
          text-color="#fff"
          :default-active="routePath"
          unique-opened
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div :class="[{ collapse: settingStore.isCollapse }, 'layout-tabbar']">
      <Tabbar />
    </div>
    <div :class="[{ collapse: settingStore.isCollapse }, 'layout-main']"><Main /></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

import useUserStore from '@/stores/module/user'
import useSettingStore from '@/stores/module/setting'

let userStore = useUserStore()
let settingStore = useSettingStore()

let $route = useRoute()

const routePath = computed(() => {
  return $route.path === '/home' ? '/' : $route.path
})
</script>
<script lang="ts">
export default {
  name: 'Layout'
}
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.5s;
    .scroolbar {
      height: calc(100vh - $base-menu-logo-height - 40px);
      .el-menu {
        border-right: none;
      }
    }
    &.collapse {
      width: $base-menu-collapse-width;
    }
  }
  .layout-tabbar {
    position: fixed;
    left: $base-menu-width;
    top: 0;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.5s;
    &.collapse {
      width: calc(100vw - $base-menu-collapse-width);
      left: $base-menu-collapse-width;
    }
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
    &.collapse {
      width: calc(100vw - $base-menu-collapse-width);
      left: $base-menu-collapse-width;
    }
  }
}
</style>
