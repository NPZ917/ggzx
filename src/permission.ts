// 路由鉴权
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import pinia from '@/stores'
import useUserStore from '@/stores/module/user'
import setting from './setting'

nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)

router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-----${to.meta.title}`
  nprogress.start()

  const token = userStore.token
  const username = userStore.username
  if (token) {
    if (to.path == '/login') next({ path: '/' })
    else {
      if (username) next()
      else {
        try {
          await userStore.getUserInfo()
          next({ ...to })
        } catch (error) {
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') next()
    else next({ path: '/login', query: { redirect: to.path } })
  }
})

router.afterEach((to: any, from: any) => {
  nprogress.done()
})
