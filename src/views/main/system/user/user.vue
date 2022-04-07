<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>

    <div class="content">
      <XlTable
        :listData="userList"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
      >
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
// 引入对于Form表单的配置文件
import { searchFormConfig } from './config/search.config'
import XlTable from '@/base-ui/table'

export default defineComponent({
  name: 'user',
  components: { PageSearch, XlTable, Edit, Delete },
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
    const userCount = computed(() => store.state.system.userCount)

    // 每一列的配置信息
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      },
      { label: '操作', minWidth: '120', slotName: 'handler' }
    ]

    // 是否展示序号
    const showIndexColumn = true

    // 控制展示是否选中的列表项，checkbox
    const showSelectColumn = true

    return {
      searchFormConfig,
      userList,
      propList,
      showIndexColumn,
      showSelectColumn
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
