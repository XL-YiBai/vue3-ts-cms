import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xialei',
      age: 18,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1. 请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      // 2. 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  modules: {
    login,
    system
  }
})

// 刷新之后，需要重新获取本地缓存的vuex数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // 这个请求需要token，而上面获取token也是异步的，不一定先到达，放在这里不合适，已经移到store/login.ts确保token获取到的逻辑中了
  // store.dispatch('getInitialDataAction')
}

// 单独封装一个自己的useSotre，调用vuex原生的useStore返回一个store，
// 是自己封装的IStoreType类型的，可以调用store中的模块，如store.login，原生useStore的返回类型不支持取模块
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
