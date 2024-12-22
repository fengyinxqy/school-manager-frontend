<template>
  <el-dialog
    v-model="dialogVisible"
    title="添加学科"
    width="500px"
    @close="handleClose"
    @closed="dialogVisible = false"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入学科名称"></el-input>
      </el-form-item>
      <el-form-item label="学科描述" prop="description">
        <el-input
          v-model="formData.description"
          type="textarea"
          :rows="3"
          placeholder="请输入学科描述（选填）"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/lib/axios'

const emit = defineEmits(['success'])

const dialogVisible = ref(false)

const formRef = ref(null)
const formData = reactive({
  name: '',
  description: '',
})

const rules = {
  name: [
    { required: true, message: '请输入学科名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
}

const handleClose = () => {
  formRef.value?.resetFields()
  dialogVisible.value = false
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await request.post('/subjects', formData)
        ElMessage.success('添加成功')
        emit('success')
        handleClose()
      } catch (error) {
        ElMessage.error('添加失败')
      }
    }
  })
}

onMounted(() => {
  dialogVisible.value = true
})
</script>
