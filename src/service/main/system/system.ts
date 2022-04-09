import xlRequest from '@/service'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return xlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return xlRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return xlRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return xlRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
