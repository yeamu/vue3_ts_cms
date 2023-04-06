import type { RouteRecordRaw } from 'vue-router'

//获取本地路由对象
function loadLocalRoutes() {
  const localRouter: RouteRecordRaw[] = []
  //获取文件 **表示匹配所有子目录
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', { eager: true })
  for (const key in files) {
    const module = files[key]
    localRouter.push(module.default)
  }

  return localRouter
}

export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  //加载本地路由
  const localRouter = loadLocalRoutes()
  //根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRouter.find((it) => it.path === submenu.url)
      if (route) {
        if (!routes.find((it) => it.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      //记录第一被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }

  return routes
}

export function mapPathToMenu(path: string, uesrMenus: any[]) {
  for (const menu of uesrMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
  return undefined
}

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
