<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></PageContent>
    <PageModal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      pageName="role"
    ></PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
