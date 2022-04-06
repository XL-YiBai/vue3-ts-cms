<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <fold v-show="!isFold" />
      <expand v-show="isFold" />
    </el-icon>
    <div class="content">
      <XlBreadcrumb :breadcrumbs="breadcrumbs"></XlBreadcrumb>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import UserInfo from './user-info.vue'
import XlBreadcrumb from '@/base-ui/breadcrumb/index'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: { XlBreadcrumb, Fold, Expand, UserInfo },
  emits: ['foldChange'],
  setup(props, { emit }) {
    // isFold控制左侧菜单是否折叠
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑参数数据：[{name: , path}, ..]
    const store = useStore()

    // 调用pathMapBreadcrumbs，拿到面包屑(菜单层级)配置信息，
    // 因为要当路径或者菜单改变时重新获取面包屑，所以用computed
    const breadcrumbs = computed(() => {
      // 拿到vuex中保存的所有菜单信息
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      // 根据当前路由，拿到当前页面的路径path
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
