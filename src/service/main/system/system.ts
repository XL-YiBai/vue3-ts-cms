import xlRequest from '@/service'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return xlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
