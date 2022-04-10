import { useStore } from '@/store'

// 验证当前页面(pageName)是否具有某一个按钮的权限(handleName)
export function usePermission(pageName: string, handleName: string) {
  // 先在 Vuex 中拿到该用户所有的权限
  const store = useStore()
  const permissions = store.state.login.permissions
  // 后端返回的权限格式都是类似于：system:users:create，此处表示用户管理下的新建权限
  const verifyPermission = `system:${pageName}:${handleName}` // 拼接格式

  // !! 转成Boolean值
  return !!permissions.find((item) => item === verifyPermission)
}
