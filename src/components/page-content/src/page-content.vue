<template>
  <div class="page-content">
    <XlTable :listData="userList" v-bind="contentTableConfig">
      <!-- 表格头部header右侧的控制区域的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">新建用户</el-button>
        <el-button
          ><el-icon><refresh /></el-icon>刷新</el-button
        >
      </template>
      <!-- 通过具名插槽指定每一列插入内容，通过作用域插槽拿到每一项的内容，从而对数据格式化展示 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-button size="small" type="text"
            ><el-icon><edit /></el-icon>编辑</el-button
          >
          <el-button size="small" type="text"
            ><el-icon><delete /></el-icon>删除</el-button
          >
        </div>
      </template>
    </XlTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Edit, Delete, Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/store'

import XlTable from '@/base-ui/table'

export default defineComponent({
  components: { XlTable, Edit, Delete, Refresh },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    }
  },
  setup() {
    const store = useStore()
    // 调用dispatch获取该页面的数据，存到vuex
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)
    return { userList }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
