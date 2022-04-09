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
          ref="elTreeRef"
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
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
// 通过菜单拿到所有叶子节点keys的工具函数
import { mapMenusLeafKeys } from '@/utils/map-menus'

import { ElTree } from 'element-plus'
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
    // 1. 处理PageModal的hook(下面的usePageModal)，
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 使用该hook时，可以传入两个回调，这里定义当按下编辑时的回调，传入usePageModal这个hook的第二个参数中
    const editCallback = (item: any) => {
      const leafKeys = mapMenusLeafKeys(item.menuList)
      // 因为点击编辑时才弹出PageModal，此时ref拿里面的el-tree组件实例还没来得及绑定，所以需要用nextTick之后再使用实例上的方法
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

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
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
