<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account.confg'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const account = reactive({
      // 如果本地缓存有，就取本地缓存，没有就取空串
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 登录逻辑实现
    const loginAction = (isKeepPassword: boolean) => {
      // 拿到表单组件实例，调用validate方法(该方法接收表单校验是否通过的结果，参数valid为boolean类型)
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1. 判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.
        }
      })
    }

    return { account, rules, formRef, loginAction }
  }
})
</script>

<style scoped></style>
