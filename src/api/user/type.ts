// 登录
export interface LoginForm {
  username: string
  password: string
}

interface dataType {
  token: string
}

export interface LoginResponseData {
  code: number
  message: string
  data: dataType
}

// 获取用户信息

interface User {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

export interface UserResponseData {
  code: number
  message: string
  data: User
}
