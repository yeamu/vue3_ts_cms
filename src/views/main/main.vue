<script setup lang="ts">
// import { LOGIN_TOKEN } from '@/global/constansts'
// import router from '@/router'
// // import { useCounterStore } from '@/stores/counter'
// import { localCache } from '@/utils/cache'
// // const counterStore = useCounterStore()
import { ref } from 'vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
// function handleExitClick() {
//   localCache.deleteCache(LOGIN_TOKEN)
//   router.push('/login')
// }

//处理main-header中折叠的变化
const isCollapse = ref(false)
function handleFoldChange(isFold: boolean) {
  console.log('fef')
  isCollapse.value = isFold
}
</script>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="el-aside" :width="isCollapse ? '60px' : '210px'">
        <main-menu :isFold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="el-header" height="48px">
          <main-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}
.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #caeaef;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
