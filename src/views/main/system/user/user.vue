<template>
  <div class="user">
    <!-- 直接使用v-bind不指定参数名，可以直接将对象的所有属性作为props传入组件 -->
    <XlForm v-bind="searchFormConfig"></XlForm>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import XlForm from '@/base-ui/form'
// 引入对于XLForm的配置文件
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: { XlForm },
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped></style>
