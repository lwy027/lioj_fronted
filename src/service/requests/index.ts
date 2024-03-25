import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { BASE_URL, TIME_OUT } from '../config'
import type { WyAxiosRequestConfig } from './type'
import { localCache } from '@/utils/catch'
import { LOGIN_TOKEN } from '@/global/constant'

class WyRequest {
  instance: AxiosInstance

  constructor(config: WyAxiosRequestConfig) {
    this.instance = axios.create(config)
    //全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    //针对不同的请求实例的拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.resposeSuccessFn,
        config.interceptors.resposeFailureFn
      )
    }
  }

  request<T = any>(config: WyAxiosRequestConfig<T>) {
    //针对单个请求设置特有的拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    //单个请求设置响应拦截器，因为我们直接把响应给返回出去了，所以正常时不能回调单个响应拦截器
    //所以在promise中进行操作
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.resposeSuccessFn) {
            res = config.interceptors.resposeSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: WyAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: WyAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: WyAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: WyAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
  put<T = any>(config: WyAxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
}

const WYrequest = new WyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default WYrequest
