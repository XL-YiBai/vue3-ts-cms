// 该文件用于注册一些全局的属性
import { App } from 'vue'

import { formatUtcString } from '@/utils/data-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    // 格式化时间的函数
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
