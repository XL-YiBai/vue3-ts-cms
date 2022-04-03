// 该文件对axios做二次封装(这样就只有这一个文件依赖axios，解耦，并且可以在这里实现一些重复逻辑)

import axios from 'axios'
// 导入类型，用于填写类型注解
import type { AxiosInstance } from 'axios'
import type { XLRequestConfig, XLRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true // 设置请求时是否默认显示Loading效果

class XLRequest {
  instance: AxiosInstance
  interceptors?: XLRequestInterceptors // 拦截器参数是可选的
  showLoading: boolean
  loading?: LoadingInstance

  // config接收axios的配置项，从config中取出的拦截器是对应创建具体实例时传入的拦截器
  constructor(config: XLRequestConfig) {
    // 创建一个axios实例保存到当前XLRequest实例上，这样每次 new XLRequest时，都是不同的axios实例，可以设置不同的配置项如baseURL
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING // 如果没有传showLoading就默认给true，请求时默认显示Loading效果
    this.interceptors = config.interceptors // 保存传入的拦截器到当前实例对象上

    // 1. 使用config中传入的请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 1. 使用config中传入的响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2. 在类中添加全局拦截器，所有实例共享
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求成功的拦截')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应成功的拦截')

        // 在响应拦截中移除loading
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败的拦截')
        // 在响应拦截中移除loading
        this.loading?.close()

        // 例子：判断不同的HttpErrorCode状态码，显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  // 使用XLRequestConfig类型，让单个请求也能接收拦截器对象interceptors
  request<T>(config: XLRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断是否传入请求拦截器，如果有，就执行该拦截器，拦截器返回的结果也是config配置对象
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 如果传入了showLoading为false，则把实例的showLoading改为false
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      // 执行axios的request方法
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 判断是否传入响应拦截器，如果有就执行一下该拦截器
          if (config.interceptors?.responseInterceptor) {
            // res = config.interceptors.responseInterceptor(res)
          }

          this.showLoading = DEFAULT_LOADING // 在请求结束后，把实例showLoading重新置为默认值，避免影响之后的请求

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING // 在请求结束后，把实例showLoading重新置为默认值，避免影响之后的请求
          reject(err)
          return err
        })
    })
  }

  get<T>(config: XLRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: XLRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: XLRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: XLRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default XLRequest // XL做前缀是为了防止命名冲突
