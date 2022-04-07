import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1. 获取pageUrl
      const pageName = payload.pageName
      let pageUrl = ''

      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
      }

      // 2. 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3. 将数据存储到state中
      const { list, totalCount } = pageResult.data

      switch (pageName) {
        case 'user':
          commit(`changeUserList`, list)
          commit(`changeUserCount`, totalCount)
          break
        case 'role':
          commit(`changeRoleList`, list)
          commit(`changeRoleount`, totalCount)
      }
    }
  },
  getters: {
    // getters可以返回一个函数，这里返回一个函数接收参数pageName，
    // 外界使用getters拿到这个函数可以调用传入不同的pageName从而获取不同的数据，此处应该是一个闭包
    pageListData(state) {
      // 返回一个函数让外界调用
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userList
          case 'role':
            return state.roleList
        }
      }
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  }
}

export default systemModule