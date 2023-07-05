import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import type { LoginForm } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN('TOKEN')
    }
  },
  actions: {
    async userLogin(data: LoginForm) {
      const result = await loginApi(data)
      if (result.code == 200) {
        this.token = result.data.token
        SET_TOKEN('TOKEN', result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  getters: {}
})

export default useUserStore
