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
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></PageContent>
    <PageModal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :modalConfig="modalConfig"
    ></PageModal>
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
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // pageModal相关的hook逻辑
    // 点击新建按钮时的回调
    const newCallback = () => {
      // 找到密码的对应配置，设置显示（新建时需要显示密码）
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    // 点击编辑按钮时的回调
    const editCallback = () => {
      // 找到密码的对应配置，设置显示（编辑时不需要显示密码）
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    // 将回调传给usePageModal，进而传给里面处理新建(handleNewData,handleEditData)和编辑的函数去回调
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
