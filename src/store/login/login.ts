import { Module } from 'vuex'

import { ILoginState } from './types'
import { IRootState } from '../types'

// Module<S, R>两个泛型，S表示模块中state的类型，R表示根store中的state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log('执行accountLoginAction', payload)
    }
  },
  mutations: {},
  getters: {}
}

export default loginModule
