<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>

    <div class="content">
      <XlTable :listData="userList" :propList="propList"></XlTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
// 引入对于Form表单的配置文件
import { searchFormConfig } from './config/search.config'
import XlTable from '@/base-ui/table'

export default defineComponent({
  name: 'user',
  components: { PageSearch, XlTable },
  setup() {
    const store = useStore()
    // 调用dispatch获取数据，存到vuex
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minwidth: '100' },
      { prop: 'realname', label: '真实姓名', minwidth: '100' },
      { prop: 'cellphone', label: '手机号码', minwidth: '100' },
      { prop: 'enable', label: '状态', minwidth: '100' },
      { prop: 'createAt', label: '创建时间', minwidth: '250' },
      { prop: 'updateAt', label: '更新时间', minwidth: '250' }
    ]

    return { searchFormConfig, userList, propList }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
