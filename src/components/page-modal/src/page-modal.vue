<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <!-- el-dialog的默认插槽传入XlForm表单组件 -->
      <XlForm v-bind="modalConfig" v-model="formData"></XlForm>
      <!-- footer具名插槽，传入底部的东西 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import XlForm from '@/base-ui/form'

export default defineComponent({
  components: { XlForm },
  props: {
    // 使用该组件需要传入的配置信息
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    // 点击编辑按钮之后会获取当前要编辑数据，并修改defaltInfo的值，所以这里使用watch
    watch(
      () => props.defaultInfo,
      (newValue) => {
        // 最开始form表单双向绑定的数据formData是空对象，并且点击不同数据的编辑按钮，
        // 拿到的对应数据deafultInfo也不同，所以这里根据点击编辑后传入的defaultInfo重新赋值
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      // 隐藏弹出的对话框
      dialogVisible.value = false
      // 当defaultInfo为空对象时，说明是新建，否则是编辑
      if (Object.keys(props.defaultInfo).length) {
        // 编辑时
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id
        })
      } else {
        // 新建时
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      }
    }

    return { dialogVisible, formData, handleConfirmClick }
  }
})
</script>

<style scoped></style>
