<template>
  <div class="user">
    <!-- 直接使用v-bind不指定参数名，可以直接将对象的所有属性作为props传入组件 -->
    <XlForm v-bind="searchFormConfig" v-model="formData"></XlForm>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import XlForm from '@/base-ui/form'
// 引入对于XLForm的配置文件
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: { XlForm },
  setup() {
    // 定义表单的数据，使用v-model传递给子组件XLForm做双向绑定，拿到表单数据
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { searchFormConfig, formData }
  }
})
</script>

<style scoped></style>
