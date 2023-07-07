import { createApp } from 'vue'
import pinia from '@/stores'

import App from '@/App.vue'
import router from '@/router'
const app = createApp(App)

import '@/styles/index.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import './permission'
import { isHasButton } from '@/directive/has'

isHasButton(app)
app.use(pinia)
app.use(router)

app.mount('#app')
