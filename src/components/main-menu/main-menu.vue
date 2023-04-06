<script setup lang="ts">
import { useLoginStore } from '@/stores/login/login'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { mapPathToMenu } from '@/utils/mapTomenus'

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

//点击跳转路由
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}

const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">管理系统</h2>
    </div>
    <div class="menu">
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="isFold">
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon size="35px"><component :is="item.icon.split('-icon-')[1]" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="String(subitem.id)">
              <el-menu-item :index="String(subitem.id)" @click="handleItemClick(subitem)">{{
                subitem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-menu {
  width: 100%;
  background-color: #bdcad2;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.img {
  height: 100%;
  margin: 0 10px;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: white;
}
</style>
