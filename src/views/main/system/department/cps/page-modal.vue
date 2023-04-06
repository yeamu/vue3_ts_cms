<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/stores/main/system/system'

const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

const systemStore = useSystemStore()
const mianStore = useMainStore()
const { entireDepartments } = storeToRefs(mianStore)

let showPassWrod = ref(true)
const editData = ref()
//点击确定的逻辑
function handleConfirm() {
  dialogVisible.value = false
  if (!showPassWrod.value && editData.value) {
    //编辑用户数据
    systemStore.editPageDataAction('department', editData.value.id, formData)
    console.log(formData)
  } else {
    //新建用户
    systemStore.newPageDataAction('department', formData)
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
      :title="showPassWrod ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="90px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader"></el-input>
          </el-form-item>

          <el-form-item label="选择部门" prop="parentId">
            <el-select style="width: 100%" v-model="formData.parentId">
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
