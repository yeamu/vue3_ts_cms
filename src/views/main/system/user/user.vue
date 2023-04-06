<script setup lang="ts" name="user">
import userSearch from './cps/user-search.vue'
import userContent from './cps/user-content.vue'
import userModal from './cps/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const modalRef = ref<InstanceType<typeof userModal>>()

function handleQueryClick(format: any) {
  contentRef.value?.fetchUserListData(format)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

function handleNewBtnClick() {
  modalRef.value?.serModalVisible()
}

function handleEditBtnClick(itemData: any) {
  modalRef.value?.serModalVisible(false, itemData)
}
</script>

<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-user="handleNewBtnClick" @edit-click="handleEditBtnClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
