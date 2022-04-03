import { createApp } from 'vue'
import { globalregisterApp } from './global/index'

// import './service/axios.demo'
import xlRequest from './service/index'

import App from './App.vue'

import router from './router/index'
import store from './store'

const app = createApp(App)

// 注册一些全局的东西
app.use(globalregisterApp) // 使用app.use会自动执行传入函数，并给这个函数传入app实例。这里也可以直接写globalregisterApp(app)

app.use(router)
app.use(store)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)

// xlRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   }
// })

xlRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
