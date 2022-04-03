// 该文件是service文件夹统一出口，service文件夹用于封装axios

import XLRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

const xlRequest = new XLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 模仿携带token的拦截
      const token = ''
      if (token) {
        // eslint-disable-next-line
        config.headers!.Authorization = `Bearer ${token}`
      }

      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求成功的失败')
      return err
    },
    responseInterceptor: (config) => {
      console.log('响应成功的拦截')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default xlRequest // xl做前缀，防止命名冲突
