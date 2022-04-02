// 该文件用于注册一些全局的东西
import { App } from 'vue'
import registerElement from './register-element'

export function registerApp(app: App): void {
  // 全局注册需要用到的Element-plus组件
  registerElement(app)
}
