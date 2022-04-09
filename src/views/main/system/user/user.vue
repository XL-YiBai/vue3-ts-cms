<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></PageContent>
    <PageModal :modalConfig="modalConfig"></PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

// 引入对于XlForm表单的配置文件，先传给PageeSearch再进而传给XlForm
import { searchFormConfig } from './config/search.config'
// 引入对XlTable展示信息的配置文件，先传给PageeContent再进而传给XlTable
import { contentTableConfig } from './config/content.config'
// 引入对于PageModal中使用的XlForm表单的配置文件
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig
    }
  }
})
</script>

<style scoped></style>
