<template>
  <div id="login">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
          <h1>HELLO</h1>
          <h2>GGZX BACKEND</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              :prefix-icon="Lock"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="login(loginFormRef)"
              :loading="loading"
              class="login-btn"
              type="primary"
              >登录</el-button
            >
            <el-button class="login-btn">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/stores/user'
import { useRouter } from 'vue-router'
import { getTime } from '@/utils/time'
import type { FormInstance, FormRules } from 'element-plus'

let $router = useRouter()
let useStore = useUserStore()
let loginFormRef = ref<FormInstance>()

// const loginForm = reactive({
//   username: '',
//   password: ''
// })

interface LoginForm {
  username: string
  password: string
}

const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
})

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) callback()
  else callback(new Error('账号长度至少5位'))
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 3) callback()
  else callback(new Error('账号长度至少3位'))
}

// const loginFormRules = {
//   // username: [{ required: true, min: 3, max: 7, message: '账号长度至少3位', trigger: 'change' }],
//   // password: [{ required: true, min: 6, max: 10, message: '密码最少6位', trigger: 'change' }]

//   // 自定义
//   username: [{ trigger: 'change', validator: validateUsername }],
//   password: [{ trigger: 'change', validator: validatePassword }]
// }

const loginFormRules = reactive<FormRules<LoginForm>>({
  username: [{ trigger: 'change', validator: validateUsername }],
  password: [{ trigger: 'change', validator: validatePassword }]
})

let loading = ref(false)
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    $router.replace('/')
    ElNotification({
      type: 'success',
      title: `HI, ${getTime()}好`,
      message: '欢迎回来'
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100vh;
  background-color: pink;
  .login-form {
    width: 50%;
    position: relative;
    top: 30vh;
    background-color: rgb(112, 112, 141);
    padding: 20px;
    border-radius: 10px;
    h1 {
      color: #fff;
      font-size: 40px;
      margin-bottom: 20px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .login-btn {
      width: 48%;
    }
  }
}
</style>
