<template>
  <div class="page-search">
    <!-- 直接使用v-bind不指定参数名，可以直接将对象的所有属性作为props传入组件 -->
    <XlForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
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

  setup(props) {
    // 定义表单的数据，使用v-model传递给子组件XLForm做双向绑定，拿到表单数据
    // 双向绑定的属性应该是由传入配置文件中的field来决定的
    // 1. 优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    // 取出传入的每一项的field值作为key，放到formOriginData因为不同页面的使用的各个表单字段名时不一样的
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    // 根据formOriginData生成响应式对象formData用于做双向数据绑定
    const formData = ref(formOriginData)

    // 2. 优化二：
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
    }

    return { formData, handleResetClick }
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
