// 传入XlTable组件的配置信息
export const contentTableConfig = {
  // 数据列表的表头名称
  title: '角色列表',

  // 每一列的配置信息
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '权限介绍', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],

  // 是否展示序号
  showIndexColumn: true,

  // 控制展示是否选中的列表项，checkbox
  showSelectColumn: true
}
