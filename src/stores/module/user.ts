import { defineStore } from 'pinia'
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import { loginApi, getUserInfoApi, logoutApi } from '@/api/user'
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from '@/api/user/type'
import type { UserState } from '../type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes'
import router from '@/router'

const filter = (asyncRoutes: any, routes: any) => {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filter(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN('TOKEN'),
      menuRoutes: constantRoutes,
      username: '',
      avatar: ''
    }
  },
  actions: {
    async userLogin(data: LoginFormData) {
      const result: LoginResponseData = await loginApi(data)
      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN('TOKEN', result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async getUserInfo() {
      const result: UserInfoResponseData = await getUserInfoApi()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        const userRoutes = filter(cloneDeep(asyncRoutes), result.data.routes)
        this.menuRoutes = [...constantRoutes, ...userRoutes, ...anyRoutes]
        const asyncUserRoutes = [...userRoutes, ...anyRoutes]
        asyncUserRoutes.forEach((route: any) => {
          router.addRoute(route)
        })

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async logout() {
      const result: any = await logoutApi()
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  getters: {}
})

export default useUserStore

// const useUserStore = defineStore('User', () => {
//   const token = ref(GET_TOKEN('TOKEN'))
//   async function userLogin(data: LoginForm) {
//     const result = await loginApi(data)
//     if (result.code == 200) {
//       token.value = result.data.token
//       SET_TOKEN('TOKEN', result.data.token)
//       return 'ok'
//     } else {
//       return Promise.reject(new Error(result.message))
//     }
//   }

//   const menuRoutes = ref(constantRoutes)

//   const userInfo = ref({})
//   const getUserInfo = async () => {
//     const result = await getUserInfoApi()
//     if (result.code == 200) {
//       userInfo.value = result.data
//       return 'ok'
//     } else {
//       return Promise.reject(new Error(result.message))
//     }
//   }

//   return {
//     token,
//     userLogin,
//     menuRoutes,
//     userInfo,
//     getUserInfo
//   }
// })

// export default useUserStore
