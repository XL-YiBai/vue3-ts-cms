// 该文件用于存放封装axios中需要用到的类型

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义自己的接口，可以接收拦截器属性，拦截器的传入是可选的
export interface XLRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 继承原本axios的类型，并做扩展，可以传入拦截器参数
export interface XLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XLRequestInterceptors<T>
  showLoading?: boolean
}
