import request from '@/utils/request'
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from './type'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

export const loginApi = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)
export const getUserInfoApi = () => request.get<any, UserInfoResponseData>(API.USERINFO_URL)
export const logoutApi = () => request.post<any, any>(API.LOGOUT_URL)
