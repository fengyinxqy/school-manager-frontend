<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增教师"
    width="500px"
    @close="handleClose"
    @closed="dialogVisible = false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" disabled></el-input>
      </el-form-item>
      <el-form-item label="学科" prop="subjectId">
        <el-select v-model="form.subjectId" placeholder="请选择学科">
          <el-option
            v-for="item in subjectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
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

const form = reactive({
  username: '',
  password: '123456',
  subjectId: '',
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  subjectId: [{ required: true, message: '请选择学科', trigger: 'change' }],
}

const subjectList = ref([])

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await request.post('/teacher/create', form)
        ElMessage.success('添加教师成功')
        emit('success')
        handleClose()
      } catch (error) {
        ElMessage.error('添加教师失败')
      }
    }
  })
}

// 关闭弹窗
const handleClose = () => {
  dialogVisible.value = false
  formRef.value?.resetFields()
}

const getSubjectList = async () => {
  const res = await request.get('/subjects')
  subjectList.value = res.data.map(({ name, id }) => {
    return {
      name,
      id,
    }
  })
}

onMounted(() => {
  dialogVisible.value = true
  getSubjectList()
})
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
