<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/stores/main/system/system'

const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const systemStore = useSystemStore()
const mianStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mianStore)

let showPassWrod = ref(true)
const editData = ref()
//点击确定的逻辑
function handleConfirm() {
  dialogVisible.value = false
  if (!showPassWrod.value && editData.value) {
    //编辑用户数据
    systemStore.editUserDataAction(editData.value.id, formData)
    console.log(formData)
  } else {
    //新建用户
    systemStore.newUserDataAction(formData)
  }
}

function serModalVisible(isNew = true, itemData?: any) {
  dialogVisible.value = true
  if (!isNew && itemData) {
    showPassWrod.value = false
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

defineExpose({ serModalVisible })
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="showPassWrod ? 'NewUser' : 'Edit'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="90px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="formData.realname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="showPassWrod">
            <el-input v-model="formData.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone"></el-input>
          </el-form-item>

          <el-form-item label="选择角色" prop="roleId">
            <el-select style="width: 100%" v-model="formData.roleId">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>

          <el-form-item label="选择部门" prop="departmentId">
            <el-select style="width: 100%" v-model="formData.departmentId">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.modal {
}

.form {
  padding: 0 20px;
}
</style>
