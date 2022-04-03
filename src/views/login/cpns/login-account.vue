<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account.confg'

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 登录逻辑实现
    const loginAction = () => {
      // 拿到表单组件实例，调用validate方法(判断表单校验是否通过，valid为boolean类型)
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('真正执行登录逻辑')
        }
      })
    }

    return { account, rules, formRef, loginAction }
  }
})
</script>

<style scoped></style>
