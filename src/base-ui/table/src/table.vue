<template>
  <div class="xl-table">
    <div class="header">
      <slot name="header">
        <!-- 表格名称 -->
        <div class="title">{{ title }}</div>
        <!-- 表格头部右侧可传入操作的按钮的插槽 -->
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
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
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // 数据表格头部的名称
    title: {
      type: String,
      default: ''
    },
    // 列表的数据信息
    listData: {
      type: Array,
      required: true
    },
    // 列表的表头名称配置信息
    propList: {
      type: Array,
      required: true
    },
    // 是否展示每一项的序号
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 控制展示每一项的选中，checkbox
    showSelectColumn: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectionChange'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    return { handleSelectionChange }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
