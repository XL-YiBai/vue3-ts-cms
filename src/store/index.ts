import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xialei',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})

// 刷新之后，需要重新获取本地缓存的vuex数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 单独封装一个自己的useSotre，调用vuex原生的useStore返回一个store，
// 是自己封装的IStoreType类型的，可以调用store中的模块，如store.login，原生useStore的返回类型不支持取模块
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
