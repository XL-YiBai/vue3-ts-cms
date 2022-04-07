<template>
  <div class="page-content">
    <XlTable :listData="dataList" v-bind="contentTableConfig">
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
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    // 调用dispatch获取该页面的数据，存到vuex
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    // 因为这个getters在system模块中，所以需要这样获取，并且返回的是一个函数，
    // 可以传入pageName调用返回的函数，从而获取到对应的数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)
    return { dataList }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
