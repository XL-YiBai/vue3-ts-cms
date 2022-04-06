<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
// 引入对于Form表单的配置文件
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: { PageSearch },
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped></style>
