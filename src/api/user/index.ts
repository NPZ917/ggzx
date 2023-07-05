import request from '@/utils/request'
import type { LoginForm, LoginResponseData, UserResponseData } from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}

export const loginApi = (data: LoginForm) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)
export const getUserInfoApi = () => request.get<any, UserResponseData>(API.USERINFO_URL)
