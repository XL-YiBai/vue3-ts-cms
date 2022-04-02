import { createApp } from 'vue'

import { globalregisterApp } from './global/index'

import App from './App.vue'

import router from './router/index'
import store from './store'

const app = createApp(App)

// 注册一些全局的东西

app.use(globalregisterApp) // 使用app.use会自动执行传入函数，并给这个函数传入app实例。这里也可以直接写globalregisterApp(app)

app.use(router)
app.use(store)
app.mount('#app')
