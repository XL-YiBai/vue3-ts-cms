// 传入XlTable组件的配置信息
export const contentTableConfig = {
  // 数据列表的表头名称
  title: '菜单列表',

  // 每一列的配置信息
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],

  // 是否展示序号
  showIndexColumn: false,

  // 控制展示是否选中的列表项，checkbox
  showSelectColumn: false,

  // 控制是否可以多级展开，有子项
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      chidlren: 'children'
    }
  },
  showFooter: false
}
