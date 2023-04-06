<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './header-info.vue'
import HeaderCrumb from './header-crumb.vue'
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
function change() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="menu-icon" @click="change">
      <el-icon size="30px"><component :is="isFold ? 'TurnOff' : 'Open'" /></el-icon>
    </div>
    <div class="content">
      <div class="breadcrumbs">
        <HeaderCrumb />
      </div>
      <div class="info">
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
