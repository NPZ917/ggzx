<template>
  <Category :scene="scene" />
  <el-card style="margin-top: 20px">
    <div v-show="scene == 0">
      <el-button
        @click="addAttr"
        :disabled="categoryStore.c3Id ? false : true"
        type="primary"
        size="default"
        icon="Plus"
        >增加属性</el-button
      >
      <el-table :data="attrArr" style="margin: 30px 0; width: 100%" border>
        <el-table-column label="序号" width="80" align="center" type="index" />
        <el-table-column label="属性名称" prop="attrName" width="180" />
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag
              v-for="tag in row.attrValueList"
              :key="tag.id"
              type="info"
              style="margin: 5px"
              >{{ tag.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #="{ row, $index }">
            <el-button @click="updateAttr(row)" type="primary" size="small" icon="Edit"></el-button>
            <el-popconfirm
              width="250px"
              icon="delete"
              :title="`确定删除${row.attrName}吗？`"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input v-model="attrParams.attrName" placeholder="请输入属性名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        @click="addAttrvalue"
        :disabled="attrParams.attrName ? false : true"
        type="primary"
        icon="Plus"
        >添加属性值</el-button
      >
      <el-button type="primary" @click="cancle">取消</el-button>
      <el-table :data="attrParams.attrValueList" border style="margin: 20px 0">
        <el-table-column label="序号" width="80" align="center" type="index" />
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input
              v-if="row.flag"
              @blur="toLook(row, $index)"
              placeholder="请输入属性值名称"
              v-model="row.valueName"
              :ref="(vc) => (inputArr[$index] = vc)"
              size="small"
            ></el-input>
            <div @click="toEdit(row, $index)" v-else>{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button
              @click="attrParams.attrValueList.splice($index, 1)"
              type="primary"
              icon="Delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="cancle">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddorUpdateAttrr, reqRemoveAttr } from '@/api/product/attr'
import Category from '@/component/category/index.vue'
import useCategoryStore from '@/stores/module/category'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'

const categoryStore = useCategoryStore()

let attrArr = ref<Attr[]>([])
let scene = ref(0)
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})
let inputArr = ref<any>([])

const getAttr = async () => {
  let { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}

const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3
  })
  scene.value = 1
}

const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId)

  if (result.code === 200) {
    ElMessage.success('删除成功')
    getAttr()
  } else {
    ElMessage.error('删除失败')
  }
}

watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = []
    if (!categoryStore.c3Id) return
    getAttr()
  }
)

const cancle = () => {
  scene.value = 0
}

const addAttrvalue = () => {
  if (
    attrParams.attrValueList.length > 0 &&
    attrParams.attrValueList[attrParams.attrValueList.length - 1].valueName.trim() === ''
  )
    return
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  let result = await reqAddorUpdateAttrr(attrParams)
  if (result.code === 200) {
    scene.value = 0
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    getAttr()
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === '') {
    ElMessage.error('属性值名称不可为空')
    attrParams.attrValueList.splice($index, 1)
    return
  }
  let repeat = attrParams.attrValueList.some((item) => {
    if (row !== item) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage.error('属性值名称重复')
    attrParams.attrValueList.splice($index, 1)
    return
  }
  row.flag = false
}

const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
