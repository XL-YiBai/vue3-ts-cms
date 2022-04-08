import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
        // 在遍历时，保存第一个匹配的菜单存到firstMenu，以便之后进入首页默认选择第一个菜单
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 根据菜单信息，和当前路径，获取面包屑（即当前菜单层级）
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  // 用于保存菜单层级breadcrumbs，比如 系统管理/用户管理
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)

  return breadcrumbs
}

// 根据菜单信息，和当前所在路径，匹配出对应的菜单项
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 如果传了breadcrumbs参数，就保存菜单层级，先保存父级菜单，再保存子级菜单
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 【注意】：下面的写法有很多重复的代码，所以可以抽离写成上面的函数写法
/* export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  // 用于保存菜单层级breadcrumbs，比如 系统管理/用户管理
  const breadcrumbs: IBreadcrumb[] = []

  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 先保存父级菜单，再保存子级菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }

  return breadcrumbs
}

// 根据菜单信息，和当前所在路径，匹配出对应的菜单项
export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
} */

// 拿到当前用户菜单中按钮权限信息，保存到数组中，return出去。(之后在vuex的login.ts中changeUserMenus调用)
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  // 定义递归遍历函数
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      // 只要type是1或者2就继续遍历
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
        // 当type为3时，可以获取到权限了，就把权限push到permissions中
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export { firstMenu }
