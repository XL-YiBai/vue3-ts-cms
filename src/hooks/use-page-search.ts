// 这个hook用于点击搜索和重置按钮之后，调用PageContent组件的方法，发起网络请求获取数据
import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  // 拿到PageContent组件实例，从而可以调用内部发网络请求的方法获取数据
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
