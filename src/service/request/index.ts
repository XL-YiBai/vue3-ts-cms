// 该文件对axios做二次封装(这样就只有这一个文件依赖axios，解耦，并且可以在这里实现一些重复逻辑)

import axios from 'axios'
// 导入类型，用于填写类型注解
import type { AxiosInstance } from 'axios'
import type { XLRequestConfig, XLRequestInterceptors } from './type'

class XLRequest {
  instance: AxiosInstance
  interceptors?: XLRequestInterceptors // 拦截器参数是可选的

  // config接收axios的配置项，从config中取出的拦截器是对应创建具体实例时传入的拦截器
  constructor(config: XLRequestConfig) {
    // 创建一个axios实例保存到当前XLRequest实例上，这样每次 new XLRequest时，都是不同的axios实例，可以设置不同的配置项如baseURL
    this.instance = axios.create(config)
    this.interceptors = config.interceptors // 保存传入的拦截器到当前实例对象上

    // 使用config中传入的请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 使用config中传入的响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 在类中添加全局拦截器，所有实例共享
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求成功的拦截')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        console.log('所有的实例都有的拦截器：响应成功的拦截')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败的拦截')
        return err
      }
    )
  }

  // 使用XLRequestConfig类型，让单个请求也能接收拦截器对象interceptors
  request(config: XLRequestConfig): void {
    // 判断是否传入请求拦截器，如果有，就执行该拦截器，拦截器返回的结果也是config配置对象
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default XLRequest // XL做前缀是为了防止命名冲突
