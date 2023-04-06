export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: Date
  updateAt: Date
}

export interface ISytemStore {
  userList: IUser[]
  userTotalCount: number

  pageList: any[]
  pageTotalCount: number
}
