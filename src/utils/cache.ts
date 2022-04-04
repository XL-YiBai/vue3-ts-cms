// 该文件封装本地缓存工具，封装localStorage
class LocalCache {
  // 设置
  setCache(key: string, value: any) {
    // 如果是对象，就换换成JSON，如果是其他类型就是字符串形式
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  // 获取
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    // 如果有值，就parse还原
    if (value) {
      return JSON.parse(value)
    }
  }
  // 删除
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  // 清空所有localStorage本地缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
