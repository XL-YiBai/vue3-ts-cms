// 该文件用于注册一些全局的东西
import { App } from 'vue'
import registerElement from './register-element'

export function globalregisterApp(app: App): void {
  // 全局注册需要用到的Element-plus组件，使用app.use会自动执行传入函数，并给这个函数传入app实例。
  app.use(registerElement)
}
