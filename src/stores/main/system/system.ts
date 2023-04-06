import { defineStore } from 'pinia'
import {
  deleteUserById,
  newUserData,
  postUserListData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import type { ISytemStore } from './type'

export const useSystemStore = defineStore('system', {
  state: (): ISytemStore => ({
    userList: [],
    userTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo = { size: 10, offset: 0 }) {
      const userListResult = await postUserListData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      //删完重新请求数据
      this.postUserListAction()
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      //新建成功重新请求数据
      this.postUserListAction()
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult, 'why')
      this.postUserListAction()
    },

    //重构代码
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      // console.log(totalCount, list)

      this.pageList = list
      this.pageTotalCount = totalCount
    },

    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      // console.log(deleteResult)

      //删完重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    async editPageDataAction(pageName: string, id: number, queryInfo: any) {
      const editResult = await editPageData(pageName, id, queryInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})
