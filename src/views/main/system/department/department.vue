<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
      :search-config="searchConfig"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
    </page-content>
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/department/cps-page/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/department/cps-page/page-modal.vue'
import { ref } from 'vue'
import { searchConfig } from '@/components/department/config/search.config'
import { contentConfig } from '@/components/department/config/content.config'

const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}

function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof pageModal>>()
function handleNewClick() {
  modalRef.value?.serModalVisible()
}

function handleEditClick(itemData: any) {
  modalRef.value?.serModalVisible(false, itemData)
}
</script>

<style scoped>
.department {
}
</style>
