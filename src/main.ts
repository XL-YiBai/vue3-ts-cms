import { createApp } from 'vue'
import { globalregisterApp } from './global/index'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'

import router from './router/index'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

// 注册一些全局的东西
app.use(globalregisterApp) // 使用app.use会自动执行传入函数，并给这个函数传入app实例。这里也可以直接写globalregisterApp(app)
app.use(store)

// setupStore加载本地缓存的用户信息到vuex，防止刷新之后vuex数据丢失
setupStore()
// 当刷新后会重新执行main.ts，在app.use(router)时会拿到当前路由进行匹配，
// 因此需要把加载本地缓存信息放在前面，不然此时匹配的话会匹配不到路由导致刷新进入not-found组件
app.use(router)

app.mount('#app')
