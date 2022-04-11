<template>
  <div class="page-search">
    <!-- 直接使用v-bind不指定参数名，可以直接将对象的所有属性作为props传入组件 -->
    <XlForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <div class="header-content">
          <h2 class="header">高级检索</h2>
          <div class="search-icon">
            <el-icon><search /></el-icon>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><el-icon><refresh-left /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </XlForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RefreshLeft, Search } from '@element-plus/icons-vue'

import XlForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  components: { XlForm, RefreshLeft, Search },

  setup(props, { emit }) {
    // 定义表单的数据，使用v-model传递给子组件XLForm做双向绑定，拿到表单数据
    // 双向绑定的属性应该是由传入配置文件中的field来决定的
    // 1. 优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    // 取出传入的每一项的field值作为key，放到formOriginData因为不同页面的使用的各个表单字段名时不一样的
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    // 根据formOriginData生成响应式对象formData用于做双向数据绑定
    const formData = ref(formOriginData)

    // 2. 优化二：当用户点击重置，就让属性都清空还原
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // 属性都清空还原
      formData.value = formOriginData
      // 向外传递事件，从而重新发送请求获取所有数据
      emit('resetBtnClick')
    }

    // 3. 优化三：当用户点击搜索
    const handleQueryClick = () => {
      // 向外传递事件，并把当前搜索框搜集的数据携带过去，发送网络请求获取搜索匹配的数据
      emit('queryBtnClick', formData.value)
    }

    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>

<style scoped lang="less">
.header-content {
  display: flex;
  text-align: left;
  align-items: center;
  h2 {
    margin: 5px 4px 0px 10px;
  }
  .search-icon {
    font-size: 20px;
    padding-top: 13px;
  }
}

.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
