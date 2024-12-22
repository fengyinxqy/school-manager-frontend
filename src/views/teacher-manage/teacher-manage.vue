<template>
  <div>
    <div class="flex justify-end mb-4">
      <el-button type="primary" @click="handleAdd">添加教师</el-button>
    </div>
    <el-table :data="tableData" height="700" style="width: 100%" border>
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="subject" label="学科" />
      <el-table-column prop="createdAt" label="账号创建时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-teacher-dialog
      v-if="addDialogVisible"
      @closed="addDialogVisible = false"
      @success="handleAddSuccess"
    ></add-teacher-dialog>
  </div>
</template>

<script setup>
import request from '@/lib/axios'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

import AddTeacherDialog from './components/add-teacher-dialog.vue'
import { ElMessage } from 'element-plus'

const tableData = ref([])
const addDialogVisible = ref(false)

const getTeacherList = async () => {
  try {
    const res = await request.get('/teacher/list')
    tableData.value = res.data.map(({ id, name, subject, createdAt }) => {
      return {
        id,
        name,
        subject,
        createdAt: dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss'),
      }
    })
  } catch (error) {
    ElMessage.error(error.message)
  }
}

const handleEdit = (row) => {
  console.log(row)
}

const handleDelete = (row) => {
  console.log(row)
}

const handleAdd = () => {
  addDialogVisible.value = true
}

const handleAddSuccess = () => {
  getTeacherList()
}

onMounted(() => {
  getTeacherList()
})
</script>

<style></style>
