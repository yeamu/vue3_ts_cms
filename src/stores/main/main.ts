import { getEntireDepartments, getEntireRole } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRole()
      const departmentResult = await getEntireDepartments()
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentResult.data.list
    }
  }
})

export default useMainStore
