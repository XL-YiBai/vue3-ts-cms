import { Module } from 'vuex'

import { accountLoginRequest } from '@/service/login/login'

import { IAccount } from '@/service/login/type'
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
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction')
    // }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    }
  },
  getters: {}
}

export default loginModule
