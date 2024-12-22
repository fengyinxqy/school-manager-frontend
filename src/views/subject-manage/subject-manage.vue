<template>
  <div>
    <div class="flex justify-end mb-4">
      <el-button type="primary" @click="handleAdd">添加学科</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="学科名称" width="180" />
      <el-table-column prop="description" label="学科描述" />
      <el-table-column prop="createAt" label="创建时间" />
      <el-table-column prop="updateAt" label="更新时间" />
    </el-table>
    <AddSubjectDialog
      v-if="dialogVisible"
      @success="handleAddSuccess"
      @closed="dialogVisible = false"
    ></AddSubjectDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddSubjectDialog from './components/add-subject-dialog.vue'
import request from '@/lib/axios'
import { onMounted } from 'vue'
import dayjs from 'dayjs'

const dialogVisible = ref(false)

const tableData = ref([])

const getSubjectList = async () => {
  const res = await request.get('/subjects')
  tableData.value = res.data.map(({ name, id, description, createAt, updateAt }) => {
    return {
      id,
      name,
      description,
      createAt: dayjs(createAt).format('YYYY-MM-DD HH:mm:ss'),
      updateAt: dayjs(updateAt).format('YYYY-MM-DD HH:mm:ss'),
    }
  })
}

onMounted(() => {
  getSubjectList()
})

const handleAdd = () => {
  dialogVisible.value = true
}

const handleAddSuccess = () => {
  getSubjectList()
}
</script>

<style></style>
