import xlRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login'
}

export function accountLoginRequest(account: IAccount) {
  return xlRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
