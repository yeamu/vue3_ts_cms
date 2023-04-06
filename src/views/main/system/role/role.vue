<script setup lang="ts" name="role">
import pageSearch from '@/components/department/cps-page/page-search.vue'
import { searchConfig } from './config/search.config'
</script>
<template>
  <div class="role">
    <page-search :search-config="searchConfig" />
  </div>
</template>

<style scoped>
.role {
}
</style>
