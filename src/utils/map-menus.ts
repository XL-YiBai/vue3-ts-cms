import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1. 先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // require.context()是webpack提供的工具，用于查找文件夹中的内容，true表示递归查找，正则表示需要匹配的文件类型
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 调用返回值的keys()方法得到查找到所有文件在上述文件夹中的相对路径
  routeFiles.keys().forEach((key) => {
    // key的值类似./system/user/user.ts，拼接时要去掉前面的.
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要添加的routes
  // userMenus菜单中，如果是可展开的(type === 1)，就需要递归遍历children数组
  // 如果是不可展开的(type === 2)，就取url 去对应一个路由 route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          // 遍历之前加载的所有routes，找到有path和菜单项的url字段匹配的
          return route.path === menu.url
        })
        // 如果找到了匹配的路由，就push进去
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}