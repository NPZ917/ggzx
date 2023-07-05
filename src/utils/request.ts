import axios from 'axios'

const requset = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

requset.interceptors.request.use((config) => {
  return config
})

requset.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message = ' '
    const status = error.response.status
    switch (status) {
      case 401:
        message = '验证不通过'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '找不到了'
        break
      case 500:
        message = '服务器崩了'
        break
      default:
        message = '网络问题'
    }
    ElMessage({
      message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default requset
