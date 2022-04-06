<template>
  <div class="page-search">
    <!-- 直接使用v-bind不指定参数名，可以直接将对象的所有属性作为props传入组件 -->
    <XlForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button
            ><el-icon><refresh-left /></el-icon>重置</el-button
          >
          <el-button type="primary"
            ><el-icon><search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </XlForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RefreshLeft, Search } from '@element-plus/icons-vue'

import XlForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  components: { XlForm, RefreshLeft, Search },

  setup() {
    // 定义表单的数据，使用v-model传递给子组件XLForm做双向绑定，拿到表单数据
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { formData }
  }
})
</script>

<style scoped>
.header {
  color: red;
}

.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
