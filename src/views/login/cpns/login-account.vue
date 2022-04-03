<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account.confg'

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })

    return { account, rules }
  }
})
</script>

<style scoped></style>
