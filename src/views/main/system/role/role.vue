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
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'

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

    // 新建角色时需要分配菜单权限，这里拿到所有菜单，然后通过插槽把菜单展示在新建和编辑弹框
    const store = useStore()
    const menus = computed(() => store.state.entireMenu) // 使用computed保证拿到获取请求之后的结果

    const otherInfo = ref({})
    // data1是所有菜单，data2是选中的菜单列表
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys // 选中的
      const halfCheckedKeys = data2.halfCheckedKeys // 半选中的（比如有子菜单，但未全选）
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
