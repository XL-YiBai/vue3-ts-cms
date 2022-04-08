<template>
  <div class="page-content">
    <XlTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1. 表格头部header右侧的控制区域的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">新建用户</el-button>
        <el-button
          ><el-icon><refresh /></el-icon>刷新</el-button
        >
      </template>

      <!-- 2. 列中的一些公共插槽 -->
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

      <!-- 3. 在page-content中动态插入剩余插槽 -->
      <!-- 这里遍历除开公共之外的插槽名slotName，使用外层template插入XlTable组件 -->
      <!-- 内层tempalte再动态定义一个插槽，这样外界可以传入插槽内容，并且会进而传入XlTable中 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </XlTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
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

    // 1. 双向绑定分页信息pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 当分页器页数和当前每页展示数据条数更改时，重新发送请求获取数据
    watch(pageInfo, () => getPageData())

    // 2. 发送网络请求：调用dispatch获取该页面的数据，存到vuex
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          // 偏移量为当前所在第几页-1 乘以 每一页展示多少条数据，第一页偏移量为0
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3. 从vuex中获取数据：因为这个getters在system模块中，所以需要这样获取，并且返回的是一个函数，
    // 可以传入pageName调用返回的函数，从Vuex中获取到对应的数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4. 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // 过滤掉公共的动态插槽
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    return { dataList, getPageData, dataCount, pageInfo, otherPropSlots }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
