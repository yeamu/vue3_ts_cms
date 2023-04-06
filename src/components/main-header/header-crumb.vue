<script setup lang="ts">
import { computed } from 'vue'
import { useLoginStore } from '@/stores/login/login'
import { useRoute } from 'vue-router'
import { mapPathToBreadcrumbs } from '@/utils/mapTomenus'

const route = useRoute()
const userMenus = useLoginStore().userMenus

const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="less">
.header-crumb {
}
</style>
