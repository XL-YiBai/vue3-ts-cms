<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
// 引入对于XlForm表单的配置文件

import { searchFormConfig } from './config/search.config'
// 引入对XlTable展示信息的配置文件
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
