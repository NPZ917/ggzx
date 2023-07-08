<template>
  <el-card class="box-card">
    <el-button @click="addTradeMark" type="primary" size="default" icon="Plus">增加品牌</el-button>
    <el-table :data="tradeMarkData" style="margin: 30px 0; width: 100%" border>
      <el-table-column prop="date" label="序号" width="80" align="center" type="index" />
      <el-table-column prop="tmName" label="品牌名称" width="180" />
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="无图" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #="{ row, $index }">
          <el-button
            @click="updateTradeMark(row)"
            type="primary"
            size="small"
            icon="Edit"
          ></el-button>
          <el-popconfirm
            width="250px"
            icon="delete"
            :title="`确定删除${row.tmName}吗？`"
            @confirm="deleteTradeMark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
      <el-form ref="ruleFormRef" :model="trademarkParams" :rules="rules" style="width: 80%">
        <el-form-item prop="tmName" label="品牌名称" label-width="80">
          <el-input v-model="trademarkParams.tmName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="80">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            accept=".jpg,.jpeg,.png,.gif"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="handleUploadSuccess"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancle">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  reqHasTradeMark,
  reqAddorUpdateTradeMark,
  reqDeleteTradeMark
} from '@/api/product/trademark'
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { tr } from 'element-plus/es/locale'

const currentPage = ref(1)
const pageSize = ref(3)
let total = ref(0)
const tradeMarkData = ref<Records>([])
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()

let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})

const getHasTrafeMark = async () => {
  const result: TradeMarkResponseData = await reqHasTradeMark(currentPage.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    tradeMarkData.value = result.data.records
  }
}

onMounted(() => {
  getHasTrafeMark()
})

const handleSizeChange = (val: number) => {
  getHasTrafeMark()
}
const handleCurrentChange = (val: number) => {
  getHasTrafeMark()
}

const addTradeMark = () => {
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  dialogFormVisible.value = true
  ruleFormRef.value?.resetFields()
}

const updateTradeMark = (row: TradeMark) => {
  ruleFormRef.value?.resetFields()
  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const uploadTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
  if (!uploadTypes.includes(file.type)) {
    ElMessage.error('请上传图片格式')
    return false
  }
  return true
}

const handleUploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  trademarkParams.logoUrl = response.data
  ruleFormRef.value?.clearValidate('logoUrl')
}

const cancle = () => {
  dialogFormVisible.value = false
}

const confirm = async () => {
  await ruleFormRef.value?.validate()
  let result: any = await reqAddorUpdateTradeMark(trademarkParams)
  if (result.code === 200) {
    dialogFormVisible.value = false
    ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
    getHasTrafeMark()
  } else {
    ElMessage.error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败')
  }
}

const validateTmName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入品牌名称'))
  } else {
    if (trademarkParams.tmName !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('tmName', () => null)
    }
    callback()
  }
}
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请上传图片'))
  } else {
    if (trademarkParams.logoUrl !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('logoUrl', () => null)
    }
    callback()
  }
}

const rules = reactive<FormRules<typeof trademarkParams>>({
  tmName: [{ validator: validateTmName, trigger: 'blur', required: true }],
  logoUrl: [{ validator: validateLogoUrl, required: true }]
})

const deleteTradeMark = async (id: number) => {
  let result = await reqDeleteTradeMark(id)
  // console.error(result)
  if (result.code === 200) {
    ElMessage.success('删除品牌成功')
    currentPage.value = tradeMarkData.value.length > 1 ? currentPage.value : currentPage.value - 1
    getHasTrafeMark()
  } else {
    ElMessage.error('删除品牌失败')
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
