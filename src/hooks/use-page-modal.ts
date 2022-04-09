import { ref } from 'vue'
import PageModal from '@/components/page-modal'

export function usePageModal() {
  // 拿到PageModal实例
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  const defaultInfo = ref({})

  // 当PageContent中新建/编辑按下时，会向该组件触发，然后拿到PageModal实例修改diglogVisible为true，弹出弹框
  const handleNewData = () => {
    if (pageModalRef.value) {
      // defaultInfo.value = {}
      pageModalRef.value.dialogVisible = true
    }
  }
  const handleEditData = (item: any) => {
    // 编辑操作的话，要拿到当前选中数据信息，在弹窗中回显
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
