// 后端返回data的类型，一个表示状态，一个数据
export interface IDataType<T = any> {
  code: number
  data: T
}
