import { LOGIN_TOKEN } from './../../global/constansts'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'
import { accountLoginRequeset, getUserInfoByID, getUserMenusByRoleID } from '@/service/login'
import { localCache } from '@/utils/cache'
import { router } from '@/router'
import { mapMenusToRoutes } from '@/utils/mapTomenus'
import useMainStore from '../main/main'

export type userInfoType = {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role: {
    id: number
    name: string
    intro: string
    createAt: string
    updateAt: string
  }
  department: {
    id: number
    name: string
    parentId: any
    createAt: string
    updateAt: string
    leader: string
  }
}

interface ILoginStore {
  token: string
  userInfo: any
  userMenus: any
}

export const useLoginStore = defineStore('login', {
  state: (): ILoginStore => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequeset(account)
      const id = loginResult.data.id
      //处理token
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      //获取登录用户详细信息
      const userInfoResult = await getUserInfoByID(id)
      this.userInfo = userInfoResult.data

      //根据角色请求用户的权限
      const userMenusResult = await getUserMenusByRoleID(this.userInfo.role.id)
      this.userMenus = userMenusResult.data

      //本地缓存
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenus', this.userMenus)

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)

      routes.forEach((route) => router.addRoute('main', route))
      //跳转页面
      router.push('/main')
    },

    loadLocalCacheAction() {
      //用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //请求所有roles、departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        //动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
