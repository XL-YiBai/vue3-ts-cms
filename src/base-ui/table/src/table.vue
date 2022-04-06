<template>
  <div class="xl-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <!-- 可以使用插槽在表格插入想传入的内容，这里会通过作用域插槽把每一行的内容传递出来 -->
          <template #default="scope">
            <!-- 拿到每一个数据的prop字段，prop指定放在哪一列，对应每一列的列名 -->
            <!-- 根据是否传入的插槽名，自定义每一列插入的内容，如果没有传插槽名，就默认展示下面的文本 -->
            <!-- 外界使用时通过指定插槽名自定义每一列内容，这里再通过作用域插槽把内容传递给外界 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // 列表的数据信息
    listData: {
      type: Array,
      required: true
    },
    // 列表的表头名称配置信息
    propList: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
