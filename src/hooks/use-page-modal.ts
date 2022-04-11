import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  // 拿到PageModal实例
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  const defaultInfo = ref({})

  // 当PageContent中新建/编辑按下时，会向该组件触发，然后拿到PageModal实例修改diglogVisible为true，弹出弹框
  const handleNewData = () => {
    // 新建的时候不需要回显，所以defaultInfo置空
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 当传入了newCb时，说明页面点击新建操作还有一些额外的操作回调，比如设置密码项显示
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    console.log(pageModalRef.value)
    // 编辑操作的话，要拿到当前选中数据信息，在弹窗中回显
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 当传入了editCb时，说明页面点击编辑操作还有一些额外的操作回调，比如设置密码项隐藏
    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
