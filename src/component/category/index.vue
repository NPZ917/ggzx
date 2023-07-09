<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene == 1 ? true : false"
          v-model="categoryStore.c1Id"
          @change="handlerCategoryOne"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 1 ? true : false"
          v-model="categoryStore.c2Id"
          @change="handlerCategoryTwo"
        >
          <el-option
            v-for="c1 in categoryStore.c2Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="scene == 1 ? true : false" v-model="categoryStore.c3Id">
          <el-option
            v-for="c1 in categoryStore.c3Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/stores/module/category'

defineProps(['scene'])

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getC1()
})

const handlerCategoryOne = () => {
  categoryStore.c2Arr = []
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}

const handlerCategoryTwo = () => {
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
</script>

<style scoped></style>
