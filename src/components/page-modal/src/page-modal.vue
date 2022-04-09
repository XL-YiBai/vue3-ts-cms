<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <!-- el-dialog的默认插槽传入XlForm表单组件 -->
      <XlForm v-bind="modalConfig" v-model="formData"></XlForm>
      <!-- footer具名插槽，传入底部的东西 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import XlForm from '@/base-ui/form'

export default defineComponent({
  components: { XlForm },
  props: {
    // 使用该组件需要传入的配置信息
    modalConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const dialogVisible = ref(true)
    const formData = ref({})
    return { dialogVisible, formData }
  }
})
</script>

<style scoped></style>
