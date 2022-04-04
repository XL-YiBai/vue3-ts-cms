import xlRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法：user/1  1为用户id
  UserMenus = '/role/' // 用法：role/1/menu  1为用户id
}

// 登录请求
export function accountLoginRequest(account: IAccount) {
  return xlRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 根据id获取用户信息请求
export function requestUserInfoById(id: number) {
  return xlRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 根据id获取用户角色首页左侧的列表菜单栏
export function requestUserMenuByRoleId(id: number) {
  return xlRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
