import hyRequest from '..'
import type { IAccount } from '@/types'

export function accountLoginRequeset(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoByID(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleID(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
